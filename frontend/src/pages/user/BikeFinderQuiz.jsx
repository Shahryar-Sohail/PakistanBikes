import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bikes } from "../../data/bikes";

/* ─────────────────────────────────────────────
   Quiz Data – 5 Steps
───────────────────────────────────────────── */
const QUIZ_STEPS = [
  {
    id: "usage",
    label: "Daily Usage",
    question: "What is your primary daily usage?",
    options: [
      {
        value: "city",
        label: "City Commute",
        description: "Stop-and-go traffic, narrow streets.",
        icon: "location_city",
      },
      {
        value: "highway",
        label: "Highway Cruising",
        description: "Long stretches, higher speeds.",
        icon: "add_road",
      },
      {
        value: "mixed",
        label: "Mixed Terrain",
        description: "Both city roads and occasional dirt trails.",
        icon: "shuffle",
      },
    ],
  },
  {
    id: "budget",
    label: "Budget",
    question: "What is your budget range?",
    options: [
      {
        value: "economy",
        label: "Economy",
        description: "Under PKR 200,000 — great value for money.",
        icon: "savings",
      },
      {
        value: "mid",
        label: "Mid-Range",
        description: "PKR 200,000 – 400,000 — balanced choice.",
        icon: "account_balance_wallet",
      },
      {
        value: "premium",
        label: "Premium",
        description: "PKR 400,000+ — top-tier performance.",
        icon: "diamond",
      },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    question: "How experienced are you as a rider?",
    options: [
      {
        value: "beginner",
        label: "Beginner",
        description: "New to riding — prefer a forgiving, easy bike.",
        icon: "school",
      },
      {
        value: "intermediate",
        label: "Intermediate",
        description: "A few years riding, comfortable on most bikes.",
        icon: "trending_up",
      },
      {
        value: "expert",
        label: "Expert",
        description: "Seasoned rider, confident with higher power.",
        icon: "military_tech",
      },
    ],
  },
  {
    id: "priority",
    label: "Priority",
    question: "What matters most to you?",
    options: [
      {
        value: "mileage",
        label: "Fuel Efficiency",
        description: "Maximum km per litre — lowest running cost.",
        icon: "local_gas_station",
      },
      {
        value: "power",
        label: "Power & Speed",
        description: "Strong engine, exhilarating acceleration.",
        icon: "bolt",
      },
      {
        value: "comfort",
        label: "Comfort & Style",
        description: "Relaxed posture and a head-turning design.",
        icon: "weekend",
      },
    ],
  },
  {
    id: "brand",
    label: "Brand",
    question: "Do you have a brand preference?",
    options: [
      {
        value: "Honda",
        label: "Honda",
        description: "Trusted reliability and widest service network.",
        icon: "verified",
      },
      {
        value: "Yamaha",
        label: "Yamaha",
        description: "Sporty engineering and smooth performance.",
        icon: "speed",
      },
      {
        value: "any",
        label: "No Preference",
        description: "Show me the best option regardless of brand.",
        icon: "tune",
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Scoring Logic
───────────────────────────────────────────── */
function getResults(answers) {
  // Score each bike based on answers
  const scored = bikes.map((bike) => {
    let score = 0;

    // Budget
    if (answers.budget === "economy" && bike.price < 200000) score += 3;
    else if (answers.budget === "mid" && bike.price >= 200000 && bike.price <= 400000) score += 3;
    else if (answers.budget === "premium" && bike.price > 400000) score += 3;

    // CC / Experience
    if (answers.experience === "beginner" && bike.cc <= 100) score += 2;
    else if (answers.experience === "intermediate" && bike.cc >= 100 && bike.cc <= 150) score += 2;
    else if (answers.experience === "expert" && bike.cc >= 150) score += 2;

    // Brand preference
    if (answers.brand !== "any" && bike.brand === answers.brand) score += 2;
    else if (answers.brand === "any") score += 1;

    // Priority: mileage
    if (answers.priority === "mileage" && bike.fuelAvg && parseInt(bike.fuelAvg) >= 45) score += 2;
    // Priority: power – higher cc = more power
    if (answers.priority === "power" && bike.cc >= 150) score += 2;
    // Priority: comfort – commuter type
    if (answers.priority === "comfort" && bike.type === "commuter") score += 1;

    // Usage
    if (answers.usage === "city" && bike.cc <= 125) score += 1;
    if (answers.usage === "highway" && bike.cc >= 150) score += 1;

    return { ...bike, score };
  });

  // Sort by score desc, then by rating desc
  return scored
    .sort((a, b) => b.score - a.score || b.rating - a.rating)
    .slice(0, 3);
}

/* ─────────────────────────────────────────────
   Badge component for result cards
───────────────────────────────────────────── */
const BADGES = [
  { label: "Top Pick", className: "bg-secondary text-on-secondary" },
  { label: "Runner Up", className: "bg-surface-variant text-on-surface-variant" },
  { label: "Alternative", className: "bg-surface-variant text-on-surface-variant" },
];

/* ─────────────────────────────────────────────
   Bike Result Card
───────────────────────────────────────────── */
const BikeResultCard = ({ bike, rank }) => {
  const navigate = useNavigate();
  const badge = BADGES[rank] ?? BADGES[2];
  const ccColor =
    rank === 0 ? "text-primary bg-primary-fixed" : "text-tertiary bg-tertiary-fixed";

  return (
    <div className="group bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden hover:-translate-y-1 hover:border-primary transition-all duration-300 shadow-sm flex flex-col">
      {/* Image */}
      <div className="h-48 w-full bg-surface-container-high relative overflow-hidden">
        {bike.image ? (
          <img
            src={bike.image}
            alt={bike.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-outline/40">
              two_wheeler
            </span>
          </div>
        )}
        <div
          className={`absolute top-4 left-4 font-label-sm text-label-sm px-3 py-1 rounded-full shadow-sm ${badge.className}`}
        >
          {badge.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-headline-md text-headline-md text-on-surface">{bike.name}</h3>
          <span className={`font-label-md text-label-md px-2 py-1 rounded ${ccColor}`}>
            {bike.cc}cc
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
          {bike.description}
        </p>
        <div className="flex justify-between items-center pt-4 border-t border-outline-variant/20">
          <div className="font-label-md text-label-md text-on-surface">
            PKR {bike.price.toLocaleString()}
          </div>
          <button
            onClick={() => navigate(`/bike/${bike.id}`)}
            className="text-primary hover:text-surface-tint font-label-md text-label-md flex items-center gap-1 transition-colors"
          >
            View Specs{" "}
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const BikeFinderQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0-indexed
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null); // value for current step
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  const step = QUIZ_STEPS[currentStep];
  const totalSteps = QUIZ_STEPS.length;
  const progressPct = ((currentStep + (showResults ? 1 : 0)) / totalSteps) * 100;

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleNext = () => {
    const updatedAnswers = { ...answers, [step.id]: selected };
    setAnswers(updatedAnswers);
    setSelected(null);

    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      // Final step — compute results
      const matched = getResults(updatedAnswers);
      setResults(matched);
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      // Restore previous answer as selected
      const prevStepId = QUIZ_STEPS[currentStep - 1].id;
      setSelected(answers[prevStepId] ?? null);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setSelected(null);
    setShowResults(false);
    setResults([]);
  };

  /* ── RESULTS VIEW ── */
  if (showResults) {
    return (
      <main className="flex-grow py-12 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm mb-4">
              Analysis Complete
            </span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">
              Your Perfect Matches
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Based on your daily usage profile and preferences, we've engineered this shortlist
              for maximum national kinetic performance.
            </p>
          </div>

          {/* Result cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter w-full">
            {results.map((bike, i) => (
              <BikeResultCard key={bike.id} bike={bike} rank={i} />
            ))}
          </div>

          {/* Retake */}
          <div className="mt-12">
            <button
              onClick={handleReset}
              className="text-on-surface-variant hover:text-primary font-label-md text-label-md flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              Retake Quiz
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* ── QUIZ VIEW ── */
  return (
    <main className="flex-grow flex flex-col items-center justify-center py-12 px-margin-mobile md:px-margin-desktop">
      <div className="w-full max-w-3xl flex flex-col items-center">

        {/* ── Progress Tracker ── */}
        <div className="w-full mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {step.label}
            </span>
          </div>
          <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* ── Quiz Card ── */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-8 md:p-12 w-full shadow-sm text-center relative overflow-hidden">
          {/* Decorative accent blob */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed opacity-10 rounded-bl-full blur-2xl pointer-events-none" />

          {/* Question */}
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-10">
            {step.question}
          </h1>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {step.options.map((opt) => {
              const isActive = selected === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`
                    quiz-card border rounded-xl p-6 cursor-pointer flex flex-col items-center gap-4 text-left
                    transition-all duration-300 cubic-bezier(0.4,0,0.2,1)
                    focus:outline-none focus:ring-2 focus:ring-primary/30
                    hover:-translate-y-1
                    ${
                      isActive
                        ? "border-2 border-primary bg-primary-fixed"
                        : "border-outline-variant/10 bg-surface-container-lowest hover:border-primary"
                    }
                  `}
                >
                  {/* Icon circle */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      isActive ? "bg-primary/10" : "bg-surface-container"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-3xl ${
                        isActive ? "text-primary" : "text-secondary"
                      }`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {opt.icon}
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface block text-center">
                    {opt.label}
                  </span>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm text-center">
                    {opt.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* ── Action Area ── */}
          <div className="flex justify-center items-center gap-4 mt-6 pt-6 border-t border-outline-variant/20">
            {/* Back button (hidden on first step) */}
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="
                  text-on-surface-variant hover:text-primary
                  font-label-md text-label-md
                  py-3 px-6 rounded-lg
                  border border-outline-variant/30 hover:border-primary
                  flex items-center gap-2
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-primary/30
                "
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back
              </button>
            )}

            {/* Next button */}
            <button
              id="next-btn"
              type="button"
              disabled={!selected}
              onClick={handleNext}
              className="
                bg-primary text-on-primary
                font-label-md text-label-md
                py-3 px-12 rounded-lg
                hover:bg-surface-tint
                hover:-translate-y-0.5 hover:shadow-md
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
                flex items-center gap-2
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              "
            >
              {currentStep === totalSteps - 1 ? "See Results" : "Next"}
              <span className="material-symbols-outlined text-[18px]">
                {currentStep === totalSteps - 1 ? "check_circle" : "arrow_forward"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BikeFinderQuiz;
