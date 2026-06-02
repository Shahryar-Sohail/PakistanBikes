const ReviewsSection = ({ bike }) => (
  <div className="mt-4">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-headline-md text-on-surface">User Reviews</h3>
      <div className="flex items-center gap-1 text-secondary">
        <span className="material-symbols-outlined">star</span>
        <span className="text-label-md font-bold">{bike.rating}</span>
        <span className="text-on-surface-variant text-sm ml-1">({bike.reviews})</span>
      </div>
    </div>
    <button className="w-full border border-outline-variant/30 bg-surface-container-lowest text-on-surface text-label-md py-3 px-6 rounded-lg flex justify-center items-center gap-2 hover:bg-surface-variant transition-colors">
      <span className="material-symbols-outlined text-[18px]">lock</span>
      Write a Review
    </button>
  </div>
);

export default ReviewsSection;
