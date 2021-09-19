const weatherApiRootUrl = 'https://api.openweathermap.org';
const weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';
let city = document.querySelector('#searchTerm').value;
const forecastElement = document.querySelector('#forecast');
const present = new Date();
const todayElement = document.querySelector('#today');
let cities = [];

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
  let cityTitle = document.createElement("h2");
  cityTitle.setAttribute("class", "title");
  cityTitle.textContent = `${city} (${formatDate(present)})`;
  todayElement.appendChild(cityTitle);
  let weatherInfo = document.createElement("p")
  weatherInfo.setAttribute("class", "info")
  weatherInfo.textContent = `Temp: ${current.temp} F
    Wind: ${current.wind_speed} MPH
    Humidity: ${current.humidity}%
    UV Index: ${current.uvi}`;
  cityTitle.appendChild(weatherInfo);
}

function displayFiveDay(daily) {
  console.log(daily)
  const forecastName = document.querySelector('#forecastName');
  forecastName.textContent = "5-Day Forecast:"
  forecastElement.appendChild(forecastName);
  for (let i =1; i < 6; i++) {
    let dailyWeatherInfo = document.createElement("div");
    dailyWeatherInfo.classList.add("card", "bg-primary");
    let cardHeader = document.createElement("h4");
    cardHeader.classList.add("card-title");
    cardHeader.textContent=buildFiveDay(present, i);
    dailyWeatherInfo.appendChild(cardHeader)
    forecastElement.appendChild(dailyWeatherInfo);
    dailyWeatherInfo.appendChild(cardHeader)
    forecastElement.appendChild(dailyWeatherInfo)
  }
}

function saveToLocalState(city) {
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
    var todayElement=document.getElementById("today")
    var cityName=document.createElement("h1")
    cityName.textContent=city +" " + moment().format('MM DD YYYY');
    todayElement.append(cityName)
    var temp=document.createElement("p")
    temp.textContent="temp: " + body.current.temp +" F"
    today.append(temp)
    var wind=document.createElement("p")
    wind.textContent="wind: " + body.current.wind_speed +" MPH"
    todayElement.append(wind)
    var humidity=document.createElement("p")
    humidity.textContent="humidity: " + body.current.humidity+" %"
    todayElement.append(humidity)
    var uvi=document.createElement("p")
    uvi.textContent="UV-Index: " + body.current.uvi
    todayElement.append(uvi)

    displayFiveDay(daily);
    saveToLocalState(city);
  })
  .catch(function (error) {
    console.log(error)
  });
}