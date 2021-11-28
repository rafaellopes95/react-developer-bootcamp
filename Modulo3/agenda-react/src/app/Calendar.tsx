import { makeStyles } from "@material-ui/core/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import { ICalendar, IEvent } from "./backend";
import React from "react";

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

const useStyles = makeStyles({
  table: {
    borderTop: "1px solid rgb(224, 224, 224)",
    minHeight: "100%",
    tableLayout: "fixed",
    "& td ~ td, & th ~ th": {
      borderLeft: "1px solid rgb(224, 224, 224)",
    },
    "& td": {
      verticalAlign: "top",
      overflow: "hidden",
      padding: "8px 4px",
    },
  },
  dayOfMonth: {
    fontWeight: 500,
    marginBottom: "4px",
  },
  event: {
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    whiteSpace: "nowrap",
    margin: "4px 0",
  },
  eventBackground: {
    display: "inline-block",
    color: "white",
    padding: "2px 4px",
    borderRadius: "4px",
  },
});

interface ICalendarProps {
  weeks: ICalendarCell[][];
  onClickDay: (date: string) => void;
  onClickEvent: (event: IEvent) => void;
}

export const Calendar = React.memo(function Calendar(props: ICalendarProps) {
  const { weeks } = props;
  const classes = useStyles();

  function handleClick(evt: React.MouseEvent, date: string) {
    if (evt.target === evt.currentTarget) {
      props.onClickDay(date);
    }
  }

  return (
    <TableContainer style={{ flex: "1" }} component={"div"}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {DAYS_OF_WEEK.map((day) => (
              <TableCell key={day} align="center">
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {weeks.map((week, index) => (
            <TableRow key={index}>
              {week.map((cell) => (
                <TableCell
                  key={cell.date}
                  align="center"
                  onClick={(mouseEvent) => handleClick(mouseEvent, cell.date)}
                >
                  <div className={classes.dayOfMonth}>{cell.dayOfMonth}</div>

                  {cell.events.map((event) => {
                    const color = event.calendar.color;
                    return (
                      <div key={event.id}>
                        <button
                          className={classes.event}
                          onClick={() => props.onClickEvent(event)}
                        >
                          {event.time && (
                            <>
                              <Icon style={{ color }} fontSize="inherit">
                                watch_later
                              </Icon>
                              <Box component="span" margin="0 4px">
                                {event.time}
                              </Box>
                            </>
                          )}
                          {event.time ? (
                            <span>{event.desc}</span>
                          ) : (
                            <span
                              className={classes.eventBackground}
                              style={{ backgroundColor: color }}
                            >
                              {event.desc}
                            </span>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

// Criando uma versão diferente da interface já existente, agregando um atributo novo.
export type IEventWithCalendar = IEvent & { calendar: ICalendar };

export interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEventWithCalendar[];
}
