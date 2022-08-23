
//Form basic
const form = document.getElementById("form")
const input = document.getElementById("search")

form.addEventListener("submit", e => {
  sug.style.display = 'none'
  e.preventDefault()
  getData(input.value)
})

//Fetch Data - OpenWeatherMap API

const getData = async (input) => {
  const cardData = document.querySelector(".card-data")
  const cardError = document.getElementById("error")
  const titleWeather = document.getElementById("title-weather")
  const titleTemperature = document.getElementById("title-temperature")
  const dataPressure = document.getElementById("data-pressure")
  const dataHumidity = document.getElementById("data-humidity")
  const dataWind = document.getElementById("data-wind")
  const dataCity = document.getElementById("city")
  const dataDay = document.getElementById("day")
  const dataDesc = document.getElementById("desc")
  const dataForcast = document.getElementById("data")
  // console.log(weatherTable[today.weather[0].main])
  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=f639d5ec4ff12520a89c39d2bca2138d`)
  if (!res.ok) {
    cardError.innerHTML = "Data Not Found"
    console.log("DATA NOT FOUND")
    setTimeout(function () {
      cardError.innerHTML = ""
    }, 1500);
  }

  const daily = await res.json()
  const today = daily.list[0]
  const city = daily.city

  cardData.style.display = "block"
  titleWeather.src = weatherTable[today.weather[0].main]
  titleTemperature.innerHTML = kelvinToCelcius(today.main.temp)
  dataPressure.innerHTML = today.main.pressure + " mbar"
  dataHumidity.innerHTML = today.main.humidity + " %"
  dataWind.innerHTML = (today.wind.speed * 1.6).toFixed(2) + " km/h"
  dataCity.innerHTML = city.name + ", " + city.country
  dataDay.innerHTML = returnDay(1660910400);
  dataDesc.innerHTML = capitalize(today.weather[0].description)
  dataForcast.innerHTML = ""
  for (let i = 0; i < 40; i = i + 8) {
    console.log(i)
    console.log(returnDay(daily.list[i].dt).substring(0, 3))
    dataForcast.innerHTML += `
            <div class="forcast">
                    <div class="forcast-day">${returnDay(daily.list[i].dt).substring(0, 3)}</div>
                    <img class="forcast-img" src="${weatherTable[daily.list[i].weather[0].main]}" />
                     <div class="forcast-temp">
                        <p class="temp-max">${kelvinToCelcius(daily.list[i].main.temp_max) + '&#176;'}</p>
                        <p class="temp-min">${kelvinToCelcius(daily.list[i].main.temp_min) + '&#176;'}</p>
                    <div>
            </div>`
  }

  const labels = []
  const yaxis = []
  for (let i = 0; i < 8; i++) {
    labels.push(daily.list[i].dt_txt.split(' ')[1].split(':')[0] + ':00')
    yaxis.push(kelvinToCelcius(daily.list[i].main.temp))
  }
  addData(myChart, labels, yaxis)

  // ${JSON.stringify(daily.list[i])}
  // daily.list.forEach((day) => console.log(day))
}

//Chart feature

const labels = []
const yaxis = []
const data = {
  labels: labels,
  datasets: [{
    data: yaxis,
    fill: true,
    backgroundColor: '#4C4227',
    borderColor: '#FFCC01',
    tension: 0.1
  }]
};
const config = {
  type: 'line',
  data: data,
  options: {
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        beginAtZero: true,
        min: 5,
      },
    },
    plugins: {
      legend: {
        display: false
      },
    }
  }
};

const ctx = document.getElementById('chart').getContext('2d');
const myChart = new Chart(ctx, config);

function addData(chart, label, data) {
  chart.data.labels = label
  chart.data.datasets[0].data = data
  chart.update();
}

//Suggestion / typeahead feature

const sug = document.getElementById("sug")
// const input = document.getElementById("input")
input.addEventListener('input', (e) => {
  sug.style.display = 'block'
  let searchvalue = e.target.value
  sug.innerHTML = ""
  if (searchvalue.length) {
    getCity(cities, searchvalue)
  }
})

const getCity = (cities, searchvalue) => {
  //console.log(cities)
  const cityGet = cities.filter(el => el.toLowerCase().startsWith(searchvalue.toLowerCase()))
  for (let i = 0; i < 5 && cityGet[i]; i++) {
    sug.innerHTML += `<li id='searchValue' onclick="fillSuggestion(this)">${cityGet[i]}</li>`
  }
}

const searchValue = document.getElementById("searchValue")
// searchValue.addEventListener('click', (e)=>{
//   console.log(e)
// })
const fillSuggestion = (e) => {
  input.value = e.textContent
  console.log(e.textContent)
  getData(e.textContent)
  sug.style.display = 'none'
}



