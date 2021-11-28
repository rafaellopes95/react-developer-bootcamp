import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ICalendar } from "./backend";
import React from "react";

interface ICalendarsViewProps {
  calendars: ICalendar[];
  toggleCalendar: (i: number) => void;
  calendarsSelected: boolean[];
}

export const CalendarsView = React.memo(function (props: ICalendarsViewProps) {
  const { calendars, toggleCalendar, calendarsSelected } = props;
  return (
    <Box marginTop="64px">
      <h3>Agendas</h3>
      {calendars.map((calendar, index) => (
        <div key={calendar.id}>
          <FormControlLabel
            control={
              <Checkbox
                checked={calendarsSelected[index]}
                style={{ color: calendar.color }}
                onChange={() => toggleCalendar(index)}
              />
            }
            label={calendar.name}
          />
        </div>
      ))}
    </Box>
  );
});
