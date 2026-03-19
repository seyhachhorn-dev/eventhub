import type { UpdateEventRequest } from "@/types/event";

const API_URL = import.meta.env.VITE_BASE_URL;

const updateEventById = async (
  eventId: number,
  payload: UpdateEventRequest,
) => {
  try {
    const res = await fetch(`${API_URL}events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res) {
      throw new Error(`Failed to create event`);
    }

    const data = res.json();

    return data;
  } catch (e) {
    console.log("fail to update", e);
  }
};

export default updateEventById;
