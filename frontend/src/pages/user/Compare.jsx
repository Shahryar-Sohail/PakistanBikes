import { useState } from "react";
import { bikes } from "../../data/bikes";
import { SPEC_GROUPS } from "../../data/compareSpecs";
import BikeSelector from "../../components/compare/BikeSelector";
import SpecSection from "../../components/compare/SpecSection";
import CompareCTA from "../../components/compare/CompareCTA";

const calcOverallWinner = (bike1, bike2) => {
  let left = 0,
    right = 0;
  SPEC_GROUPS.forEach(({ rows }) =>
    rows.forEach(({ compare }) => {
      const d = compare(bike1, bike2);
      if (d > 0) left++;
      else if (d < 0) right++;
    }),
  );
  if (left > right) return "left";
  if (right > left) return "right";
  return "tie";
};

const Compare = () => {
  const [bike1Id, setBike1Id] = useState(bikes[0].id);
  const [bike2Id, setBike2Id] = useState(bikes[1].id);

  const bike1 = bikes.find((b) => b.id === bike1Id);
  const bike2 = bikes.find((b) => b.id === bike2Id);
  const overallWinner = calcOverallWinner(bike1, bike2);

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <header className="mb-12">
        <h1 className="text-display-lg-mobile md:text-display-lg text-on-surface mb-4">
          Technical Specification Matrix
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl">
          Align national heritage with mechanical precision. Select two models
          below to initiate a granular side-by-side performance analysis.
        </p>
      </header>

      <div className="relative w-full overflow-x-auto">
        <div className="min-w-[800px] pb-8">
          <BikeSelector
            bikes={bikes}
            bike1Id={bike1Id}
            bike2Id={bike2Id}
            onBike1Change={(e) => setBike1Id(Number(e.target.value))}
            onBike2Change={(e) => setBike2Id(Number(e.target.value))}
            overallWinner={overallWinner}
          />

          {SPEC_GROUPS.map(({ icon, title, rows }) => (
            <SpecSection
              key={title}
              icon={icon}
              title={title}
              rows={rows}
              bike1={bike1}
              bike2={bike2}
            />
          ))}

          <CompareCTA />
        </div>
      </div>
    </main>
  );
};

export default Compare;
