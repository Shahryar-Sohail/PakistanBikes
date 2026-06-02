import { useState } from "react";

const BikeGallery = ({ bike }) => {
  const imgs = bike.gallery?.length ? bike.gallery : [bike.image, bike.image, bike.image];
  const [active, setActive] = useState(0);

  return (
    <div className="md:w-1/2 w-full md:sticky top-24 self-start">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-4 relative group">
        {imgs[active]
          ? <img src={imgs[active]} alt={bike.name} className="w-full h-auto rounded-lg object-cover mix-blend-multiply" />
          : <div className="w-full h-64 flex items-center justify-center text-8xl">🏍️</div>
        }
        <button className="absolute top-6 right-6 bg-surface-container-lowest p-2 rounded-full border border-outline-variant/20 shadow-sm hover:text-primary transition-colors">
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>

      <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
        {imgs.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-24 h-20 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden border-2 transition-colors ${
              i === active ? "border-primary" : "border-outline-variant/20 hover:border-primary/50"
            }`}
          >
            {img
              ? <img src={img} alt={`${bike.name} view ${i + 1}`} className="w-full h-full object-cover" />
              : <span className="flex items-center justify-center h-full text-2xl">🏍️</span>
            }
          </button>
        ))}
      </div>
    </div>
  );
};

export default BikeGallery;
