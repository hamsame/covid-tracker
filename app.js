document.querySelector(".get-data").addEventListener("click", getStats);
const stats = document.querySelector(".stats");

async function getStats(e) {
  let country = document.querySelector("#country").value;
  country = country
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

  const response = await fetch(
    `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`
  );

  const data = await response.json();
  let output = "";
  output = `<div class="data">
  <h4>${country.toUpperCase()}</h4> 
  <p>Total Confirmed Cases: ${data.All.confirmed.toLocaleString()}</p>
  <p>Total Recovered: ${data.All.recovered.toLocaleString()}</p>
  <p style>Total Deaths: </span>${data.All.deaths.toLocaleString()}</p>
  <p>Life Expectancy: ${data.All.life_expectancy.toLocaleString()}
  <p>Continent: ${data.All.continent.toLocaleString()}</p>
  Delete: <i id="bin" class="fas fa-trash-alt"></i></div>`;
  document.querySelector(".stats").innerHTML += output;
  e.preventDefault();
}
