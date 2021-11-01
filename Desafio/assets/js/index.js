const api = "https://api.covid19api.com";
const totalConfirmados = document.getElementById("confirmed");
const totalMortes = document.getElementById("death");
const totalRecuperados = document.getElementById("recovered");
const dataDeAtualizacao = document.getElementById("date");
const distribuicaoNovosCasosChart = document.getElementById("pizza");
const top10MortesPorPaisChart = document.getElementById("barras");
const intFormat = new Intl.NumberFormat("pt-br", { maximumFractionDigits: 0 });

let globalNewConfirmed;
let globalNewDeaths;
let globalNewRecovered;

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
  console.log(summary);
  renderKPIs();
}

async function renderKPIs() {
  globalNewConfirmed = Number.parseInt(summary["Global"]["NewConfirmed"]);
  globalNewDeaths = Number.parseInt(summary["Global"]["NewDeaths"]);
  globalNewRecovered = Number.parseInt(summary["Global"]["NewRecovered"]);

  totalConfirmados.innerHTML = getFormattedInt(
    Number.parseInt(summary["Global"]["TotalConfirmed"])
  );
  totalMortes.innerHTML = getFormattedInt(
    Number.parseInt(summary["Global"]["TotalDeaths"])
  );
  totalRecuperados.innerHTML = getFormattedInt(
    Number.parseInt(summary["Global"]["TotalRecovered"])
  );
  dataDeAtualizacao.innerHTML += dateFns.format(
    summary["Global"]["Date"],
    "DD.MM.YY HH:mm"
  );
  renderKPIsChart();
  renderTop10DeathByCountryChart();
}

async function renderKPIsChart() {
  const caseSum = _.sum([
    globalNewConfirmed,
    globalNewDeaths,
    globalNewRecovered,
  ]);
  new Chart(distribuicaoNovosCasosChart, {
    type: "pie",
    data: {
      labels: ["Confirmados", "Recuperados", "Mortes"],
      datasets: [
        {
          data: [
            getPercentage(caseSum, globalNewConfirmed),
            getPercentage(caseSum, globalNewRecovered),
            getPercentage(caseSum, globalNewDeaths),
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
