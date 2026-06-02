import SpecRow from "./SpecRow";

const SpecSection = ({ icon, title, rows, bike1, bike2 }) => (
  <div className="mb-12">
    <h3 className="text-headline-md text-on-surface mb-6 flex items-center gap-2 border-b border-outline-variant/20 pb-2">
      <span className="material-symbols-outlined text-primary">{icon}</span>
      {title}
    </h3>

    <div className="flex flex-col gap-2">
      {rows.map(({ label, getValue, compare }) => {
        const diff   = compare(bike1, bike2);
        const winner = diff > 0 ? "left" : diff < 0 ? "right" : "tie";
        return (
          <SpecRow
            key={label}
            label={label}
            val1={getValue(bike1)}
            val2={getValue(bike2)}
            winner={winner}
          />
        );
      })}
    </div>
  </div>
);

export default SpecSection;
