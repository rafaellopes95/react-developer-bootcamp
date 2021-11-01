const api = "https://api.covid19api.com";
const totalConfirmados = document.getElementById("confirmed");
const totalMortes = document.getElementById("death");
const totalRecuperados = document.getElementById("recovered");
const dataDeAtualizacao = document.getElementById("date");
const distribuicaoNovosCasosChart = document.getElementById("pizza");
const top10MortesPorPaisChart = document.getElementById("barras");
const intFormat = new Intl.NumberFormat("pt-br", { maximumFractionDigits: 0 });

let globalTotalConfirmed;
let globalTotalDeaths;
let globalTotalRecovered;

let summary = {};
let countries = [];

async function getSummary() {
  let response = await axios.get(`${api}/summary`);
  summary = response.data;
  countries = summary["Countries"];
  return true;
}

async function load() {
  await getSummary();
  renderKPIs();
}

async function renderKPIs() {
  globalTotalConfirmed = Number.parseInt(summary["Global"]["TotalConfirmed"]);
  globalTotalDeaths = Number.parseInt(summary["Global"]["TotalDeaths"]);
  globalTotalRecovered = Number.parseInt(summary["Global"]["TotalRecovered"]);

  totalConfirmados.innerHTML = getFormattedInt(globalTotalConfirmed);
  totalMortes.innerHTML = getFormattedInt(globalTotalDeaths);
  totalRecuperados.innerHTML = getFormattedInt(globalTotalRecovered);
  dataDeAtualizacao.innerHTML += dateFns.format(
    summary["Global"]["Date"],
    "DD.MM.YY HH:mm"
  );
  renderKPIsChart();
  renderTop10DeathByCountryChart();
}

async function renderKPIsChart() {
  const caseSum = _.sum([
    globalTotalConfirmed,
    globalTotalDeaths,
    globalTotalRecovered,
  ]);
  new Chart(distribuicaoNovosCasosChart, {
    type: "pie",
    data: {
      labels: ["Confirmados", "Recuperados", "Mortes"],
      datasets: [
        {
          data: [
            getPercentage(caseSum, globalTotalConfirmed),
            getPercentage(caseSum, globalTotalRecovered),
            getPercentage(caseSum, globalTotalDeaths),
          ],
          backgroundColor: [
            "rgb(51, 153, 255)",
            "rgb(255, 0, 102)",
            "rgb(255, 204, 0)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        title: {
          display: true,
          text: "Distribuição de Novos Casos",
        },
      },
    },
  });
}

async function renderTop10DeathByCountryChart() {
  const top10Deaths = _.slice(
    _.orderBy(countries, "TotalDeaths", "desc"),
    0,
    10
  );
  new Chart(top10MortesPorPaisChart, {
    type: "bar",
    data: {
      labels: _.map(top10Deaths, "Country"),
      datasets: [
        {
          label: "Mortes",
          data: _.map(top10Deaths, "TotalDeaths"),
          backgroundColor: "rgb(51, 51, 204)",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Total de Mortes por País - Top 10",
        },
      },
    },
  });
}

// utils
function getFormattedInt(num) {
  return intFormat.format(num);
}

function getPercentage(max, value) {
  return _.round((value / max) * 100);
}
