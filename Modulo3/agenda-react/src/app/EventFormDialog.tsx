import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { event, calendars } = props;

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
            />
            <TextField
              autoFocus
              margin="normal"
              label="Descrição"
              fullWidth
              value={event.desc}
            />
            <TextField
              type="time"
              margin="normal"
              label="Hora"
              fullWidth
              value={event.time}
            />
            <FormControl margin="normal" fullWidth>
              <InputLabel id="select-calendar">Agenda</InputLabel>
              <Select labelId="select-calendar" value={event.calendarId}>
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
