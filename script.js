const weatherApiRootUrl = 'https://api.openweathermap.org';
const weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';
let city = document.querySelector('#searchTerm').value;
const forecastElement = document.querySelector('#forecast');
const present = new Date();
const todayElement = document.querySelector('#today');
let cities = [];
var userCity =

function formatDate(date) {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  month = month.length > 1 ? month : '0' + month;
  return month + '/' + day + '/' + year;  
}

function buildFiveDay(date, days) {
  let dayArray = new Date(date);
  dayArray.setDate(dayArray.getDate() + days);
  dayArray = formatDate(dayArray);
  return dayArray;
}

function displayCurrent(current) {
  let cityTitle = document.createElement("h3");
  cityTitle.setAttribute("class", "title");
  cityTitle.textContent = `${city} (${formatDate(present)})`;
  todayElement.appendChild(cityTitle);
  let weatherInfo = document.createElement("p")
  weatherInfo.setAttribute("class", "info")
  function formatDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    month = month.length > 1 ? month : '0' + month;
    return month + '/' + day + '/' + year;  
  }
  weatherInfo.innerHTML = `<div> Temp: ${current.temp} F</div>
  <div> Wind: ${current.wind_speed} MPH</div>
  <div> Humidity: ${current.humidity}%</div>
  <div> UV Index: ${current.uvi}</div>`;
  cityTitle.appendChild(weatherInfo);
}

function displayFiveDay(daily) {
  console.log(daily)
  const forecastName = document.querySelector('#forecastName');
  forecastName.textContent = "5-Day Forecast:"
  forecastElement.appendChild(forecastName);
  for (let i =1; i < 6; i++) {
    let weatherInfo = document.createElement("p")
    weatherInfo.setAttribute("class", "info")
    weatherInfo.innerHTML = `<div> Temp: ${daily[i].temp.day} F</div>
    <div> Wind: ${daily[i].wind_speed} MPH</div>
    <div> Humidity: ${daily[i].humidity}%</div>
    <div> UV Index: ${daily[i].uvi}</div>`;
  forecastElement.appendChild(weatherInfo);
  }
}

function saveToLocalState(city) {
  var cities = localStorage.getItem('city');
  if (city === null){
    return;
  }
  history.push(city);
  localStorage.setItem("city", history);

}

function searchCityWeather() {
  const city = document.querySelector('#searchTerm').value;
  fetch(`${weatherApiRootUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${weatherApiKey}`)
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log('body', body);
    const lat = body[0].lat;
    const lon = body[0].lon;
    console.log(lat, lon);
    return fetch(`${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`)
  })
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body)
    const current = body.current;
    const daily = body.daily;
    displayCurrent(current);
    displayFiveDay(daily);
    saveToLocalState(city);
  })
  .catch(function (error) {
    console.log(error)
  });
}
//let dailyWeatherInfo = document.createElement("div");
 //   dailyWeatherInfo.classList.add("card", "bg-primary");
  //  let cardHeader = document.createElement("h4");
   // cardHeader.classList.add("card-title");
  //  cardHeader.textContent=buildFiveDay(present, i);
  //  dailyWeatherInfo.appendChild(cardHeader)
  //  forecastElement.appendChild(dailyWeatherInfo);
  //  dailyWeatherInfo.appendChild(cardHeader)
  //  forecastElement.appendChild(dailyWeatherInfo)