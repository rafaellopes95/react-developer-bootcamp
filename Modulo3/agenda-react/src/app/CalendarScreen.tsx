import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  getCalendarsEndpoint,
  getEventsEndpoint,
  ICalendar,
  IEvent,
} from "./backend";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { CalendarsView } from "./CalendarsView";
import { CalendarHeader } from "./CalendarHeader";
import { Calendar, ICalendarCell, IEventWithCalendar } from "./Calendar";
import { EventFormDialog } from "./EventFormDialog";

export function CalendarScreen() {
  // Pegando o parâmetro de URL month usando o hook useParams
  const { month } = useParams();
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const weeks = generateCalendar(
    month + "-01",
    events,
    calendars,
    calendarsSelected
  );
  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;

  // Quando firstDate e lastDate forem setadas o useEffect chamará o backend e renderizará os componentes novamente
  useEffect(() => {
    Promise.all([
      getCalendarsEndpoint(),
      getEventsEndpoint(firstDate, lastDate),
    ]).then(([calendars, events]) => {
      setCalendarsSelected(calendars.map((calendar) => true));
      setCalendars(calendars);
      setEvents(events);
    });
  }, [firstDate, lastDate]);

  function toggleCalendar(i: number) {
    const newValue = [...calendarsSelected];
    newValue[i] = !newValue[i];
    setCalendarsSelected(newValue);
  }

  return (
    <Box display="flex" height="100%" alignItems="stretch">
      <Box
        borderRight="1px solid rgb(224, 224, 224)"
        width="16em"
        padding="8px 16px"
      >
        <h2>Agenda React</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Novo evento
        </Button>

        <CalendarsView
          calendars={calendars}
          toggleCalendar={toggleCalendar}
          calendarsSelected={calendarsSelected}
        />
      </Box>

      <Box flex="1" display="flex" flexDirection="column">
        <CalendarHeader month={month!} />
        <Calendar weeks={weeks} />
        <EventFormDialog open={open} onClose={() => setOpen(false)} />
      </Box>
    </Box>
  );
}

function generateCalendar(
  date: string,
  allEvents: IEvent[],
  calendars: ICalendar[],
  calendarsSelected: boolean[]
): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(date + "T12:00:00");
  const currentMonth = jsDate.getMonth();

  const currentDay = new Date(jsDate.valueOf());
  currentDay.setDate(1);
  const dayOfWeek = currentDay.getDay();
  // A próxima linha move a data para o início da semana - domingo - caso o dia passado não seja um domingo.
  currentDay.setDate(1 - dayOfWeek);

  do {
    const week: ICalendarCell[] = [];
    for (let i = 0; i < 7; i++) {
      const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, "0");
      const dayStr = currentDay.getDate().toString().padStart(2, "0");
      const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`;

      const events: IEventWithCalendar[] = [];
      for (const event of allEvents) {
        if (event.date === isoDate) {
          const calIndex = calendars.findIndex(
            (calendar) => calendar.id === event.calendarId
          );
          if (calendarsSelected[calIndex]) {
            events.push({ ...event, calendar: calendars[calIndex] });
          }
        }
      }

      week.push({
        date: isoDate,
        dayOfMonth: currentDay.getDate(),
        events,
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
}
