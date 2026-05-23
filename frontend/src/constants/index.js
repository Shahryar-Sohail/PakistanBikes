export const APP_NAME = "Pakistan Bikes";
export const APP_TAGLINE = "Pakistan ka Bike Portal";

export const BRANDS = [
  "Honda",
  "Yamaha",
  "Suzuki",
  "United",
  "Ravi",
  "Road Prince",
  "Crown",
];

export const BIKE_TYPES = [
  "commuter",
  "sport",
  "sport-commuter",
  "off-road",
  "electric",
];

export const CC_RANGES = [
  { label: "Under 100cc", min: 0, max: 99 },
  { label: "100cc – 125cc", min: 100, max: 125 },
  { label: "126cc – 150cc", min: 126, max: 150 },
  { label: "150cc+", min: 151, max: Infinity },
];

export const PRICE_RANGES = [
  { label: "Under PKR 1.5 Lac", min: 0, max: 150000 },
  { label: "PKR 1.5 – 3 Lac", min: 150000, max: 300000 },
  { label: "PKR 3 – 5 Lac", min: 300000, max: 500000 },
  { label: "PKR 5 Lac+", min: 500000, max: Infinity },
];

export const LOCAL_STORAGE_KEYS = {
  TOKEN: "pk_bikes_token",
  USER: "pk_bikes_user",
};
