import type { EventListResponse } from "@/types/event";

const API_URL = import.meta.env.VITE_BASE_URL;

export const getAllEvent = async (page:number, size=10): Promise<EventListResponse[]> => {
  try {
    
    const res = await fetch(`${API_URL}events?${size}&page=${page}`);
    if (!res) {
      throw new Error("fail to fetch Event");
    }
    return await res.json();
  } catch (e) {
    console.log("error fetch event", e);
    return [];
  }
};

export default getAllEvent;
