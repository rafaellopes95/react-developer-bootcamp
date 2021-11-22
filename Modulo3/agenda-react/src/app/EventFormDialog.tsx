import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState, useEffect } from "react";
import {
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ICalendar } from "./backend";

export interface IEditingEvent {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

interface IEventFormDialogProps {
  event: IEditingEvent | null;
  calendars: ICalendar[];
  onClose: () => void;
}

export function EventFormDialog(props: IEventFormDialogProps) {
  // Criando um estado local baseado na prop event, pois assim o dialog poderá manipular os dados
  const [event, setEvent] = useState<IEditingEvent | null>(props.event);

  // O estado local de event deve ser atualizado através de um effect, senão ele permanecerá nulo para sempre
  useEffect(() => {
    setEvent(props.event);
  }, [props.event]);

  const { calendars } = props;

  return (
    <Dialog onClose={props.onClose} open={!!event}>
      <DialogTitle>Criar evento</DialogTitle>
      <DialogContent>
        {event && (
          <>
            <TextField
              type="date"
              margin="normal"
              label="Data"
              fullWidth
              value={event.date}
              // evt é o evento disparado pelo DOM
              onChange={(evt) => setEvent({ ...event, date: evt.target.value })}
            />
            <TextField
              autoFocus
              margin="normal"
              label="Descrição"
              fullWidth
              value={event.desc}
              onChange={(evt) => setEvent({ ...event, desc: evt.target.value })}
            />
            <TextField
              type="time"
              margin="normal"
              label="Hora"
              fullWidth
              // um valor undefined deixa de ser controlled pelo React, para evitar isso setamos o time pra "" caso seja undefined ou null usando ??
              value={event.time ?? ""}
              onChange={(evt) => setEvent({ ...event, time: evt.target.value })}
            />
            <FormControl margin="normal" fullWidth>
              <InputLabel id="select-calendar">Agenda</InputLabel>
              <Select
                labelId="select-calendar"
                value={event.calendarId}
                onChange={(evt) =>
                  setEvent({ ...event, calendarId: evt.target.value as number })
                }
              >
                {calendars.map((calendar) => (
                  <MenuItem key={calendar.id} value={calendar.id}>
                    {calendar.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={props.onClose} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
