import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState, useEffect, useRef } from "react";
import {
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { createEventEndpoint, ICalendar, IEditingEvent } from "./backend";

interface IEventFormDialogProps {
  event: IEditingEvent | null;
  calendars: ICalendar[];
  onCancel: () => void;
  onSave: () => void;
}

// Um objeto desta interface pode possuir multiplos atributos, desde que a chave e o valor sejam do tipo string
interface IValidationErrors {
  [field: string]: string;
}

export function EventFormDialog(props: IEventFormDialogProps) {
  // Criando um estado local baseado na prop event, pois assim o dialog poderá manipular os dados
  const [event, setEvent] = useState<IEditingEvent | null>(props.event);
  const [errors, setErrors] = useState<IValidationErrors>({});
  // O ref é uma forma de manipular o DOM do elemento com o qual está vinculado
  const inputDate = useRef<HTMLInputElement | null>();
  const inputDesc = useRef<HTMLInputElement | null>();

  // O estado local de event deve ser atualizado através de um effect, senão ele permanecerá nulo para sempre
  useEffect(() => {
    setEvent(props.event);
    setErrors({});
    //console.log(event);
  }, [props.event]);

  const { calendars } = props;

  function validate(): boolean {
    if (event) {
      const currentErrors: IValidationErrors = {};
      if (!event.date) {
        currentErrors["date"] = "A data deve ser preenchida.";
        inputDate.current?.focus();
      }
      if (!event.desc) {
        currentErrors["desc"] = "A descrição deve ser preenchida.";
        inputDesc.current?.focus();
      }
      setErrors(currentErrors);
      return Object.keys(currentErrors).length === 0;
    }
    return false;
  }

  function save(evt: React.FormEvent) {
    // Esta linha vai evitar o comportamento padrão do submit que é um método post para o server seguido de um refresh.
    evt.preventDefault();
    if (event) {
      if (validate()) {
        createEventEndpoint(event).then(props.onSave);
      }
    }
  }

  return (
    <Dialog onClose={props.onCancel} open={!!event}>
      <form onSubmit={save}>
        <DialogTitle>Criar evento</DialogTitle>
        <DialogContent>
          {event && (
            <>
              <TextField
                inputRef={inputDate}
                type="date"
                margin="normal"
                label="Data"
                fullWidth
                value={event.date}
                // evt é o evento disparado pelo DOM
                onChange={(evt) =>
                  setEvent({ ...event, date: evt.target.value })
                }
                error={!!errors.date}
                helperText={errors.date}
              />
              <TextField
                inputRef={inputDesc}
                autoFocus
                margin="normal"
                label="Descrição"
                fullWidth
                value={event.desc}
                onChange={(evt) =>
                  setEvent({ ...event, desc: evt.target.value })
                }
                error={!!errors.desc}
                helperText={errors.desc}
              />
              <TextField
                type="time"
                margin="normal"
                label="Hora"
                fullWidth
                // um valor undefined deixa de ser controlled pelo React, para evitar isso setamos o time pra "" caso seja undefined ou null usando ??
                value={event.time ?? ""}
                onChange={(evt) =>
                  setEvent({ ...event, time: evt.target.value })
                }
              />
              <FormControl margin="normal" fullWidth>
                <InputLabel id="select-calendar">Agenda</InputLabel>
                <Select
                  labelId="select-calendar"
                  value={event.calendarId}
                  onChange={(evt) =>
                    setEvent({
                      ...event,
                      calendarId: evt.target.value as number,
                    })
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
          <Button type="button" onClick={props.onCancel} color="secondary">
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
