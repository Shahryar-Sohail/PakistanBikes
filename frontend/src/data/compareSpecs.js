// Spec group definitions used by the Compare page.
// compare(a, b) > 0 means bike A wins, < 0 means bike B wins, 0 means tie.

const num = (str) => parseFloat(str) || 0;

export const SPEC_GROUPS = [
  {
    icon: "engineering",
    title: "Engine & Transmission",
    rows: [
      {
        label: "Displacement",
        getValue: (b) => `${b.cc}cc`,
        compare: (a, b) => a.cc - b.cc,
      },
      {
        label: "Power",
        getValue: (b) => b.specs.power,
        compare: (a, b) => num(a.specs.power) - num(b.specs.power),
      },
      {
        label: "Torque",
        getValue: (b) => b.specs.torque,
        compare: (a, b) => num(a.specs.torque) - num(b.specs.torque),
      },
      {
        label: "Transmission",
        getValue: (b) => b.specs.transmission,
        compare: () => 0,
      },
    ],
  },
  {
    icon: "straighten",
    title: "Dimensions & Capacity",
    rows: [
      {
        label: "Fuel Capacity",
        getValue: (b) => b.specs.fuelCapacity,
        compare: (a, b) => num(a.specs.fuelCapacity) - num(b.specs.fuelCapacity),
      },
      {
        label: "Mileage",
        getValue: (b) => b.specs.mileage,
        compare: (a, b) => num(a.specs.mileage) - num(b.specs.mileage),
      },
      {
        label: "Dry Weight",
        getValue: (b) => b.specs.weight,
        // Lower weight is better — reversed comparison
        compare: (a, b) => num(b.specs.weight) - num(a.specs.weight),
      },
    ],
  },
];
