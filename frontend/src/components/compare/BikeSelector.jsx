const BikeDropdown = ({ value, onChange, bikes }) => (
  <div className="relative group">
    <select
      value={value}
      onChange={onChange}
      className="w-full appearance-none bg-surface-container-lowest border border-outline-variant/30 text-on-surface text-headline-md p-4 pr-12 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
    >
      {bikes.map((b) => (
        <option key={b.id} value={b.id}>{b.name}</option>
      ))}
    </select>
    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-hover:text-primary pointer-events-none">
      expand_more
    </span>
  </div>
);

const BikeImage = ({ bike, dim }) => (
  <div className={`w-full h-48 bg-surface-container rounded-xl overflow-hidden border border-outline-variant/10 flex items-center justify-center p-4 ${dim ? "opacity-80" : ""}`}>
    {bike?.image
      ? <img src={bike.image} alt={bike.name} className={`w-full h-full object-contain drop-shadow-lg mix-blend-multiply ${dim ? "grayscale-[20%]" : ""}`} />
      : <span className="text-6xl">🏍️</span>
    }
  </div>
);

const WinnerBadge = () => (
  <div className="absolute -top-6 left-0 bg-secondary text-on-secondary text-label-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm z-10">
    <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
    OVERALL WINNER
  </div>
);

const BikeSelector = ({ bikes, bike1Id, bike2Id, onBike1Change, onBike2Change, overallWinner }) => (
  <div className="grid grid-cols-12 gap-gutter mb-8 sticky top-[73px] bg-background/95 backdrop-blur-md z-40 py-4 border-b border-outline-variant/20">

    <div className="col-span-3 flex items-end pb-4">
      <span className="text-label-md text-on-surface-variant uppercase tracking-wider">Select Models</span>
    </div>

    <div className="col-span-4 relative flex flex-col gap-4">
      {overallWinner === "left" && <WinnerBadge />}
      <BikeDropdown value={bike1Id} onChange={onBike1Change} bikes={bikes} />
      <BikeImage bike={bikes.find((b) => b.id === bike1Id)} />
    </div>

    <div className="col-span-1 flex items-center justify-center">
      <div className="w-px h-full bg-outline-variant/20" />
    </div>

    <div className="col-span-4 relative flex flex-col gap-4">
      {overallWinner === "right" && <WinnerBadge />}
      <BikeDropdown value={bike2Id} onChange={onBike2Change} bikes={bikes} />
      <BikeImage bike={bikes.find((b) => b.id === bike2Id)} dim />
    </div>

  </div>
);

export default BikeSelector;
