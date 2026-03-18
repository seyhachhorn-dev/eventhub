export interface Venue {
  venueId: number
  venueName: string
  location: string
}

export interface EventItem {
  eventId: number
  eventName: string
  eventDate: string
  venue: Venue
  attendees: any[] // later you can type this properly
}