import type { EventItem } from "@/types/event";

const API_URL = import.meta.env.VITE_BASE_URL;

export const getAllEvent = async (): Promise<EventItem[]> => {
  try {
    
    const res = await fetch(`${API_URL}events?size=10&page=1`);
    if (!res) {
      throw new Error("fail to fetch Event");
    }
    const data = await res.json();
    return data.payload ?? data;
  } catch (e) {
    console.log("error fetch event", e);
    return [];
  }
};

export default getAllEvent;
