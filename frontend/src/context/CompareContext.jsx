import { createContext, useState } from "react";

export const CompareContext = createContext(null);

const MAX_COMPARE = 3;

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (bike) => {
    if (compareList.length >= MAX_COMPARE) return;
    if (compareList.find((b) => b.id === bike.id)) return;
    setCompareList((prev) => [...prev, bike]);
  };

  const removeFromCompare = (bikeId) => {
    setCompareList((prev) => prev.filter((b) => b.id !== bikeId));
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (bikeId) => compareList.some((b) => b.id === bikeId);

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        MAX_COMPARE,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};
