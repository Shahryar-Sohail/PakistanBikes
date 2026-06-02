const CompareCTA = () => (
  <div className="mt-16 bg-surface-container p-8 rounded-xl border border-outline-variant/20 flex flex-col items-center text-center">
    <h4 className="text-headline-lg text-on-surface mb-2">
      Ready to secure national performance?
    </h4>
    <p className="text-body-md text-on-surface-variant mb-6 max-w-md">
      Find your nearest certified dealer and track real-time market pricing.
    </p>
    <div className="flex gap-4">
      <button className="bg-primary text-on-primary text-label-md px-8 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-sm">
        Locate Dealer
      </button>
      <button className="bg-surface-container-lowest text-primary border border-primary text-label-md px-8 py-3 rounded-full hover:bg-primary/10 transition-colors">
        Check Price Tracker
      </button>
    </div>
  </div>
);

export default CompareCTA;
