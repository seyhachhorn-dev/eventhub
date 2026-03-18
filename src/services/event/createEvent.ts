import type { CreateEventRequest } from "@/types/event";

const API_URL = import.meta.env.VITE_BASE_URL;

const createEvent = async (payload: CreateEventRequest) => {
  const res = await fetch(`${API_URL}events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res) {
    throw new Error(`Failed to create event`);
  }
  const data = await res.json();

  return data;
};

export default createEvent;
