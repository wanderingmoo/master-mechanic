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

function AskGemmaButton({ onAsk, prompt, label = "Ask Gemma", className = "" }) {
  return (
    <button
      type="button"
      onClick={() => onAsk(prompt)}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-200 bg-amber-50 text-xs font-semibold text-amber-800 hover:bg-amber-100 active:bg-amber-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${className}`}
    >
      <MessageSquare className="w-3.5 h-3.5" />
      {label}
    </button>
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

function OverviewView({ onAsk, settings = SETTINGS, evidenceGaps = EVIDENCE_GAPS, parts = PARTS }) {
  const p1Gaps = evidenceGaps.filter(g => g.priority === "P1" && g.status === "open").length;
  const blockedSettings = settings.filter(s => s.status === "blocked").length;
  const unknownParts = parts.filter(p => p.status === "unknown").length;

  return (
    <div className="space-y-6">
      {/* Vehicle Identity Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{VEHICLE.description}</h2>
            <p className="text-sm text-gray-600 mt-1">{VEHICLE.engine}</p>
          </div>
          <div className="flex items-center gap-2">
            <AskGemmaButton
              onAsk={onAsk}
              prompt="Summarize the current vehicle identity, readiness blockers, and safest next evidence to collect."
              label="Ask Gemma for status"
            />
            <Badge color="amber" size="md">Identification Required</Badge>
          </div>
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

function SystemsView({ onAsk, settings = SETTINGS, evidenceGaps = EVIDENCE_GAPS, parts = PARTS }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-3">
      {SYSTEMS.map(sys => {
        const sysSettings = settings.filter(s => s.system === sys.id);
        const sysGaps = evidenceGaps.filter(g => g.system === sys.id);
        const sysParts = parts.filter(p => p.system === sys.id);
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
                <div className="flex justify-end pt-1">
                  <AskGemmaButton
                    onAsk={onAsk}
                    prompt={`Review the ${sys.label} system. Explain its verified facts, current blockers, and safest next action.`}
                    label={`Ask about ${sys.label}`}
                  />
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

// --- Settings Gates View ---

function SettingsView({ onAsk, settings = SETTINGS }) {
  const [filterSystem, setFilterSystem] = useState("all");

  const filtered = filterSystem === "all" ? settings : settings.filter(s => s.system === filterSystem);
  const systemIds = [...new Set(settings.map(s => s.system))];
  const blockedCount = settings.filter(setting => setting.status === "blocked").length;

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-red-500" />
            <p className="text-sm font-semibold text-gray-900">{blockedCount} of {settings.length} tracked settings are blocked until installed hardware and source evidence are verified.</p>
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
              <AskGemmaButton
                onAsk={onAsk}
                prompt={`Explain setting ${setting.id} (${setting.setting}), why it is blocked, and the exact evidence needed to unblock it.`}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- Evidence Gaps View ---

function EvidenceView({ onAsk, evidenceGaps = EVIDENCE_GAPS }) {
  const [filterPriority, setFilterPriority] = useState("all");

  const filtered = filterPriority === "all" ? evidenceGaps : evidenceGaps.filter(g => g.priority === filterPriority);

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
                {p === "all" ? `All (${evidenceGaps.length})` : `${p} (${evidenceGaps.filter(g => g.priority === p).length})`}
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
              <AskGemmaButton
                onAsk={onAsk}
                prompt={`Explain evidence gap ${gap.id} (${gap.area}) and give a safe, specific capture plan to resolve it.`}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- Parts Register View ---

function PartsView({ onAsk, parts = PARTS }) {
  const [filterSystem, setFilterSystem] = useState("all");
  const systemIds = [...new Set(parts.map(p => p.system))];
  const filtered = filterSystem === "all" ? parts : parts.filter(p => p.system === filterSystem);

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">{parts.filter(p => p.status === "unknown").length}</span> of {parts.length} tracked assemblies are unidentified. Component identity gates block ordering, machining, and settings.
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
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">AI</th>
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
                <td className="px-4 py-3 text-right">
                  <AskGemmaButton
                    onAsk={onAsk}
                    prompt={`Explain how to identify part ${part.id} (${part.assembly}: ${part.part}), what evidence to capture, and which actions remain blocked.`}
                  />
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

function DiagnosticsView({ onAsk }) {
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
                <div className="p-3 ml-4 mt-1 bg-white border-l-2 border-amber-300 space-y-3">
                  <p className="text-xs text-gray-700 leading-relaxed">{pattern.checks}</p>
                  <AskGemmaButton
                    onAsk={onAsk}
                    prompt={`Use the vintage racecar diagnostic workflow for this symptom: ${pattern.label}. Start with immediate hazards and reversible checks; do not invent settings.`}
                    label="Run with Gemma"
                  />
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

function SourcesView({ onAsk, sources = SOURCES_KEY }) {
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
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">AI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sources.map(src => (
              <tr key={src.id} className="hover:bg-gray-50 transition-colors duration-100">
                <td className="px-4 py-3 text-xs font-mono text-gray-600">{src.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">{src.label}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{src.type}</td>
                <td className="px-4 py-3">
                  <Badge color={src.tier === 1 ? "emerald" : "blue"} size="xs">Tier {src.tier}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <AskGemmaButton
                    onAsk={onAsk}
                    prompt={`Explain what source ${src.id} can and cannot establish for this vehicle, including its applicability limits.`}
                  />
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

function InlineAnswerText({ text }) {
  return text.split(/(\*\*.*?\*\*|`.*?`)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index} className="px-1 py-0.5 rounded bg-gray-100 font-mono text-xs">{part.slice(1, -1)}</code>;
    }
    return <span key={index}>{part}</span>;
  });
}

function ExpertAnswer({ content }) {
  const headingPattern = /^(Answer type|Verified from local KB|Blocked \/ not yet known|Safe next action|Sources \/ local indexes):\s*(.*)$/i;

  return (
    <div className="space-y-1.5 text-sm text-gray-800 leading-relaxed">
      {content.split("\n").map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-1" />;
        const heading = trimmed.match(headingPattern);
        if (heading) {
          return (
            <div key={index} className="pt-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{heading[1]}:</p>
              {heading[2] && <p className="mt-1 whitespace-pre-wrap"><InlineAnswerText text={heading[2]} /></p>}
            </div>
          );
        }
        return <p key={index} className="whitespace-pre-wrap"><InlineAnswerText text={line} /></p>;
      })}
    </div>
  );
}

const EXPERT_INTRO_MESSAGE = {
  id: "intro",
  role: "assistant",
  content: "I'm the GT40 Knowledge Expert, powered locally by Gemma through Ollama.\n\nI route each question through the live repository briefs, registers, evidence gates, and specialist skills before answering. I will not invent blocked settings or treat generic GT40 information as proof of this car's installed configuration.",
  status: "complete",
  meta: null,
};

function loadExpertMessages() {
  try {
    const saved = sessionStorage.getItem("master-mechanic-expert-messages");
    const messages = saved ? JSON.parse(saved) : null;
    return Array.isArray(messages) && messages.length ? messages : [EXPERT_INTRO_MESSAGE];
  } catch {
    return [EXPERT_INTRO_MESSAGE];
  }
}

function AIExpertChatView({ initialRequest, onRequestConsumed }) {
  const [messages, setMessages] = useState(loadExpertMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backend, setBackend] = useState({ status: "checking", model: "gemma4:e4b-mlx", message: "Checking Ollama…" });
  const messagesEndRef = useRef(null);
  const consumedRequestRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/health")
      .then(async response => ({ ok: response.ok, data: await response.json() }))
      .then(({ ok, data }) => {
        if (cancelled) return;
        if (ok && data.connected && data.modelAvailable) {
          setBackend({ status: "online", model: data.model, message: `${data.model} ready` });
        } else {
          setBackend({ status: "offline", model: data.model || "Gemma", message: data.error || `${data.model} is not installed` });
        }
      })
      .catch(() => {
        if (!cancelled) setBackend({ status: "offline", model: "Gemma", message: "Ollama backend unavailable" });
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    sessionStorage.setItem("master-mechanic-expert-messages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (questionOverride) => {
    const question = (typeof questionOverride === "string" ? questionOverride : input).trim();
    if (!question || isLoading) return;

    const history = messages
      .filter(message => message.id !== "intro" && message.status === "complete" && message.content)
      .map(message => ({ role: message.role, content: message.content }))
      .slice(-8);
    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const userMessage = { id: `${requestId}-user`, role: "user", content: question, status: "complete", meta: null };
    const pendingMessage = {
      id: `${requestId}-assistant`,
      role: "assistant",
      content: "Gemma is checking the live evidence registers…",
      status: "pending",
      meta: null,
    };

    setMessages(previous => [...previous, userMessage, pendingMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The local AI backend could not answer.");

      setMessages(previous => previous.map(message => message.id === pendingMessage.id
        ? { ...message, content: result.answer, status: "complete", meta: result }
        : message));
      setBackend({ status: "online", model: result.model, message: `${result.model} ready` });
    } catch (error) {
      setMessages(previous => previous.map(message => message.id === pendingMessage.id
        ? { ...message, content: error.message, status: "error", meta: null }
        : message));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialRequest || consumedRequestRef.current === initialRequest.id) return;
    consumedRequestRef.current = initialRequest.id;
    onRequestConsumed(initialRequest.id);
    handleSend(initialRequest.text);
  }, [initialRequest]);

  const statusColor = backend.status === "online" ? "bg-emerald-500" : backend.status === "checking" ? "bg-amber-400" : "bg-red-500";

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-200">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${statusColor} ${backend.status === "checking" ? "animate-pulse" : ""}`} />
          <p className="text-xs text-gray-600 truncate" title={backend.message}>{backend.message}</p>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 1 && (
            <button
              type="button"
              onClick={() => setMessages([EXPERT_INTRO_MESSAGE])}
              disabled={isLoading}
              className="text-xs font-medium text-gray-500 hover:text-gray-800 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
            >
              Clear chat
            </button>
          )}
          <Badge color={backend.status === "online" ? "emerald" : backend.status === "checking" ? "amber" : "red"} size="xs">
            Local Ollama
          </Badge>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4 scroll-smooth" aria-live="polite">
        {messages.map(message => (
          <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" && (
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ${message.status === "error" ? "bg-red-100" : "bg-amber-100"}`}>
                {message.status === "pending"
                  ? <Activity className="w-4 h-4 text-amber-700 animate-pulse" />
                  : message.status === "error"
                    ? <AlertCircle className="w-4 h-4 text-red-700" />
                    : <Bot className="w-4 h-4 text-amber-700" />}
              </div>
            )}
            <div className={`max-w-3xl ${message.role === "user"
              ? "bg-gray-900 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-sm"
              : `bg-white border rounded-2xl rounded-bl-md shadow-sm px-4 py-3 ${message.status === "error" ? "border-red-200" : "border-gray-200"}`}`}>
              {message.role === "user" && <p className="text-sm">{message.content}</p>}
              {message.role === "assistant" && message.status === "complete" && (
                message.id === "intro"
                  ? <p className="text-sm text-gray-700 whitespace-pre-line">{message.content}</p>
                  : <ExpertAnswer content={message.content} />
              )}
              {message.role === "assistant" && message.status === "pending" && (
                <p className="text-sm text-gray-500">{message.content}</p>
              )}
              {message.role === "assistant" && message.status === "error" && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-700 mb-1">Backend error</p>
                  <p className="text-sm text-red-800">{message.content}</p>
                </div>
              )}
              {message.meta && (
                <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <Badge color="indigo" size="xs">{message.meta.route.requestType.replace(/_/g, " ")}</Badge>
                  {message.meta.route.system && <Badge color="slate" size="xs">{message.meta.route.systemLabel}</Badge>}
                  <span>{(message.meta.durationMs / 1000).toFixed(1)}s</span>
                  <span title={message.meta.contextSources.join("\n")}>{message.meta.contextSources.length} local evidence inputs</span>
                </div>
              )}
            </div>
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className="flex-shrink-0 pb-3">
          <p className="text-xs font-medium text-gray-500 mb-2.5 uppercase tracking-wider">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_QUESTIONS.map(question => (
              <button
                key={question}
                type="button"
                onClick={() => handleSend(question)}
                disabled={isLoading}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 hover:border-amber-300 hover:bg-amber-50 active:bg-amber-100 transition-all duration-150 shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-shrink-0 border-t border-gray-200 pt-4 pb-2 bg-gray-100">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={event => setInput(event.target.value)}
            onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); handleSend(); } }}
            disabled={isLoading}
            placeholder="Ask me a question, I'm William's second-brain."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm bg-white shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:outline-none transition-shadow placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-400"
            aria-label="Ask the knowledge expert a question"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="px-5 py-3 bg-amber-500 text-gray-950 rounded-xl font-semibold text-sm hover:bg-amber-400 active:bg-amber-600 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            aria-label="Send question"
          >
            {isLoading ? <Activity className="w-4 h-4 animate-pulse" /> : <Send className="w-4 h-4" />}
            {isLoading ? "Thinking" : "Ask"}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Gemma runs locally through Ollama. Answers are grounded in live repository briefs and remain evidence-gated.
        </p>
      </div>
    </div>
  );
}

// --- Main App ---

export default function MasterMechanic() {
  const [activeView, setActiveView] = useState("overview");
  const [expertRequest, setExpertRequest] = useState(null);
  const [knowledgeData, setKnowledgeData] = useState(null);
  const [knowledgeStatus, setKnowledgeStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/knowledge")
      .then(async response => {
        if (!response.ok) throw new Error("Knowledge API unavailable");
        return response.json();
      })
      .then(data => {
        if (cancelled) return;
        setKnowledgeData(data);
        setKnowledgeStatus("live");
      })
      .catch(() => {
        if (!cancelled) setKnowledgeStatus("fallback");
      });
    return () => { cancelled = true; };
  }, []);

  const liveSettings = knowledgeData?.settings || SETTINGS;
  const liveEvidenceGaps = knowledgeData?.evidenceGaps || EVIDENCE_GAPS;
  const liveParts = knowledgeData?.parts || PARTS;
  const liveSources = knowledgeData?.sources || SOURCES_KEY;

  const askGemma = (text) => {
    setExpertRequest({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text });
    setActiveView("expert");
  };

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
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{viewTitles[activeView]}</h1>
              <p className="text-sm text-gray-500 mt-1">{viewDescriptions[activeView]}</p>
            </div>
            <Badge
              color={knowledgeStatus === "live" ? "emerald" : knowledgeStatus === "loading" ? "amber" : "red"}
              size="xs"
            >
              {knowledgeStatus === "live" ? "Live KB" : knowledgeStatus === "loading" ? "Loading KB" : "KB fallback"}
            </Badge>
          </div>
        </header>
        <div className={`flex-1 overflow-y-auto ${activeView === "expert" ? "px-8 pt-6" : "p-8"}`}>
          {activeView === "overview" && (
            <OverviewView
              onAsk={askGemma}
              settings={liveSettings}
              evidenceGaps={liveEvidenceGaps}
              parts={liveParts}
            />
          )}
          {activeView === "expert" && (
            <AIExpertChatView
              initialRequest={expertRequest}
              onRequestConsumed={() => setExpertRequest(null)}
            />
          )}
          {activeView === "systems" && (
            <SystemsView
              onAsk={askGemma}
              settings={liveSettings}
              evidenceGaps={liveEvidenceGaps}
              parts={liveParts}
            />
          )}
          {activeView === "settings" && <SettingsView onAsk={askGemma} settings={liveSettings} />}
          {activeView === "evidence" && <EvidenceView onAsk={askGemma} evidenceGaps={liveEvidenceGaps} />}
          {activeView === "parts" && <PartsView onAsk={askGemma} parts={liveParts} />}
          {activeView === "diagnostics" && <DiagnosticsView onAsk={askGemma} />}
          {activeView === "sources" && <SourcesView onAsk={askGemma} sources={liveSources} />}
        </div>
      </main>
    </div>
  );
}
