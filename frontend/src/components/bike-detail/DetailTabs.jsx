import { useState, Children } from "react";

const TABS = ["Overview", "Price History", "Reviews"];

const DetailTabs = ({ children }) => {
  const [active, setActive] = useState(0);
  const panels = Children.toArray(children);

  return (
    <div>
      <div className="border-b border-outline-variant/20">
        <div className="flex gap-8">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActive(i)}
              className={
                active === i
                  ? "pb-2 text-label-md text-primary border-b-[3px] border-primary translate-y-[1px]"
                  : "pb-2 text-label-md text-on-surface-variant hover:text-primary transition-colors"
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">{panels[active]}</div>
    </div>
  );
};

export default DetailTabs;
