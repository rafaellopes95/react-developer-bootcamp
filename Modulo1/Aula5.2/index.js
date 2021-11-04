import {
  format,
  addDays,
  formatDistance,
  compareAsc,
  compareDesc,
  isValid,
  parse,
} from "date-fns";
import { es, ptBR } from "date-fns/locale/index.js";

// Formatação de data
let today = new Date();
console.log(today);

let todayFormatted = format(today, "dd.MM.yyyy");
console.log(todayFormatted);

// Formatação por extenso
let todayFormatted2 = format(today, "PPPP");
console.log(todayFormatted2);

// Formatação para outra localidade
let todayFormatted3 = format(today, "PPPP", { locale: es });
console.log(todayFormatted3);

let todayFormatted4 = format(today, "PPPP", { locale: ptBR });
console.log(todayFormatted4);

// Operações com datas
let todaySummed = addDays(today, 3);
let todaySummed2 = addDays(todaySummed, 3);

console.log(today);
console.log(todaySummed);
console.log(todaySummed2);

// Diferença entre datas, distância entre datas
let endDate = new Date(2021, 12, 31);
let difBetweenDates = formatDistance(today, endDate, { locale: ptBR });
console.log(`Faltam ${difBetweenDates} até o Reveillon`);

let d1 = new Date("2001-01-01");
let d2 = new Date("2005-01-01");
let d3 = new Date("2010-01-01");

let dates = [d1, d2, d3];

let sortAscDates = dates.sort(compareAsc);
console.log(sortAscDates);
let sortDescDates = dates.sort(compareDesc);
console.log(sortDescDates);

// Validação de data
let invalidDate = parse("30-02-2020", "dd-MM-yyyy", new Date());
console.log(isValid(invalidDate));
