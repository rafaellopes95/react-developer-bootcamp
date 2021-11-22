import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getDespesas, IDespesa } from "./backend";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

export interface IMonth {
  name: string;
  asNumber: string;
}

export const MONTHS: IMonth[] = [
  { name: "Janeiro", asNumber: "01" },
  { name: "Fevereiro", asNumber: "02" },
  { name: "Março", asNumber: "03" },
  { name: "Abril", asNumber: "04" },
  { name: "Maio", asNumber: "05" },
  { name: "Junho", asNumber: "06" },
  { name: "Julho", asNumber: "07" },
  { name: "Agosto", asNumber: "08" },
  { name: "Setembro", asNumber: "09" },
  { name: "Outubro", asNumber: "10" },
  { name: "Novembro", asNumber: "11" },
  { name: "Dezembro", asNumber: "12" },
];

export function DespesasScreen() {
  const { month } = useParams();
  const [yearParam, monthParam] = month!.split("-");
  const [selectedMonth, setSelectedMonth] = useState<string>(monthParam);
  const [selectedYear, setSelectedYear] = useState<string>(yearParam);
  const [despesas, setDespesas] = useState<IDespesa[]>([]);

  useEffect(() => {
    getDespesas(`${selectedYear}-${selectedMonth}`).then((despesas) => {
      setDespesas(despesas);
    });
  }, [selectedYear, selectedMonth]);

  function handleYearChange(event: SelectChangeEvent) {
    setSelectedYear(event.target.value);
  }

  function handleMonthChange(event: SelectChangeEvent) {
    setSelectedMonth(event.target.value);
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box style={{ margin: "8px" }} display="flex" alignItems="center">
        <Select
          label="Ano"
          value={selectedYear}
          onChange={handleYearChange}
          style={{ marginRight: "8px" }}
        >
          <MenuItem value={2020}>2020</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
        </Select>
        <Select
          style={{ marginRight: "8px" }}
          label="Mês"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {MONTHS.map((month) => (
            <MenuItem value={month.asNumber} key={month.asNumber}>
              {month.name}
            </MenuItem>
          ))}
        </Select>
        <Box component={"span"}>
          Despesa total:{" "}
          <strong>{`R$ ${(despesas.length > 0
            ? despesas
                .map((despesa) => despesa.valor)
                .reduce((acc = 0, value) => acc + value)
            : 0
          ).toFixed(2)}`}</strong>
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Despesa</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Dia</TableCell>
              <TableCell align="right">Valor (R$)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {despesas.map((despesa) => (
              <TableRow key={despesa.id}>
                <TableCell>{despesa.descricao}</TableCell>
                <TableCell>{despesa.categoria}</TableCell>
                <TableCell>{despesa.dia}</TableCell>
                <TableCell align="right">{despesa.valor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
