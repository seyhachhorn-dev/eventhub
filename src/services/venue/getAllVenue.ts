import type { VenueItem } from "@/types/venue";
const API_URL = import.meta.env.VITE_BASE_URL;

const getAllVenue = async (page:number): Promise<VenueItem[]> => {
  try {
    const res = await fetch(`${API_URL}venues?size=10&${page}`);
    if (!res) {
      throw new Error("fail to fetch Event");
    }
    const data = await res.json();

    return data.payload ?? data;
  } catch (e) {
    console.log("error fetch venue", e);
    return [];
  }
};

export default getAllVenue
