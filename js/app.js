//Constants

const weatherTable = {
    "Rain": "https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png",
    "Clouds": "https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png",
    "Thunderstorm": "https://ssl.gstatic.com/onebox/weather/48/thunderstorms.png",
    "Snow": "https://ssl.gstatic.com/onebox/weather/48/snow.png",
    "Clear": "https://ssl.gstatic.com/onebox/weather/48/sunny.png"
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


//Helper Functions
const returnDay = time => {
    return days[new Date(time*1000).getDay()]
}

const kelvinToCelcius = temp => {
    return  Math.ceil(temp - 273.15)
}

const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Main Functions

const getData = async () => { 
    const input = document.getElementById("search").value
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=f639d5ec4ff12520a89c39d2bca2138d`)
    const daily = await res.json()
    const today = daily.list[0]
    console.log(daily)
    const city = daily.city
    console.log(weatherTable[today.weather[0].main])
    document.querySelector(".card-data").style.display = "block"
    document.getElementById("title-weather").src = weatherTable[today.weather[0].main]
    document.getElementById("title-temperature").innerHTML = kelvinToCelcius(today.main.temp)
    document.getElementById("data-pressure").innerHTML = today.main.pressure + " mbar"
    document.getElementById("data-humidity").innerHTML = today.main.humidity + " %"
    document.getElementById("data-wind").innerHTML = (today.wind.speed*1.6).toFixed(2) + " km/h"
    document.getElementById("city").innerHTML = city.name + ", " + city.country
    document.getElementById("day").innerHTML = returnDay(1660910400);
    document.getElementById("desc").innerHTML = capitalize(today.weather[0].description)
    document.getElementById("data").innerHTML = ""
    for(let i=0;i<40 ;i=i+8){
        console.log(i)
        console.log(returnDay(daily.list[i].dt).substring(0,3))
        //console.log(daily.list[i].weather[0].main)
        document.getElementById("data").innerHTML += `
            <div class="forcast">
                    <div class="forcast-day">${returnDay(daily.list[i].dt).substring(0,3)}</div>
                    <img class="forcast-img" src="${weatherTable[daily.list[i].weather[0].main]}" />
                    <div class="forcast-temp">
                        <p class="temp-max">${kelvinToCelcius(daily.list[i].main.temp_max)}</p>
                        <p class="temp-min">${kelvinToCelcius(daily.list[i].main.temp_min)}</p>
                    <div>
            </div>`
    }
    // ${JSON.stringify(daily.list[i])}
    // daily.list.forEach((day) => console.log(day))
}
// document.getElementById("data").innerHTML = getData()
