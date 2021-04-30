// Gets names of countries and appends it to selection
document.addEventListener('DOMContentLoaded', (e) => {
  const request = new XMLHttpRequest()
  request.open('GET', 'https://covid-api.mmediagroup.fr/v1/cases', true)

  request.onload = () => {
    if (request.status == 200) {
      const res = JSON.parse(request.responseText)
      for (country in res) {
        var option = document.createElement('option')
        option.className = 'option'
        option.value = `${country}`
        var optionValue = document.createTextNode(country)
        option.appendChild(optionValue)
        document.querySelector('#countryy').appendChild(option)
      }
    }
  }
  request.send()
  e.preventDefault()
})

// event listener for function that gets stats
document.querySelector('.get-data').addEventListener('click', getStats)
async function getStats(e) {
  let selectedCountry = document.querySelector('#countryy')
  let country = selectedCountry.value
  // get data requested from API using AJAX
  const data = new XMLHttpRequest()
  data.open(
    'GET',
    `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`,
    true
  )

  let output = ''
  data.onload = async function () {
    if (data.status == 200) {
      const data = await JSON.parse(this.responseText)
      let continent = ''
      if (data.All.continent == undefined || null) {
        continent = `<p>Continent: ${data.All.continent}</p>`
      }
      if (country !== 'Global') {
        output = `<div class="data">
        <h4>${data.All.country}</h4>
        <p>Total Confirmed Cases: ${data.All.confirmed.toLocaleString('en')}</p>
        <p>Total Recovered: ${data.All.recovered.toLocaleString('en')}</p>
        <p style>Total Deaths: </span>${data.All.deaths.toLocaleString(
          'en'
        )}</p>
        ${continent}
        Delete: <i id="bin" class="fas fa-trash-alt"></i></div>`
        document.querySelector('.stats').innerHTML += output
      } else {
        output = `<div class="data">
        <h4>Global</h4>
        <p>Total Confirmed Cases: ${data.All.confirmed.toLocaleString('en')}</p>
        <p>Total Recovered: ${data.All.recovered.toLocaleString('en')}</p>
        <p style>Total Deaths: </span>${data.All.deaths.toLocaleString(
          'en'
        )}</p>
        Delete: <i id="bin" class="fas fa-trash-alt"></i></div>`
        document.querySelector('.stats').innerHTML += output
      }

      // delete info table
      document.querySelector('#bin').addEventListener('click', deleteInfo)
      function deleteInfo(e) {
        if (e.target.parentElement.className == 'data') {
          e.target.parentElement.remove()
        }
      }
    }
  }
  e.preventDefault()
  data.send()
}
