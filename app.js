document.querySelector(".get-data").addEventListener("click", getStats);
const stats = document.querySelector(".stats");

async function getStats(e) {
  const country = document.querySelector("#country").value;
  const response = await fetch(
    `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`
  );
  const data = await response.json();
  let output = "";
  output = `<div class="data">
  <h4>${country}</h4>
  <p>Total Confirmed Cases: ${data.All.confirmed}</p>
  <p>Total Recovered: ${data.All.recovered}</p>
  <p style>Total Deaths: </span>${data.All.deaths}</p>
  <p>Life Expectancy: ${data.All.life_expectancy}
  <p>Continent: ${data.All.continent}</p></div>`;
  document.querySelector(".stats").innerHTML += output;
  e.preventDefault();
}
