// event listener
document.querySelector(".get-data").addEventListener("click", getStats);

// function that gets Stats
async function getStats(e) {
  let country = document.querySelector("#country").value;
  country = country
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

  // get data requested from API using AJAX
  const data = new XMLHttpRequest();
  data.open(
    "GET",
    `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`,
    true
  );

  let output = "";
  data.onload = async function () {
    if (data.status == 200) {
      const data = await JSON.parse(this.responseText);
      output = `<div class="data">
        <h4>${country.toUpperCase()}</h4>
        <p>Total Confirmed Cases: ${data.All.confirmed.toLocaleString()}</p>
        <p>Total Recovered: ${data.All.recovered.toLocaleString()}</p>
        <p style>Total Deaths: </span>${data.All.deaths.toLocaleString()}</p>
        <p>Life Expectancy: ${data.All.life_expectancy.toLocaleString()}
        <p>Continent: ${data.All.continent.toLocaleString()}</p>
        Delete: <i id="bin" class="fas fa-trash-alt"></i></div>`;
      document.querySelector(".stats").innerHTML += output;

      // delete info table
      document.querySelector("#bin").addEventListener("click", deleteInfo);
      function deleteInfo(e) {
        if (e.target.parentElement.className == "data") {
          e.target.parentElement.remove();
        }
      }
    }
  };

  e.preventDefault();
  data.send();
}
