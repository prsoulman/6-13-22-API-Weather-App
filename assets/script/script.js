var apiKey='dc7007df2c352fd1a2d149bf261a7be7';
var searchButton=document.getElementById('search');
console.log(searchButton);

// connect the api to weather 

// GIVEN a weather dashboard with form inputs --need text feild input
//
function getGeoLocation() {
  var cityName=document.getElementById('cityname').value;
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&limit=1&appid='+apiKey).then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getCityWeather(data[0].lat, data[0].lon,data[0].name);
    });
}
function getCityWeather(lat, lon, city) {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`).then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(city);
  });
}

// WHEN I search for a city THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

searchButton.addEventListener('click',getGeoLocation);