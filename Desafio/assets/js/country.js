const api = "https://api.covid19api.com";
const countryDropdown = document.getElementById("cmbCountry");
const dailyKpiLineChart = document.getElementById("linhas");
let countries = [];
let countryDailyKpis = [];
let countryTotalKpis = {};
let selectedCountry;
let selectedFrom = "2021-05-01";
let selectedTo = "2021-05-26";
let selectedDataType = "Deaths";
const intFormat = new Intl.NumberFormat("pt-br", { maximumFractionDigits: 0 });

async function getCountries() {
  const response = await axios.get(`${api}/countries`);
  countries = _.sortBy(response.data, "Country");
  // console.log(countries);
  return true;
}

async function load() {
  await getCountries();
  populateCountryFilter();
}

async function populateCountryFilter() {
  _.forEach(countries, (country) => {
    countryDropdown.innerHTML += `<option value="${country.Slug}">${country.Country}</option>`;
  });
}

async function getCountry() {
  const response = await axios.get(`${api}/country/${selectedCountry}`);
  //console.log(response.data);
  let filteredData = _.filter(response.data, (countryData) => {
    const formattedCountryDate = dateFns.format(
      getDateWithoutTime(countryData.Date),
      "YYYY-MM-DD"
    );
    return (
      dateFns.isAfter(formattedCountryDate, dateFns.subDays(selectedFrom, 2)) &&
      (dateFns.isBefore(formattedCountryDate, selectedTo) ||
        dateFns.isEqual(formattedCountryDate, selectedTo))
    );
  });
  calculateKPIByDate(filteredData);
}

function calculateKPIByDate(countryData) {
  countryDailyKpis = new Array();
  let i;
  for (i = 1; i < countryData.length; i++) {
    countryDailyKpis.push({
      date: countryData[i].Date,
      confirmed: countryData[i].Confirmed - countryData[i - 1].Confirmed,
      deaths: countryData[i].Deaths - countryData[i - 1].Deaths,
      recovered: countryData[i].Recovered - countryData[i - 1].Recovered,
    });
  }
  countryTotalKpis = {
    date: countryData[--i].Date,
    confirmed: countryData[i].Confirmed,
    deaths: countryData[i].Deaths,
    recovered: countryData[i].Recovered,
  };
  // console.log(countryDailyKpis);
  renderCountryKpis();
  renderLineChart();
}

async function renderCountryKpis() {
  document.getElementById("kpiconfirmed").innerHTML = getFormattedInt(
    countryTotalKpis.confirmed
  );
  document.getElementById("kpideaths").innerHTML = getFormattedInt(
    countryTotalKpis.deaths
  );
  document.getElementById("kpirecovered").innerHTML = getFormattedInt(
    countryTotalKpis.recovered
  );
}

async function renderLineChart() {
  const existingChart = Chart.getChart("linhas");
  existingChart ? existingChart.destroy() : {};
  new Chart(dailyKpiLineChart, {
    type: "line",
    data: {
      labels: _.map(countryDailyKpis, (dailyKpi) =>
        getDateWithoutTime(dailyKpi.date)
      ),
      datasets: [
        {
          label: "Número de casos",
          data: _.map(countryDailyKpis, `${selectedDataType.toLowerCase()}`),
          borderColor: "rgb(255,140,13)",
          backgroundColor: "rgb(255,140,13,0.1)",
        },
        {
          label: "Média de casos",
          data: _.fill(
            Array(countryDailyKpis.length),
            _.mean(_.map(countryDailyKpis, `${selectedDataType.toLowerCase()}`))
          ),
          borderColor: "rgb(237,21,21)",
          backgroundColor: "rgb(237,21,21,0.1)",
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
          test: "Curva Diária de Covid-19",
        },
      },
    },
  });
}

// utils
function setSelectedOption(option, value) {
  switch (option) {
    case "dateFrom":
      selectedFrom = value;
      break;
    case "dateTo":
      selectedTo = value;
      break;
    case "country":
      selectedCountry = value;
      break;
    case "dataType":
      selectedDataType = value;
      break;
  }
}

function getFormattedInt(num) {
  return intFormat.format(num);
}

function getDateWithoutTime(dateTime) {
  return dateTime.substring(0, 10);
}
