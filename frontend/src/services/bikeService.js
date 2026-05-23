/**
 * bikeService – all bike-related data operations.
 *
 * Currently backed by hardcoded data from src/data/bikes.js.
 * When the backend is ready, replace each function body with
 * the corresponding api.js call (e.g. api.get("/bikes")).
 */
import { bikes } from "../data/bikes";

export const getAllBikes = async (filters = {}) => {
  let result = [...bikes];

  if (filters.brand) {
    result = result.filter((b) => b.brand === filters.brand);
  }
  if (filters.type) {
    result = result.filter((b) => b.type === filters.type);
  }
  if (filters.minPrice !== undefined) {
    result = result.filter((b) => b.price >= Number(filters.minPrice));
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((b) => b.price <= Number(filters.maxPrice));
  }
  if (filters.minCC !== undefined) {
    result = result.filter((b) => b.cc >= Number(filters.minCC));
  }
  if (filters.maxCC !== undefined) {
    result = result.filter((b) => b.cc <= Number(filters.maxCC));
  }

  return result;
};

export const getBikeById = async (id) => {
  const bike = bikes.find((b) => b.id === Number(id));
  if (!bike) throw new Error(`Bike with id ${id} not found`);
  return bike;
};

export const getFeaturedBikes = async () => {
  return bikes.filter((b) => b.rating >= 4.4);
};

export const getBikesByBrand = async (brand) => {
  return bikes.filter((b) => b.brand === brand);
};
