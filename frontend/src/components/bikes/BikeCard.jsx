import { formatPrice, formatCC } from "../../utils/formatters";

const SpecBadge = ({ icon, label, accent }) => (
  <span
    className={
      accent
        ? "bg-secondary/10 text-on-secondary-container px-3 py-1.5 rounded-full text-label-sm flex items-center gap-1 border border-secondary/20 ml-auto"
        : "bg-surface-container-highest text-on-surface px-3 py-1.5 rounded-full text-label-sm flex items-center gap-1 border border-outline-variant/10"
    }
  >
    <span
      className={`material-symbols-outlined text-[16px] ${accent ? "text-secondary" : "text-on-surface-variant"}`}
    >
      {icon}
    </span>
    {label}
  </span>
);

const BikeCard = ({ bike }) => (
  <article className="group bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary shadow-sm hover:shadow-md flex flex-col h-full relative">
    <span className="absolute top-4 left-4 z-10 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm uppercase tracking-wider flex items-center gap-1 shadow-sm">
      <span className="material-symbols-outlined text-[14px]">fiber_new</span>{" "}
      New
    </span>

    <div className="relative w-full pt-[60%] bg-surface-container-low overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {bike.image ? (
          <img
            src={bike.image}
            alt={bike.name}
            className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-6xl">🏍️</span>
        )}
      </div>
    </div>

    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-headline-md text-on-surface mb-4 group-hover:text-primary transition-colors tracking-tight">
        {bike.name}
      </h3>

      <div className="flex flex-wrap gap-2 mb-6">
        <SpecBadge icon="speed" label={formatCC(bike.cc)} />
        <SpecBadge icon="payments" label={formatPrice(bike.price)} />
        <SpecBadge icon="local_gas_station" label={bike.fuelAvg} accent />
      </div>

      <div className="mt-auto space-y-3">
        <button className="w-full flex items-center justify-center gap-2 py-2 border border-primary/30 text-primary text-label-md rounded-lg hover:bg-primary/5 transition-colors">
          <span className="material-symbols-outlined text-[20px]">
            play_circle
          </span>
          Play Sound
        </button>
        <button className="w-full py-3 bg-primary text-on-primary text-label-md rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm">
          View Details
        </button>
      </div>
    </div>
  </article>
);

export default BikeCard;
