const BikeActions = () => (
  <div className="flex flex-col gap-4">
    <button className="w-full bg-primary hover:bg-primary-container text-on-primary text-label-md py-4 px-6 rounded-xl flex justify-center items-center gap-3 transition-colors shadow-sm group">
      <span className="material-symbols-outlined group-hover:scale-110 transition-transform">play_circle</span>
      Play Engine Sound
    </button>
    <button className="w-full bg-surface-container-lowest border border-secondary text-secondary hover:bg-secondary/5 text-label-md py-4 px-6 rounded-xl flex justify-center items-center gap-2 transition-colors">
      <span className="material-symbols-outlined">add_circle</span>
      Add to Compare
    </button>
  </div>
);

export default BikeActions;
