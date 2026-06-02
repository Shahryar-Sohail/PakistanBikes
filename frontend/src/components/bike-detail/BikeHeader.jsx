import { formatPrice, formatCC } from "../../utils/formatters";

const BikeHeader = ({ bike }) => (
  <div>
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="bg-[#1C1C1E] text-white px-3 py-1 rounded-full text-label-sm">{bike.brand}</span>
      <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full text-label-sm">{bike.year}</span>
      <span className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-full text-label-sm border border-outline-variant/30">
        {formatCC(bike.cc)}
      </span>
    </div>
    <h1 className="text-display-lg-mobile md:text-display-lg text-on-background mb-2">{bike.name}</h1>
    <p className="text-headline-md text-primary">{formatPrice(bike.price)}</p>
  </div>
);

export default BikeHeader;
