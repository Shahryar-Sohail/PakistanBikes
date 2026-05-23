const HeroSection = () => (
  <section className="relative w-full min-h-[614px] flex items-center justify-center px-margin-mobile md:px-margin-desktop py-16 md:py-24 bg-surface-container-lowest overflow-hidden border-b border-outline-variant/10">
    <div className="relative z-10 max-w-container-max mx-auto flex flex-col items-center text-center">

      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-surface-container-low border border-outline-variant/20 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        <span className="text-label-sm text-on-surface-variant tracking-wider uppercase">
          Updated for 2024 Models
        </span>
      </div>

      <h1 className="text-display-lg-mobile md:text-display-lg text-on-surface mb-6 max-w-4xl tracking-tight">
        Pakistan&apos;s #1 Bike Directory
      </h1>

      <p className="text-body-lg text-on-surface-variant mb-10 max-w-2xl">
        Find specs, prices, reviews and sounds of every bike in Pakistan.
        Engineered for precision and national kinetic performance.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button className="px-8 py-3 bg-secondary text-on-secondary text-label-md rounded-lg hover:bg-secondary-container hover:text-on-secondary-container transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group">
          Explore Bikes
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>

        <button className="px-8 py-3 bg-transparent text-on-surface text-label-md rounded-lg border border-outline-variant hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
          Compare Bikes
        </button>
      </div>

    </div>
  </section>
);

export default HeroSection;
