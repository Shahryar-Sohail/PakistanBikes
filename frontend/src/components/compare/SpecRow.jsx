// winner: "left" | "right" | "tie"
const WINNER_CLS = "bg-secondary-container text-on-secondary-container border border-secondary/20 text-label-md";
const LOSER_CLS  = "bg-error-container   text-on-error-container   border border-error/10        text-body-md";
const TIE_CLS    = "bg-surface-container text-on-surface                                          text-body-md";

const cellCls = (side, winner) => {
  if (winner === "tie")  return TIE_CLS;
  return winner === side ? WINNER_CLS : LOSER_CLS;
};

const SpecRow = ({ label, val1, val2, winner }) => (
  <div className="grid grid-cols-12 gap-gutter items-center py-3 px-4 rounded-lg hover:bg-surface-container-low transition-colors">

    <div className="col-span-3 text-label-md text-on-surface-variant">{label}</div>

    <div className={`col-span-4 p-3 rounded-lg flex items-center justify-between ${cellCls("left", winner)}`}>
      {val1}
      {winner === "left" && (
        <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
      )}
    </div>

    <div className="col-span-1" />

    <div className={`col-span-4 p-3 rounded-lg flex items-center justify-between ${cellCls("right", winner)}`}>
      {val2}
      {winner === "right" && (
        <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
      )}
    </div>

  </div>
);

export default SpecRow;
