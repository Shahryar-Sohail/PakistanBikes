import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBikeById } from "../../../services/bikeService";
import BikeGallery from "../../../components/bike-detail/BikeGallery";
import BikeHeader from "../../../components/bike-detail/BikeHeader";
import BikeActions from "../../../components/bike-detail/BikeActions";
import DetailTabs from "../../../components/bike-detail/DetailTabs";
import SpecsGrid from "../../../components/bike-detail/SpecsGrid";
import ReviewsSection from "../../../components/bike-detail/ReviewsSection";

const BikeDetail = () => {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBikeById(id)
      .then(setBike)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error)
    return <p className="text-center text-error py-20 text-body-md">{error}</p>;

  if (!bike)
    return (
      <p className="text-center text-on-surface-variant py-20 text-body-md">
        Loading…
      </p>
    );

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
      <div className="flex flex-col md:flex-row gap-gutter">
        <BikeGallery bike={bike} />

        <div className="md:w-1/2 w-full flex flex-col gap-8">
          <BikeHeader bike={bike} />
          <BikeActions />
          <DetailTabs>
            <SpecsGrid bike={bike} />
            <p className="text-on-surface-variant text-body-md py-8 text-center">
              Price history coming soon.
            </p>
            <p className="text-on-surface-variant text-body-md py-8 text-center">
              Reviews coming soon.
            </p>
          </DetailTabs>
          <ReviewsSection bike={bike} />
        </div>
      </div>
    </main>
  );
};

export default BikeDetail;
