import { useState, useMemo, useRef, useEffect } from "react";
import {
  Wrench, Search, AlertTriangle, CheckCircle, ChevronRight, Gauge,
  Thermometer, Zap, Droplets, Settings, FileText, Shield, Lock,
  Layers, Activity, Target, CircleDot, Eye, BookOpen, Database,
  Car, Package, ArrowRight, AlertCircle, Info, ChevronDown,
  ChevronUp, ExternalLink, Clipboard, Clock, XCircle, HelpCircle,
  MessageSquare, Send, User, Bot, CornerDownRight
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// MASTER MECHANIC — 1968 Ford GT40 Mk I / Gurney-Weslake 302
// Evidence-Controlled Diagnostic & Restoration Interface
// ═══════════════════════════════════════════════════════════════════════════

// --- Real Data from Knowledge Base Registers ---

const VEHICLE = {
  description: "1968-era Ford GT40 Mk I",
  engine: "Gurney-Weslake Ford 302",
  chassisNumber: "Unknown — identification required",
  homologation: "FIA Recognition/Homologation No. 224, Group 4",
  era: "1968 (Period Appendix J)",
  currentUse: "Unknown — determines risk decisions",
  winner1968: "#9 JWA Ford GT 40 — Pedro Rodriguez / Lucien Bianchi (S025 verified)",
};

const SYSTEMS = [
  { id: "identity", label: "Identity & Provenance", icon: Eye, color: "slate", page: "00-vehicle-identity.md", status: "indexed_placeholder" },
  { id: "rules", label: "Regulatory / Homologation", icon: BookOpen, color: "indigo", page: "02-regulatory-homologation.md", status: "baseline_captured" },
  { id: "chassis_body", label: "Chassis & Body", icon: Car, color: "stone", page: "systems/chassis-body.md", status: "baseline_captured" },
  { id: "engine", label: "Engine (302 Short Block)", icon: Settings, color: "red", page: "systems/engine-induction.md", status: "baseline_captured" },
  { id: "induction", label: "Induction (Weber/IDA)", icon: Droplets, color: "orange", page: "systems/engine-induction.md", status: "component_support_captured" },
  { id: "driveline", label: "Driveline & Transaxle", icon: Layers, color: "amber", page: "systems/driveline-transaxle.md", status: "component_support_captured" },
  { id: "suspension_steering", label: "Suspension & Steering", icon: Activity, color: "emerald", page: "systems/suspension-steering.md", status: "baseline_captured" },
  { id: "brakes_wheels_tires", label: "Brakes, Wheels & Tires", icon: CircleDot, color: "purple", page: "systems/brakes-wheels-tires.md", status: "baseline_captured" },
  { id: "electrical_instruments", label: "Electrical & Instruments", icon: Zap, color: "yellow", page: "systems/electrical-instruments.md", status: "baseline_captured" },
  { id: "fuel_oil_cooling", label: "Fuel, Oil & Cooling", icon: Thermometer, color: "blue", page: "systems/fuel-oil-cooling.md", status: "baseline_captured" },
  { id: "safety", label: "Safety Systems", icon: Shield, color: "rose", page: "systems/safety-systems.md", status: "baseline_captured" },
  { id: "general", label: "Workshop & Fasteners", icon: Wrench, color: "gray", page: "systems/general-workshop.md", status: "mechanic_ready_partial" },
];

const SETTINGS = [
  { id: "ST001", system: "engine", setting: "Ignition advance curve", status: "blocked", blocking: "Engine build sheet, compression, cam, fuel, distributor/ignition type, dyno data" },
  { id: "ST002", system: "engine", setting: "Valve lash", status: "blocked", blocking: "Cam card, lifter type, rocker ratio, head/valvetrain documentation" },
  { id: "ST003", system: "engine", setting: "Spark plug type and gap", status: "blocked", blocking: "Head plug reach/seat, compression, ignition, fuel type" },
  { id: "ST024", system: "engine", setting: "Rev limit", status: "blocked", blocking: "Rotating assembly, valve springs, cam, oiling, ignition, fuel, dyno data" },
  { id: "ST004", system: "induction", setting: "Weber jetting and choke size", status: "blocked", blocking: "Carburetor model/series, choke size, emulsion tubes, jets, fuel pressure, linkage" },
  { id: "ST005", system: "induction", setting: "Fuel pressure", status: "blocked", blocking: "Pump/regulator IDs, carburetor spec, gauge calibration" },
  { id: "ST025", system: "induction", setting: "Float level, idle mixture, pump volume, linkage sync", status: "blocked", blocking: "Exact carburetor model/series, Weber manual, float/needle/seat data" },
  { id: "ST006", system: "fuel_oil_cooling", setting: "Engine oil type and quantity", status: "blocked", blocking: "Dry/wet sump layout, tank/sump, cooler, filter, pump, builder data" },
  { id: "ST007", system: "fuel_oil_cooling", setting: "Oil pressure target", status: "blocked", blocking: "Engine clearances, pump/relief setup, oiling layout, builder data" },
  { id: "ST026", system: "fuel_oil_cooling", setting: "Oil relief setting and priming", status: "blocked", blocking: "Pump/relief hardware, sump layout, filter/cooler routing, clearances" },
  { id: "ST027", system: "fuel_oil_cooling", setting: "Coolant capacity, cap, thermostat, bleed", status: "blocked", blocking: "Radiator, water pump, hoses, cap, thermostat, fan, bleed layout" },
  { id: "ST020", system: "fuel_oil_cooling", setting: "Fuel fire-safety compliance", status: "blocked", blocking: "Tank/cell type/date, foam/safety tank, fuel-cap retention, line material/routing" },
  { id: "ST008", system: "driveline", setting: "Transaxle oil type and fill", status: "blocked", blocking: "Transaxle make/model/serial and service manual" },
  { id: "ST009", system: "driveline", setting: "LSD preload/backlash/gear setup", status: "blocked", blocking: "Transaxle/differential model, gear stack, service manual" },
  { id: "ST028", system: "driveline", setting: "Gear ratios and final drive", status: "blocked", blocking: "Transaxle identity, gear stack, tire diameter, engine torque curve" },
  { id: "ST029", system: "driveline", setting: "Clutch adjustment and release", status: "blocked", blocking: "Clutch/flywheel IDs, release bearing, slave/master, pedal ratio" },
  { id: "ST010", system: "suspension_steering", setting: "Camber, caster, and toe", status: "blocked", blocking: "Chassis identity, pickup points, shims, uprights, tires, ride height" },
  { id: "ST011", system: "suspension_steering", setting: "Ride height and corner weights", status: "blocked", blocking: "Spring/damper/bar data, tire data, fuel/driver ballast, use case" },
  { id: "ST017", system: "suspension_steering", setting: "Steering ratio and bump steer", status: "blocked", blocking: "Rack make/ratio, steering-arm geometry, column/joint condition" },
  { id: "ST022", system: "suspension_steering", setting: "Spring, damper, anti-roll bar setup", status: "blocked", blocking: "Spring rates/free lengths, damper valving, bar geometry, motion ratios" },
  { id: "ST012", system: "brakes_wheels_tires", setting: "Brake bias and master sizing", status: "blocked", blocking: "Calipers, discs, pad compound, master cylinders, pedal ratio" },
  { id: "ST013", system: "brakes_wheels_tires", setting: "Center-lock torque", status: "blocked", blocking: "Wheel/hub/nut manufacturer, thread, lubricant, service data" },
  { id: "ST014", system: "brakes_wheels_tires", setting: "Tire pressure", status: "blocked", blocking: "Tire model, age, construction, wheel size, vehicle weight, use case" },
  { id: "ST030", system: "brakes_wheels_tires", setting: "Brake fluid, pad bedding, pressure", status: "blocked", blocking: "Caliper/disc/pad/master IDs, seal compatibility, fluid history" },
  { id: "ST031", system: "brakes_wheels_tires", setting: "Wheel bearing/hub preload", status: "blocked", blocking: "Hub/upright/bearing/nut IDs, bearing type, service manual" },
  { id: "ST015", system: "electrical_instruments", setting: "Fuse/relay ratings, charging output", status: "blocked", blocking: "Wiring diagram, alternator/generator, loads, wire gauges" },
  { id: "ST016", system: "electrical_instruments", setting: "Master switch/circuit breaker layout", status: "blocked", blocking: "Harness map, battery location, event rules" },
  { id: "ST019", system: "electrical_instruments", setting: "Battery and master-switch compliance", status: "blocked", blocking: "Battery chemistry/location, master-switch type/marking, alternator shutdown" },
  { id: "ST032", system: "electrical_instruments", setting: "Gauge/sender calibration, warning thresholds", status: "blocked", blocking: "Gauge make/range, sender part numbers, wiring resistance" },
  { id: "ST018", system: "safety", setting: "Appendix K event readiness", status: "blocked", blocking: "Event regs, HTP, belts, fire system, fuel cell, master switch, ROPS, mirrors" },
  { id: "ST021", system: "safety", setting: "Harness and restraint compliance", status: "blocked", blocking: "Harness FIA standard/date, routing, anchor plates/bolts, seat, FHR" },
  { id: "ST023", system: "general", setting: "Fastener torque values", status: "blocked", blocking: "Exact joint, fastener material/grade/thread, lubrication, locking, reuse rule" },
  { id: "ST033", system: "chassis_body", setting: "Structural repair dimensions and bonding", status: "blocked", blocking: "Chassis identity, material specs, repair history, drawings, jig/datum" },
];

const EVIDENCE_GAPS = [
  { id: "G001", system: "identity", area: "Chassis identity", priority: "P1", status: "open", evidence: "Chassis plate, tub stampings, title, provenance records" },
  { id: "G002", system: "engine", area: "Installed 302 short block", priority: "P1", status: "open", evidence: "Block casting/date, bore, stroke, crank, build sheet" },
  { id: "G003", system: "engine", area: "Gurney-Weslake heads", priority: "P1", status: "open", evidence: "Casting/foundry marks, valve sizes, plug details, service drawings" },
  { id: "G004", system: "engine", area: "Valvetrain and cam", priority: "P1", status: "open", evidence: "Cam card, lifter type, rocker ratio, spring data" },
  { id: "G005", system: "induction", area: "Weber/induction setup", priority: "P1", status: "open", evidence: "Carb model/series/serials, choke sizes, jet stack, linkage" },
  { id: "G006", system: "electrical_instruments", area: "Ignition hardware/curve", priority: "P1", status: "open", evidence: "Distributor/trigger ID, advance curve, coil, plugs" },
  { id: "G007", system: "fuel_oil_cooling", area: "Fuel storage and delivery", priority: "P1", status: "open", evidence: "Tank/cell maker/date, pumps, regulator, hose spec/date" },
  { id: "G008", system: "fuel_oil_cooling", area: "Oil system", priority: "P1", status: "open", evidence: "Pump, tank/sump, cooler, filter, relief, line sizes" },
  { id: "G009", system: "fuel_oil_cooling", area: "Cooling system", priority: "P2", status: "open", evidence: "Radiator, pump, fans, cap, thermostat, bleed points" },
  { id: "G010", system: "driveline", area: "Transaxle identity/service", priority: "P1", status: "open", evidence: "Manufacturer/model/serial, gear stack, LSD type" },
  { id: "G011", system: "driveline", area: "Clutch and halfshafts", priority: "P2", status: "open", evidence: "Clutch disc/cover/flywheel, halfshaft joints, fasteners" },
  { id: "G012", system: "suspension_steering", area: "Suspension geometry/setup", priority: "P1", status: "open", evidence: "Pickup points, spring rates, damper IDs, alignment as-found" },
  { id: "G013", system: "suspension_steering", area: "Steering system", priority: "P1", status: "open", evidence: "Rack make/ratio, column, steering arms, bump steer" },
  { id: "G014", system: "brakes_wheels_tires", area: "Brake hardware and bias", priority: "P1", status: "open", evidence: "Caliper/disc/pad/master IDs, balance mechanism, pressure data" },
  { id: "G015", system: "brakes_wheels_tires", area: "Wheels, hubs, center-locks, tires", priority: "P1", status: "open", evidence: "Wheel make/size/offset, center-lock threads, tire model/date" },
  { id: "G016", system: "electrical_instruments", area: "Wiring, charging, instruments", priority: "P1", status: "open", evidence: "Harness map, fuses, alternator, battery, master switch, senders" },
  { id: "G017", system: "safety", area: "Event readiness/safety equipment", priority: "P1", status: "open", evidence: "HTP, belts, fire system, ROPS, fuel cell, master switch" },
  { id: "G018", system: "history", area: "1968 Le Mans result detail", priority: "P2", status: "partial_verified", evidence: "Entry list, scrutineering, chassis/engine/lap records" },
  { id: "G019", system: "sources", area: "Period Ford/FAV/JWA service material", priority: "P1", status: "open", evidence: "Service manuals, race-prep sheets, parts lists, engineering drawings" },
  { id: "G020", system: "general", area: "Fastener torque", priority: "P1", status: "open", evidence: "Component-specific manual, fastener grade, thread, locking, torque sequence" },
  { id: "G021", system: "engine", area: "Engine rev limit", priority: "P1", status: "open", evidence: "Build sheet, rotating assembly, valve springs, cam, oiling, dyno" },
  { id: "G022", system: "induction", area: "Carburetor calibration settings", priority: "P1", status: "open", evidence: "Exact Weber model, applicable manual, float/needle data" },
  { id: "G023", system: "fuel_oil_cooling", area: "Oil relief and priming", priority: "P1", status: "open", evidence: "Pump/relief hardware, sump layout, clearances, builder data" },
  { id: "G024", system: "fuel_oil_cooling", area: "Cooling settings", priority: "P1", status: "open", evidence: "Radiator, cap, thermostat, restrictor, bleed, pressure-test" },
  { id: "G025", system: "driveline", area: "Gear ratios and final drive", priority: "P1", status: "open", evidence: "Transaxle ID, gear stack, tire diameter, engine data" },
  { id: "G026", system: "driveline", area: "Clutch adjustment/release", priority: "P1", status: "open", evidence: "Clutch/flywheel IDs, release bearing, hydraulics, free play" },
  { id: "G027", system: "brakes_wheels_tires", area: "Brake fluid, bedding, pressure", priority: "P1", status: "open", evidence: "Caliper/disc/pad/master IDs, pad maker instructions" },
  { id: "G028", system: "brakes_wheels_tires", area: "Wheel bearing/hub preload", priority: "P1", status: "open", evidence: "Hub/upright/bearing IDs, bearing type, service manual" },
  { id: "G029", system: "electrical_instruments", area: "Gauge/sender calibration", priority: "P2", status: "open", evidence: "Gauge make/range, sender parts, wiring resistance" },
];

const PARTS = [
  { id: "P001", system: "identity", assembly: "Vehicle", part: "Chassis plate and tub identifiers", status: "unknown", label: "open" },
  { id: "P005", system: "engine", assembly: "Short block", part: "Block casting and bottom end", status: "unknown", label: "verified_context_installed_open" },
  { id: "P006", system: "engine", assembly: "Cylinder heads", part: "Gurney-Weslake heads", status: "unknown", label: "verified_context_installed_open" },
  { id: "P007", system: "engine", assembly: "Valvetrain", part: "Cam, rockers, pushrods, springs", status: "unknown", label: "open" },
  { id: "P008", system: "engine", assembly: "Ignition", part: "Distributor, coil, box, wires, plugs", status: "unknown", label: "open" },
  { id: "P009", system: "induction", assembly: "Induction", part: "Carburetors and intake", status: "unknown", label: "lead_with_verified_support_source" },
  { id: "P011", system: "fuel_oil_cooling", assembly: "Fuel storage", part: "Tanks, cells, fillers, vents", status: "unknown", label: "verified_boundary_installed_open" },
  { id: "P013", system: "fuel_oil_cooling", assembly: "Oil system", part: "Sump/dry-sump, pump, cooler", status: "unknown", label: "verified_boundary_installed_open" },
  { id: "P014", system: "fuel_oil_cooling", assembly: "Cooling", part: "Radiator, pump, fans, hoses", status: "unknown", label: "verified_boundary_installed_open" },
  { id: "P016", system: "driveline", assembly: "Transaxle", part: "Gearbox, differential, final drive", status: "unknown", label: "verified_context_installed_open" },
  { id: "P018", system: "suspension_steering", assembly: "Front suspension", part: "Arms, uprights, springs, dampers, bars", status: "unknown", label: "verified_boundary_installed_open" },
  { id: "P019", system: "suspension_steering", assembly: "Rear suspension", part: "Arms, uprights, links, springs, dampers", status: "unknown", label: "verified_boundary_installed_open" },
  { id: "P020", system: "suspension_steering", assembly: "Steering", part: "Rack, column, joints, wheel", status: "unknown", label: "verified_boundary_installed_open" },
  { id: "P021", system: "brakes_wheels_tires", assembly: "Brake hydraulics", part: "Masters, lines, balance mechanism", status: "unknown", label: "verified_boundary_installed_open" },
  { id: "P022", system: "brakes_wheels_tires", assembly: "Brake corners", part: "Calipers, discs, pads, ducts", status: "unknown", label: "verified_boundary_installed_open" },
  { id: "P023", system: "brakes_wheels_tires", assembly: "Wheels", part: "Center-lock wheels, hubs, pegs, nuts", status: "unknown", label: "verified_boundary_installed_open" },
  { id: "P025", system: "electrical_instruments", assembly: "Harness", part: "Wiring, fuses, relays, grounds", status: "unknown", label: "verified_boundary_installed_open" },
  { id: "P026", system: "electrical_instruments", assembly: "Charging/starting", part: "Battery, alternator, starter, master switch", status: "unknown", label: "verified_boundary_installed_open" },
  { id: "P028", system: "safety", assembly: "Driver safety", part: "Seat, belts, extinguisher, ROPS", status: "unknown", label: "verified_context_installed_open" },
  { id: "P029", system: "safety", assembly: "Fuel/fire safety", part: "Tank foam, caps, lines, bulkheads", status: "unknown", label: "verified_context_installed_open" },
];

const DIAGNOSTIC_PATTERNS = [
  { id: "no_start", label: "No Start", checks: "Mechanical freedom, oil pressure, cranking speed, ignition feed, spark, fuel pressure, fuel quality, throttle position, compression, timing reference." },
  { id: "runs_hot", label: "Runs Hot", checks: "Air purge, coolant flow, radiator obstruction, pressure cap, belt/pump drive, fan operation, timing, mixture, oil temperature, duct sealing." },
  { id: "low_oil", label: "Low Oil Pressure", checks: "Stop combustion testing. Verify gauge/sender, oil level, oil temperature, pump drive, filter bypass, relief valve, pickup/scavenge routing, bearing clearance." },
  { id: "brake_pull", label: "Brake Pull / Long Pedal", checks: "Leaks, pad knockback, bearing play, disc runout, master cylinders, balance bar, flex lines, pad condition, caliper piston, air in system." },
  { id: "instability", label: "High-Speed Instability", checks: "Tires, pressures, ride height, rake, toe, wheel bearings, steering rack, bump steer, body/undertray fit, suspension pickup integrity." },
];

const SOURCES_KEY = [
  { id: "S009", label: "FIA Appendix J 1968", tier: 1, type: "Regulation" },
  { id: "S015", label: "FIA Ford GT40 Homologation No. 224", tier: 1, type: "Homologation" },
  { id: "S016", label: "Hewland LG500/LG600 Manual", tier: 1, type: "Component manual" },
  { id: "S018", label: "Webcon Weber IDA Support", tier: 1, type: "Component support" },
  { id: "S019", label: "FIA Appendix K 2025 (updated 2026)", tier: 1, type: "Safety regulation" },
  { id: "S024", label: "Gurney-Weslake Official", tier: 2, type: "Identification context" },
  { id: "S025", label: "ACO 1968 Palmarès API", tier: 1, type: "Race result" },
  { id: "S027", label: "Ford Heritage Vault GT40 Concept", tier: 1, type: "Historical context" },
  { id: "S028", label: "Dave Friedman Collection Finding Aid", tier: 2, type: "Archive target" },
];

// --- Utility Components ---

function Badge({ children, color = "gray", size = "sm" }) {
  const colors = {
    red: "bg-red-100 text-red-800 border-red-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
    green: "bg-green-100 text-green-800 border-green-200",
    emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    rose: "bg-rose-100 text-rose-800 border-rose-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    stone: "bg-stone-100 text-stone-700 border-stone-200",
  };
  const sizes = { xs: "text-xs px-1.5 py-0.5", sm: "text-xs px-2 py-0.5", md: "text-sm px-2.5 py-1" };
  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${colors[color] || colors.gray} ${sizes[size]}`}>
      {children}
    </span>
  );
}

function Card({ children, className = "", onClick }) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-200 ${onClick ? "cursor-pointer hover:border-amber-200 hover:shadow-md active:scale-[0.995]" : ""} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } : undefined}
    >
      {children}
    </div>
  );
}

function StatusIcon({ status }) {
  if (status === "blocked") return <Lock className="w-4 h-4 text-red-500" />;
  if (status === "open") return <AlertCircle className="w-4 h-4 text-amber-500" />;
  if (status === "partial_verified") return <Info className="w-4 h-4 text-blue-500" />;
  return <HelpCircle className="w-4 h-4 text-gray-400" />;
}

function CoverageTag({ status }) {
  const map = {
    baseline_captured: { label: "Baseline", color: "blue" },
    component_support_captured: { label: "Support Captured", color: "emerald" },
    indexed_placeholder: { label: "Placeholder", color: "amber" },
    settings_blocked: { label: "Settings Blocked", color: "red" },
    mechanic_ready_partial: { label: "Partial Ready", color: "green" },
    complete: { label: "Complete", color: "emerald" },
  };
  const info = map[status] || { label: status, color: "gray" };
  return <Badge color={info.color} size="xs">{info.label}</Badge>;
}

// --- Sidebar ---

function Sidebar({ activeView, setActiveView }) {
  const navItems = [
    { id: "overview", label: "Vehicle Overview", icon: Gauge },
    { id: "expert", label: "Ask Expert", icon: MessageSquare },
    { id: "systems", label: "Systems Coverage", icon: Layers },
    { id: "settings", label: "Settings Gates", icon: Lock },
    { id: "evidence", label: "Evidence Gaps", icon: AlertTriangle },
    { id: "parts", label: "Parts Register", icon: Package },
    { id: "diagnostics", label: "Diagnostics", icon: Search },
    { id: "sources", label: "Sources", icon: Database },
  ];

  return (
    <aside className="w-60 bg-gray-950 text-gray-100 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
            <Wrench className="w-6 h-6 text-gray-950" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white">Master Mechanic</h1>
            <p className="text-xs text-gray-400">GT40 Mk I · GW 302</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 ${
              activeView === item.id
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm shadow-amber-500/10"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/60 border border-transparent active:bg-gray-800"
            }`}
            aria-current={activeView === item.id ? "page" : undefined}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="p-3 rounded-lg bg-gray-900/60 border border-gray-800">
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            Evidence-first. No folklore.
          </p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            All settings blocked until installed hardware verified.
          </p>
        </div>
      </div>
    </aside>
  );
}

// --- Overview View ---

function OverviewView() {
  const p1Gaps = EVIDENCE_GAPS.filter(g => g.priority === "P1" && g.status === "open").length;
  const blockedSettings = SETTINGS.filter(s => s.status === "blocked").length;
  const unknownParts = PARTS.filter(p => p.status === "unknown").length;

  return (
    <div className="space-y-6">
      {/* Vehicle Identity Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{VEHICLE.description}</h2>
            <p className="text-sm text-gray-600 mt-1">{VEHICLE.engine}</p>
          </div>
          <Badge color="amber" size="md">Identification Required</Badge>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Chassis</span>
              <span className="text-red-600 font-medium">{VEHICLE.chassisNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Homologation</span>
              <span className="text-gray-800 font-medium">{VEHICLE.homologation}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Era</span>
              <span className="text-gray-800 font-medium">{VEHICLE.era}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Current Use</span>
              <span className="text-red-600 font-medium">{VEHICLE.currentUse}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-800"><span className="font-semibold">1968 Le Mans verified:</span> {VEHICLE.winner1968}</p>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg"><Lock className="w-5 h-5 text-red-600" /></div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{blockedSettings}</p>
              <p className="text-xs text-gray-500">Settings Blocked</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg"><AlertTriangle className="w-5 h-5 text-amber-600" /></div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{p1Gaps}</p>
              <p className="text-xs text-gray-500">P1 Evidence Gaps</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg"><Package className="w-5 h-5 text-purple-600" /></div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{unknownParts}</p>
              <p className="text-xs text-gray-500">Parts Unidentified</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Diagnostic Safety Stops */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-rose-600" />
          <h3 className="text-sm font-semibold text-gray-900">Safety Stops — Do Not Run Engine or Move Car If:</h3>
        </div>
        <div className="space-y-2">
          {[
            "Fuel leaks, unknown fuel-cell condition, or stuck throttles present",
            "Oil pressure cannot be verified",
            "Brake pedal, steering, suspension, or wheel retention integrity uncertain",
            "Electrical smoke, unfused battery feeds, or hot wiring appears",
            "Unknown race engine has not been barred through and pre-oiled",
          ].map((stop, i) => (
            <div key={i} className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">{stop}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Operating Rules Summary */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-semibold text-gray-900">Agent Operating Rules</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Never invent torque, clearances, jetting, timing, rev limits, pressures, or fluid quantities" },
            { label: "Never treat homologation recognition as installed-car specification" },
            { label: "Prefer reversible inspection before replacement or adjustment" },
            { label: "Escalate if action would alter original material or compromise safety" },
            { label: "Label claims: verified, cross_checked, lead_only, assumption, or open" },
            { label: "Never transfer Mk II, Mk IV, continuation, replica, or generic 302 specs" },
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
              <CheckCircle className="w-3.5 h-3.5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-700 leading-relaxed">{rule.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// --- Systems Coverage View ---

function SystemsView() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-3">
      {SYSTEMS.map(sys => {
        const sysSettings = SETTINGS.filter(s => s.system === sys.id);
        const sysGaps = EVIDENCE_GAPS.filter(g => g.system === sys.id);
        const sysParts = PARTS.filter(p => p.system === sys.id);
        const isExpanded = expanded === sys.id;

        return (
          <Card key={sys.id} className="overflow-hidden">
            <button
              onClick={() => setExpanded(isExpanded ? null : sys.id)}
              className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-500 rounded-xl"
              aria-expanded={isExpanded}
            >
              <div className={`p-2 rounded-lg bg-${sys.color}-50`}>
                <sys.icon className={`w-5 h-5 text-${sys.color}-600`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{sys.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {sysSettings.length} settings · {sysGaps.length} gaps · {sysParts.length} parts
                </p>
              </div>
              <CoverageTag status={sys.status} />
              {sysSettings.length > 0 && <Badge color="red" size="xs">{sysSettings.length} blocked</Badge>}
              {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>

            {isExpanded && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
                {sysGaps.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">Evidence Gaps</p>
                    {sysGaps.map(gap => (
                      <div key={gap.id} className="flex items-start gap-2 p-2 bg-amber-50 rounded-lg mb-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-gray-900">{gap.id}: {gap.area}</p>
                          <p className="text-xs text-gray-600 mt-0.5">Needs: {gap.evidence}</p>
                        </div>
                        <Badge color={gap.priority === "P1" ? "red" : "amber"} size="xs">{gap.priority}</Badge>
                      </div>
                    ))}
                  </div>
                )}
                {sysSettings.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-2">Blocked Settings</p>
                    {sysSettings.map(s => (
                      <div key={s.id} className="flex items-start gap-2 p-2 bg-red-50 rounded-lg mb-1.5">
                        <Lock className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-gray-900">{s.id}: {s.setting}</p>
                          <p className="text-xs text-gray-600 mt-0.5">Blocking: {s.blocking}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {sysParts.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-2">Unidentified Parts</p>
                    {sysParts.map(p => (
                      <div key={p.id} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg mb-1.5">
                        <Package className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                        <span className="text-xs font-medium text-gray-900">{p.id}</span>
                        <span className="text-xs text-gray-600">{p.assembly} — {p.part}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

// --- Settings Gates View ---

function SettingsView() {
  const [filterSystem, setFilterSystem] = useState("all");

  const filtered = filterSystem === "all" ? SETTINGS : SETTINGS.filter(s => s.system === filterSystem);
  const systemIds = [...new Set(SETTINGS.map(s => s.system))];

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-red-500" />
            <p className="text-sm font-semibold text-gray-900">All {SETTINGS.length} settings are blocked until installed hardware and source evidence are verified.</p>
          </div>
          <select
            value={filterSystem}
            onChange={e => setFilterSystem(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:ring-2 focus:ring-amber-500 focus-visible:outline-none transition-colors bg-white shadow-sm"
          >
            <option value="all">All Systems</option>
            {systemIds.map(id => (
              <option key={id} value={id}>{SYSTEMS.find(s => s.id === id)?.label || id}</option>
            ))}
          </select>
        </div>
      </Card>

      <div className="space-y-2">
        {filtered.map(setting => (
          <Card key={setting.id} className="p-4">
            <div className="flex items-start gap-3">
              <Lock className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-500">{setting.id}</span>
                  <span className="text-sm font-medium text-gray-900">{setting.setting}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  <span className="font-medium text-red-700">Blocked until:</span> {setting.blocking}
                </p>
              </div>
              <Badge color={SYSTEMS.find(s => s.id === setting.system)?.color || "gray"} size="xs">
                {SYSTEMS.find(s => s.id === setting.system)?.label.split(" ")[0]}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- Evidence Gaps View ---

function EvidenceView() {
  const [filterPriority, setFilterPriority] = useState("all");

  const filtered = filterPriority === "all" ? EVIDENCE_GAPS : EVIDENCE_GAPS.filter(g => g.priority === filterPriority);

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {["all", "P1", "P2"].map(p => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  filterPriority === p ? "bg-gray-900 text-white border-gray-900 shadow-sm" : "border-gray-200 text-gray-600 hover:border-gray-300 active:bg-gray-100"
                }`}
              >
                {p === "all" ? `All (${EVIDENCE_GAPS.length})` : `${p} (${EVIDENCE_GAPS.filter(g => g.priority === p).length})`}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500">Each gap blocks one or more settings from becoming actionable.</p>
        </div>
      </Card>

      <div className="space-y-2">
        {filtered.map(gap => (
          <Card key={gap.id} className="p-4">
            <div className="flex items-start gap-3">
              <StatusIcon status={gap.status} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-500">{gap.id}</span>
                  <span className="text-sm font-semibold text-gray-900">{gap.area}</span>
                  <Badge color={gap.priority === "P1" ? "red" : "amber"} size="xs">{gap.priority}</Badge>
                  <Badge color={gap.status === "open" ? "amber" : "blue"} size="xs">{gap.status}</Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1.5">
                  <span className="font-medium">Required evidence:</span> {gap.evidence}
                </p>
              </div>
              <Badge color={SYSTEMS.find(s => s.id === gap.system)?.color || "gray"} size="xs">
                {SYSTEMS.find(s => s.id === gap.system)?.label.split(" ")[0] || gap.system}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- Parts Register View ---

function PartsView() {
  const [filterSystem, setFilterSystem] = useState("all");
  const systemIds = [...new Set(PARTS.map(p => p.system))];
  const filtered = filterSystem === "all" ? PARTS : PARTS.filter(p => p.system === filterSystem);

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">{PARTS.filter(p => p.status === "unknown").length}</span> of {PARTS.length} tracked assemblies are unidentified. Component identity gates block ordering, machining, and settings.
          </p>
          <select
            value={filterSystem}
            onChange={e => setFilterSystem(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:ring-2 focus:ring-amber-500 focus-visible:outline-none bg-white shadow-sm"
          >
            <option value="all">All Systems</option>
            {systemIds.map(id => (
              <option key={id} value={id}>{SYSTEMS.find(s => s.id === id)?.label || id}</option>
            ))}
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">ID</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Assembly</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Part / Area</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Evidence Label</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(part => (
              <tr key={part.id} className="hover:bg-gray-50 transition-colors duration-100">
                <td className="px-4 py-3 text-xs font-mono text-gray-600">{part.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">{part.assembly}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{part.part}</td>
                <td className="px-4 py-3">
                  <Badge color={part.status === "unknown" ? "amber" : "green"} size="xs">
                    {part.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-gray-500">{part.label.replace(/_/g, " ")}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// --- Diagnostics View ---

function DiagnosticsView() {
  const [selectedPattern, setSelectedPattern] = useState(null);

  return (
    <div className="space-y-6">
      {/* Diagnostic Loop */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-900">Diagnostic Loop (Vintage Racecar Protocol)</h3>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {[
            { step: "1", label: "Define symptom" },
            { step: "2", label: "Safety hazards" },
            { step: "3", label: "Freeze config" },
            { step: "4", label: "List systems" },
            { step: "5", label: "One variable" },
            { step: "6", label: "Record result" },
            { step: "7", label: "Update KB" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-2 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-lg font-bold text-blue-700">{item.step}</span>
              <span className="text-xs text-blue-800 text-center leading-tight mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Fault Patterns */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-sm font-semibold text-gray-900">Reusable Fault Patterns</h3>
        </div>
        <div className="space-y-2">
          {DIAGNOSTIC_PATTERNS.map(pattern => (
            <div key={pattern.id}>
              <button
                onClick={() => setSelectedPattern(selectedPattern === pattern.id ? null : pattern.id)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors text-left"
              >
                <span className="text-sm font-medium text-gray-900">{pattern.label}</span>
                {selectedPattern === pattern.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {selectedPattern === pattern.id && (
                <div className="p-3 ml-4 mt-1 bg-white border-l-2 border-amber-300">
                  <p className="text-xs text-gray-700 leading-relaxed">{pattern.checks}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Diagnostic Answer Format */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Clipboard className="w-5 h-5 text-gray-600" />
          <h3 className="text-sm font-semibold text-gray-900">Answer Structure</h3>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-1">
          <p><span className="text-amber-400">Symptom definition:</span></p>
          <p><span className="text-amber-400">Immediate hazards:</span></p>
          <p><span className="text-amber-400">Most likely systems:</span></p>
          <p><span className="text-amber-400">Reversible checks:</span></p>
          <p><span className="text-amber-400">Evidence to record:</span></p>
          <p><span className="text-amber-400">Stop conditions:</span></p>
        </div>
      </Card>
    </div>
  );
}

// --- Sources View ---

function SourcesView() {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <p className="text-sm text-gray-700">
          Evidence tiers control what can become mechanic-facing advice. Tier 1 = official/primary. Tier 2 = strong secondary. Lead-only sources cannot produce actionable settings.
        </p>
      </Card>
      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">ID</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Source</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Type</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {SOURCES_KEY.map(src => (
              <tr key={src.id} className="hover:bg-gray-50 transition-colors duration-100">
                <td className="px-4 py-3 text-xs font-mono text-gray-600">{src.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">{src.label}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{src.type}</td>
                <td className="px-4 py-3">
                  <Badge color={src.tier === 1 ? "emerald" : "blue"} size="xs">Tier {src.tier}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Research Targets */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-semibold text-gray-900">Next Research Targets</h3>
        </div>
        <div className="space-y-2">
          {[
            "Use S020–S022 and S028 to request period JWA/Ford GT40 302 engine build, race-prep, part-drawing material (Box 116 Endurance 1968, Box 117 GT Program, Box 160 Shelby Racing)",
            "Verify 1968 entry engine, lap count, chassis, preparation via official entry list, program, scrutineering record, or ACO-licensed source",
            "Gurney-Weslake cylinder-head service drawings, valve/plug/chamber data, or repair-limit source beyond S024",
            "Installed car evidence: chassis number, engine/block/head photos, carburetor IDs, transaxle ID, brake hardware, wheel/hub/tire data",
            "ZF 5DS-25 component documentation through S008 if the installed unit is base ZF rather than Hewland",
          ].map((target, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 bg-indigo-50 rounded-lg">
              <span className="text-xs font-bold text-indigo-600 mt-0.5">{i + 1}.</span>
              <p className="text-xs text-gray-700 leading-relaxed">{target}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// --- Knowledge Expert Chat View ---

// Question routing engine — mirrors gt40-mechanic-question-routing skill logic
function routeQuestion(query) {
  const q = query.toLowerCase();

  // 1. Classify system
  let system = null;
  let systemLabel = "";
  if (/chassis|tub|body|panel|fiberglass|door|clip|structur/i.test(q)) { system = "chassis_body"; systemLabel = "Chassis & Body"; }
  else if (/engine|block|302|crank|piston|bore|stroke|compression|cam|valve|lash|rocker|rev.?limit|rpm/i.test(q)) { system = "engine"; systemLabel = "Engine"; }
  else if (/head|weslake|gurney|cylinder.?head|chamber|port/i.test(q)) { system = "engine"; systemLabel = "Engine (Gurney-Weslake Heads)"; }
  else if (/weber|carb|ida|jet|choke|induction|intake|fuel.?pressure|float|idle|mixture|linkage|throttle/i.test(q)) { system = "induction"; systemLabel = "Induction (Weber/IDA)"; }
  else if (/trans|gearbox|gear.?ratio|hewland|zf|lsd|differential|clutch|halfshaft|driveline|final.?drive/i.test(q)) { system = "driveline"; systemLabel = "Driveline & Transaxle"; }
  else if (/susp|spring|damper|shock|ride.?height|camber|caster|toe|corner.?weight|anti.?roll|steering|rack|bump.?steer/i.test(q)) { system = "suspension_steering"; systemLabel = "Suspension & Steering"; }
  else if (/brake|caliper|disc|pad|bias|master.?cyl|wheel|tire|tyre|center.?lock|hub|bearing|pressure/i.test(q)) { system = "brakes_wheels_tires"; systemLabel = "Brakes, Wheels & Tires"; }
  else if (/electric|wir|harness|fuse|relay|battery|master.?switch|gauge|sender|ignition(?!.*advance)|altern|starter|warning.?light/i.test(q)) { system = "electrical_instruments"; systemLabel = "Electrical & Instruments"; }
  else if (/fuel(?!.*pressure)|oil|cool|radiat|water|pump|sump|dry.?sump|thermostat|catch.?tank|fire/i.test(q)) { system = "fuel_oil_cooling"; systemLabel = "Fuel, Oil & Cooling"; }
  else if (/safe|appendix.?k|htp|belt|harness(?!.*wir)|extinguish|rops|cage|seat|event.?read|race.?read|track.?read/i.test(q)) { system = "safety"; systemLabel = "Safety Systems"; }
  else if (/torque|fastener|bolt|nut|thread|locking/i.test(q)) { system = "general"; systemLabel = "Workshop & Fasteners"; }
  else if (/vin|chassis.?number|identity|provenance|who.?built|history|registry/i.test(q)) { system = "identity"; systemLabel = "Identity & Provenance"; }
  else if (/homolog|appendix.?j|fia|regulation|group.?4|recognition/i.test(q)) { system = "rules"; systemLabel = "Regulatory / Homologation"; }

  // 2. Classify request type
  let requestType = "fact_lookup";
  if (/what.?torque|what.*set|how.?much|what.*pressure|what.*gap|what.*clearance|how.*adjust|spec|setting|value|number/i.test(q)) requestType = "setting_request";
  else if (/diagnos|symptom|won't.?start|no.?start|misfire|rough|overheat|leak|pull|vibrat|noise|smoke|problem|issue|fault/i.test(q)) requestType = "diagnostic";
  else if (/what.?part|identify|casting|serial|stamp|mark|what.*installed|which.*model/i.test(q)) requestType = "part_identification";
  else if (/source|where.*find|document|manual|reference|archive/i.test(q)) requestType = "source_acquisition";
  else if (/can.?i|safe|ready|complian|legal|allowed|permitted/i.test(q)) requestType = "safety_check";

  // 3. Gather relevant register data
  const relatedSettings = system ? SETTINGS.filter(s => s.system === system) : [];
  const relatedGaps = system ? EVIDENCE_GAPS.filter(g => g.system === system) : [];
  const relatedParts = system ? PARTS.filter(p => p.system === system) : [];
  const systemInfo = system ? SYSTEMS.find(s => s.id === system) : null;

  // 4. Build structured response
  let answerType = "";
  let verified = "";
  let blocked = "";
  let safeNextAction = "";
  let sources = "";
  let stopCondition = "";

  if (requestType === "setting_request") {
    answerType = "Blocked setting";
    if (relatedSettings.length > 0) {
      blocked = relatedSettings.map(s => `${s.id}: ${s.setting} — requires ${s.blocking}`).join("\n");
    } else {
      blocked = "No matching setting found in the register. This may be outside the tracked scope.";
    }
    verified = systemInfo ? `System coverage: ${systemInfo.status.replace(/_/g, " ")}. Homologation No. 224 baseline captured.` : "System not identified — rephrase with system context.";
    safeNextAction = "Identify and photograph the installed component. Record evidence per the applicable capture template before applying any numeric value.";
    sources = relatedSettings.length > 0 ? "settings-register.csv, evidence-gap-register.csv" : "";
  } else if (requestType === "diagnostic") {
    answerType = "Diagnostic workflow";
    verified = "Diagnostic loop: 1) Define symptom 2) Safety hazards 3) Freeze config 4) List systems 5) One variable 6) Record result 7) Update KB";
    blocked = relatedGaps.length > 0 ? `Evidence gaps in ${systemLabel}: ${relatedGaps.map(g => g.area).join(", ")}` : "";
    safeNextAction = "Apply the vintage racecar diagnostics loop. Stop if fuel leaks, unknown oil pressure, brake/steering uncertainty, electrical smoke, or un-preoiled engine.";
    stopCondition = "Do not run engine or move car until safety-stop conditions are cleared.";
    sources = "vintage-racecar-diagnostics/SKILL.md, diagnostic-patterns.md";
  } else if (requestType === "part_identification") {
    answerType = "Component identification task";
    if (relatedParts.length > 0) {
      verified = relatedParts.map(p => `${p.id}: ${p.assembly} — ${p.part} (status: ${p.status}, label: ${p.label.replace(/_/g, " ")})`).join("\n");
    } else {
      verified = "No matching parts in this system's register.";
    }
    blocked = "Installed hardware identity is unknown. Do not order, machine, or apply settings until identification is complete.";
    safeNextAction = "Photograph all markings, casting numbers, stamps, serials, and foundry marks before cleaning. Use the component-identification procedure.";
    sources = "parts-register.csv, configuration-register.csv, procedures/component-identification.md";
  } else if (requestType === "safety_check") {
    answerType = "Safety/event-readiness gate";
    const safetyGaps = EVIDENCE_GAPS.filter(g => g.system === "safety");
    verified = "Current FIA Appendix K (S019) safety gates are captured. Installed safety equipment is NOT verified.";
    blocked = safetyGaps.map(g => `${g.id}: ${g.area} — needs: ${g.evidence}`).join("\n");
    safeNextAction = "Build a safety evidence packet. Do not declare track-ready, race-ready, or Appendix K compliant until installed equipment, event rules, and HTP state are captured.";
    stopCondition = "Never declare the car safe or event-ready based on homologation baseline alone.";
    sources = "S019, gt40-safety-event-readiness/SKILL.md, safety-systems.md";
  } else if (requestType === "source_acquisition") {
    answerType = "Source/research task";
    verified = "Key captured sources: S009 (Appendix J 1968), S015 (Homologation 224), S016 (Hewland LG500/600), S018 (Weber/IDA support), S019 (Appendix K), S024 (Gurney-Weslake), S025 (ACO 1968 API).";
    blocked = "Period service manuals, race-prep sheets, engine build data, and installed-car evidence are still missing.";
    safeNextAction = "Target S020–S022 and S028 (Dave Friedman Collection) for Ford/JWA GT40 302 material. For installed car: photograph chassis, engine, carburetors, transaxle, brakes, wheels.";
    sources = "source-register.csv, knowledge/index.md, 03-research-backlog.md";
  } else {
    // General fact lookup
    answerType = "Fact lookup / evidence boundary";
    if (systemInfo) {
      verified = `System: ${systemLabel}. Coverage: ${systemInfo.status.replace(/_/g, " ")}. Page: knowledge/${systemInfo.page}`;
      if (relatedGaps.length > 0) {
        blocked = `Open evidence gaps: ${relatedGaps.map(g => `${g.id} (${g.area})`).join(", ")}`;
      }
    } else {
      verified = "Could not classify to a specific system. Try rephrasing with system keywords (engine, brakes, suspension, electrical, etc.)";
    }
    safeNextAction = relatedGaps.length > 0 ? `Resolve ${relatedGaps[0]?.id}: ${relatedGaps[0]?.evidence}` : "Consult the knowledge index for the relevant system page.";
    sources = "knowledge/index.md, fact-register.csv";
  }

  return { system, systemLabel, requestType, answerType, verified, blocked, safeNextAction, sources, stopCondition, relatedSettings, relatedGaps, relatedParts };
}

const EXAMPLE_QUESTIONS = [
  "What's the valve lash spec for the Gurney-Weslake heads?",
  "Can I use 5W-30 in this engine?",
  "The car won't start — where do I begin?",
  "What Weber jets should be in these carbs?",
  "Is the car safe for a track day?",
  "How do I identify the transaxle?",
  "What torque for the center-lock wheel nuts?",
  "Where can I find the original service manual?",
];

function ExpertChatView() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: "assistant",
      content: "I'm the GT40 Knowledge Expert. Ask me anything about this 1968-era Ford GT40 Mk I with Gurney-Weslake 302.\n\nI'll route your question through the local knowledge base — checking coverage, registers, evidence gates, and source policy — and give you a structured answer with what's verified, what's blocked, and the safe next action.\n\nI will never invent torque values, clearances, jetting, timing, pressures, or fluid quantities.",
      data: null,
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: messages.length, role: "user", content: input.trim(), data: null };

    // Route question
    const result = routeQuestion(input.trim());
    const assistantMsg = {
      id: messages.length + 1,
      role: "assistant",
      content: null,
      data: result,
    };

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setInput("");
  };

  const handleExample = (question) => {
    setInput(question);
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 scroll-smooth">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 animate-[fadeIn_0.2s_ease-out] ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                <Bot className="w-4 h-4 text-amber-700" />
              </div>
            )}
            <div className={`max-w-2xl ${msg.role === "user" ? "bg-gray-900 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-sm" : "bg-white border border-gray-200 rounded-2xl rounded-bl-md shadow-sm"}`}>
              {msg.role === "user" && <p className="text-sm">{msg.content}</p>}
              {msg.role === "assistant" && !msg.data && (
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-700 whitespace-pre-line">{msg.content}</p>
                </div>
              )}
              {msg.role === "assistant" && msg.data && (
                <div className="px-4 py-4 space-y-3">
                  {/* Classification header */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge color="indigo" size="sm">{msg.data.requestType.replace(/_/g, " ")}</Badge>
                    {msg.data.systemLabel && <Badge color={SYSTEMS.find(s => s.id === msg.data.system)?.color || "gray"} size="sm">{msg.data.systemLabel}</Badge>}
                  </div>

                  {/* Answer type */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Answer type:</span>
                    <span className="text-sm font-medium text-gray-900">{msg.data.answerType}</span>
                  </div>

                  {/* Verified */}
                  {msg.data.verified && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Verified from local KB:</p>
                      <p className="text-xs text-gray-800 whitespace-pre-line leading-relaxed">{msg.data.verified}</p>
                    </div>
                  )}

                  {/* Blocked */}
                  {msg.data.blocked && (
                    <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Lock className="w-3 h-3 text-red-500" />
                        <p className="text-xs font-semibold text-red-700 uppercase tracking-wider">Blocked / not yet known:</p>
                      </div>
                      <p className="text-xs text-gray-800 whitespace-pre-line leading-relaxed">{msg.data.blocked}</p>
                    </div>
                  )}

                  {/* Stop condition */}
                  {msg.data.stopCondition && (
                    <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <XCircle className="w-3 h-3 text-rose-600" />
                        <p className="text-xs font-semibold text-rose-700 uppercase tracking-wider">Safety stop:</p>
                      </div>
                      <p className="text-xs text-gray-800">{msg.data.stopCondition}</p>
                    </div>
                  )}

                  {/* Safe next action */}
                  {msg.data.safeNextAction && (
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <ArrowRight className="w-3 h-3 text-emerald-600" />
                        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Safe next action:</p>
                      </div>
                      <p className="text-xs text-gray-800">{msg.data.safeNextAction}</p>
                    </div>
                  )}

                  {/* Sources */}
                  {msg.data.sources && (
                    <div className="flex items-start gap-1.5 pt-1">
                      <Database className="w-3 h-3 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-500">{msg.data.sources}</p>
                    </div>
                  )}

                  {/* Related settings summary */}
                  {msg.data.relatedSettings.length > 0 && msg.data.requestType === "setting_request" && msg.data.relatedSettings.length <= 4 && (
                    <div className="pt-2 border-t border-gray-100 space-y-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Related blocked settings:</p>
                      {msg.data.relatedSettings.slice(0, 4).map(s => (
                        <div key={s.id} className="flex items-center gap-2">
                          <Lock className="w-3 h-3 text-red-400" />
                          <span className="text-xs font-mono text-gray-500">{s.id}</span>
                          <span className="text-xs text-gray-700">{s.setting}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Example Questions */}
      {messages.length <= 1 && (
        <div className="flex-shrink-0 pb-3">
          <p className="text-xs font-medium text-gray-500 mb-2.5 uppercase tracking-wider">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleExample(q)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 hover:border-amber-300 hover:bg-amber-50 active:bg-amber-100 transition-all duration-150 shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 border-t border-gray-200 pt-4 pb-2 bg-gray-100">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Ask about settings, diagnostics, parts, sources, or safety..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm bg-white shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:outline-none transition-shadow placeholder:text-gray-400"
            aria-label="Ask the knowledge expert a question"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-5 py-3 bg-amber-500 text-gray-950 rounded-xl font-semibold text-sm hover:bg-amber-400 active:bg-amber-600 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            aria-label="Send question"
          >
            <Send className="w-4 h-4" />
            Ask
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Answers are routed through local registers. No folklore, no guessing. Blocked = evidence required before actionable.
        </p>
      </div>
    </div>
  );
}

// --- Main App ---

export default function MasterMechanic() {
  const [activeView, setActiveView] = useState("overview");

  const viewTitles = {
    overview: "Vehicle Overview",
    expert: "Knowledge Expert",
    systems: "Systems Coverage Matrix",
    settings: "Settings Governance",
    evidence: "Evidence Gap Register",
    parts: "Parts Identification Register",
    diagnostics: "Diagnostic Workbench",
    sources: "Source Control",
  };

  const viewDescriptions = {
    overview: "1968-era Ford GT40 Mk I · Gurney-Weslake 302 — current knowledge state and safety controls.",
    expert: "Ask questions and get evidence-routed answers from the GT40 knowledge base.",
    systems: "Coverage status by system against the full mechanics-assistant objective.",
    settings: "Every numeric setup value is blocked until installed hardware and source evidence are verified.",
    evidence: "Missing evidence required to unblock systems and settings. P1 gaps must be resolved first.",
    parts: "Component identity gates — no ordering, machining, or settings until hardware is verified.",
    diagnostics: "Safety-first, reversible, evidence-backed fault diagnosis for vintage racecars.",
    sources: "Tiered evidence control — what sources exist and what they can and cannot prove.",
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">
        <header className="flex-shrink-0 px-8 pt-8 pb-4 border-b border-gray-200 bg-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{viewTitles[activeView]}</h1>
          <p className="text-sm text-gray-500 mt-1">{viewDescriptions[activeView]}</p>
        </header>
        <div className={`flex-1 overflow-y-auto ${activeView === "expert" ? "px-8 pt-6" : "p-8"}`}>
          {activeView === "overview" && <OverviewView />}
          {activeView === "expert" && <ExpertChatView />}
          {activeView === "systems" && <SystemsView />}
          {activeView === "settings" && <SettingsView />}
          {activeView === "evidence" && <EvidenceView />}
          {activeView === "parts" && <PartsView />}
          {activeView === "diagnostics" && <DiagnosticsView />}
          {activeView === "sources" && <SourcesView />}
        </div>
      </main>
    </div>
  );
}
