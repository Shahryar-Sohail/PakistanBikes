import { useState } from "react";
import useBikes from "../../hooks/useBikes";
import HeroSection from "../../components/home/HeroSection";
import BikeFilter from "../../components/bikes/BikeFilter";
import BikeGrid from "../../components/bikes/BikeGrid";

const Home = () => {
  const [filters, setFilters] = useState({});
  const { bikes, loading, error } = useBikes(filters);

  return (
    <>
      <HeroSection />
      <BikeFilter filters={filters} onChange={setFilters} />

      <section className="w-full px-margin-mobile md:px-margin-desktop py-16 bg-background">
        <div className="max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-headline-lg text-on-surface mb-2 tracking-tight">
                Featured Models
              </h2>
              <p className="text-body-md text-on-surface-variant">
                Top rated machines for the national grid.
              </p>
            </div>
            <a
              href="#"
              className="hidden sm:flex items-center gap-1 text-label-md text-primary hover:text-primary-container transition-colors"
            >
              View All
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </a>
          </div>

          {error ? (
            <p className="text-center text-error py-10">{error}</p>
          ) : (
            <BikeGrid bikes={bikes} loading={loading} />
          )}

          <div className="mt-12 text-center sm:hidden">
            <button className="w-full py-3 border border-outline-variant text-on-surface text-label-md rounded-lg hover:border-primary hover:text-primary transition-colors flex justify-center items-center gap-2">
              View All Models
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
