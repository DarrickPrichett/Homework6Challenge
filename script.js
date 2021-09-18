const weatherApiRootUrl = 'https://api.openweathermap.org';
const weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';

function displayCurrent(current) {
  var today=document.getElementById("today")
    var temp=document.createElement("p")
    temp.textContent="temp: " + body.current.temp +" F"
    today.append(temp)
    var wind=document.createElement("p")
    wind.textContent="wind: " + body.current.wind_speed +" MPH"
    today.append(wind)
    var humidity=document.createElement("p")
    humidity.textContent="humidity: " + body.current.humidity+" %"
    today.append(humidity)
    var uvi=document.createElement("p")
    uvi.textContent="UV-Index: " + body.current.uvi
    today.append(uvi)
//Use jQuery to add to here:

// <section
   //           id="today"
     //       ></section>

}

function displayFiveDay(daily) {
//Use jQuery to add to here:
// <section
   //           id="forecast"
     //       ></section>
}

function saveToLocalState(city) {

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
    var today=document.getElementById("today")
    var temp=document.createElement("p")
    temp.textContent="temp: " + body.current.temp +" F"
    today.append(temp)
    var wind=document.createElement("p")
    wind.textContent="wind: " + body.current.wind_speed +" MPH"
    today.append(wind)
    var humidity=document.createElement("p")
    humidity.textContent="humidity: " + body.current.humidity+" %"
    today.append(humidity)
    var uvi=document.createElement("p")
    uvi.textContent="UV-Index: " + body.current.uvi
    today.append(uvi)
    displayFiveDay(daily);
    saveToLocalState(city);
  })
  .catch(function (error) {
    console.log(error)
  });
}