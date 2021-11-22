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

interface IEventFormDialogProps {
  open: boolean;
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

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Criar evento</DialogTitle>
      <DialogContent>
        <TextField type="date" margin="normal" label="Data" fullWidth />
        <TextField autoFocus margin="normal" label="Descrição" fullWidth />
        <TextField type="time" margin="normal" label="Hora" fullWidth />
        <FormControl margin="normal" fullWidth>
          <InputLabel id="select-calendar">Agenda</InputLabel>
          <Select labelId="select-calendar">
            <MenuItem value={1}>Pessoal</MenuItem>
            <MenuItem value={2}>Trabalho</MenuItem>
          </Select>
        </FormControl>
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
