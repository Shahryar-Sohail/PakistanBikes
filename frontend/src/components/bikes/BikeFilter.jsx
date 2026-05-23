import { BRANDS } from "../../constants";

const CC_OPTIONS = ["70cc", "100cc", "125cc", "150cc", "200cc+"];
const PRICE_OPTIONS = ["Under 100k", "100k - 200k", "200k - 300k", "300k+"];
const FUEL_OPTIONS = ["40+ km/l", "50+ km/l", "60+ km/l"];

const FilterSelect = ({ name, value, onChange, placeholder, options }) => (
  <div className="relative w-full group">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full appearance-none bg-surface text-on-surface text-body-md py-3 pl-4 pr-10 rounded-lg border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer transition-colors shadow-sm"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none group-focus-within:text-primary">
      expand_more
    </span>
  </div>
);

const BikeFilter = ({ filters, onChange }) => {
  const handle = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value || undefined });
  };

  return (
    <section className="w-full bg-surface-container border-b border-outline-variant/10 sticky top-[73px] z-40 backdrop-blur-md py-4 px-margin-mobile md:px-margin-desktop shadow-sm">
      <div className="max-w-container-max mx-auto flex flex-col lg:flex-row gap-4 items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full flex-grow">
          <FilterSelect
            name="brand"
            value={filters.brand || ""}
            onChange={handle}
            placeholder="All Brands"
            options={BRANDS}
          />
          <FilterSelect
            name="cc"
            value={filters.cc || ""}
            onChange={handle}
            placeholder="CC Range"
            options={CC_OPTIONS}
          />
          <FilterSelect
            name="priceRange"
            value={filters.priceRange || ""}
            onChange={handle}
            placeholder="Price Range"
            options={PRICE_OPTIONS}
          />
          <FilterSelect
            name="fuelAvg"
            value={filters.fuelAvg || ""}
            onChange={handle}
            placeholder="Fuel Average"
            options={FUEL_OPTIONS}
          />
        </div>

        <button className="w-full lg:w-auto px-6 py-3 bg-primary text-on-primary rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm shrink-0">
          <span className="material-symbols-outlined text-[20px]">search</span>
          <span className="text-label-md">Search</span>
        </button>
      </div>
    </section>
  );
};

export default BikeFilter;
