const SPECS = [
  { icon: "settings",        label: "Engine",                  get: (b) => b.specs.engine,                               full: false },
  { icon: "speed",           label: "Top Speed",               get: (b) => b.specs.topSpeed,                             full: false },
  { icon: "bolt",            label: "Power",                   get: (b) => b.specs.power,                                full: false },
  { icon: "directions_bike", label: "Torque",                  get: (b) => b.specs.torque,                               full: false },
  { icon: "local_gas_station", label: "Fuel Capacity & Mileage", get: (b) => `${b.specs.fuelCapacity} | ${b.specs.mileage}`, full: true },
];

const SpecCard = ({ icon, label, value, full }) => (
  <div className={`bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20 hover:border-primary hover:-translate-y-1 transition-all duration-300 ${full ? "col-span-2" : ""}`}>
    <p className="text-label-sm text-on-surface-variant mb-1 flex items-center gap-1">
      <span className="material-symbols-outlined text-[16px]">{icon}</span>
      {label}
    </p>
    <p className="text-body-md text-on-surface font-semibold">{value ?? "—"}</p>
  </div>
);

const SpecsGrid = ({ bike }) => (
  <div className="grid grid-cols-2 gap-4">
    {SPECS.map(({ icon, label, get, full }) => (
      <SpecCard key={label} icon={icon} label={label} value={get(bike)} full={full} />
    ))}
  </div>
);

export default SpecsGrid;
