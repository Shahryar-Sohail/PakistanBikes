import BikeCard from "./BikeCard";

const BikeGrid = ({ bikes, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!bikes?.length) {
    return (
      <p className="text-center text-on-surface-variant py-16 text-body-md">
        No bikes match your filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
      {bikes.map((bike) => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
    </div>
  );
};

export default BikeGrid;
