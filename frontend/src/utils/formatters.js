export const formatPrice = (price) =>
  `Rs. ${Number(price).toLocaleString("en-PK")}`;

export const formatCC = (cc) => `${cc}cc`;

export const formatMileage = (mileage) => `${mileage} km/l`;

export const formatRating = (rating) => Number(rating).toFixed(1);

/** Truncate a string to `length` characters, appending "…" if needed. */
export const truncate = (text, length = 80) =>
  text.length > length ? `${text.substring(0, length)}…` : text;
