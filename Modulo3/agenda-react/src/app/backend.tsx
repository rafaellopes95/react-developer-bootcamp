export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEditingEvent {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface IEvent extends IEditingEvent {
  id: number;
}

export function getCalendarsEndpoint(): Promise<ICalendar[]> {
  return fetch("http://localhost:8080/calendars").then(handleResponse);
}

export function getEventsEndpoint(from: string, to: string): Promise<IEvent[]> {
  return fetch(
    `http://localhost:8080/events?date_gte=${from}&date_lte=${to}&sort=date,time`
  ).then(handleResponse);
}

export function createEventEndpoint(event: IEditingEvent): Promise<IEvent[]> {
  return fetch(`http://localhost:8080/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then(handleResponse);
}

export function updateEventEndpoint(event: IEditingEvent): Promise<IEvent[]> {
  return fetch(`http://localhost:8080/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then(handleResponse);
}

export function deleteEventEndpoint(eventId: number): Promise<void> {
  return fetch(`http://localhost:8080/events/${eventId}`, {
    method: "DELETE",
  }).then(handleResponse);
}

export function getUserEndpoint(): Promise<void> {
  return fetch(`http://localhost:8080/auth/user`, {}).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
