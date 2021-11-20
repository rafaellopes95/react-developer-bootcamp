import { makeStyles } from "@material-ui/core/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  table: {
    minHeight: "100%",
    "& td ~ td, & th ~ th": {
      borderLeft: "1px solid rgb(224, 224, 224)",
    },
  },
});

export function CalendarScreen() {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} component={"div"}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {DAYS_OF_WEEK.map((day) => (
              <TableCell align="center">{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {DAYS_OF_WEEK.map((day) => (
              <TableCell align="center">x</TableCell>
            ))}
          </TableRow>
          <TableRow>
            {DAYS_OF_WEEK.map((day) => (
              <TableCell align="center">x</TableCell>
            ))}
          </TableRow>
          <TableRow>
            {DAYS_OF_WEEK.map((day) => (
              <TableCell align="center">x</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
