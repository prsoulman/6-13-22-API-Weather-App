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
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=en&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`).then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.current.temp);
    console.log(data.current.wind_speed);
    console.log(data.current.humidity);
    console.log(data.current.uvi);
    //console/log(data.city);
//current weather stat variables
    //let city=document.getElementById.value('.text');
    let temp=data.current.temp;
    let wind=data.current.wind_speed;
    let humidity=data.current.humidity;
    let uvi=data.current.uvi;
//Display weather to html
    //let cityDisplay = document.querySelector('#City').append('in ' + city);
    let cityDisplay = document.querySelector('.City').append(''+ city);
    let tempDisplay = document.querySelector('.temp').append(''+ temp);
    let windDisplay = document.querySelector('.wind').append(''+ wind);
    let humidityDisplay = document.querySelector('.Humidity').append(''+ humidity);
    let uvDisplay = document.querySelector('.UV').append(uvi);

    for (var i =1; i<6;i++) {
      console.log(data.daily[i]);
      var day=moment.unix(data.daily[i].dt).format('dddd');
      console.log(day);
      var card=$('<div>').addClass('card m-2').attr('style', 'width: auto');
      var imgTop=$('<img>').addClass('icon').attr('src', 'http://openweathermap.org/img/wn/10d.png').attr('alt', 'card img cap');
      var cardBody=$('<div>').addClass('card-body');
      var cardTitle=$('<h5>').addClass('card-title').text(day);
      var tempEl=$('<p>').addClass('card-text').text('tempature: '+data.daily[i].temp.day);
      var HumidityEl=$('<p>').addClass('card-text').text('Humidity: '+data.daily[i].humidity+'%');
      var windEl=$('<p>').addClass('card-text').text('Wind: '+data.daily[i].wind_speed+'MPH');
      $('.five-day-forecast').append(card.append(cardBody.append(cardTitle.append(imgTop),tempEl,HumidityEl,windEl)));
    } 
    //displayWeather(data);
  });
}

// function displayWeather(this) {
// console.log(data);
// console.log(data.current.temp);
// // let city = document.querySelector('#City');
// // let temp = document.querySelector('#temp');
// // let wind = document.querySelector('#wind');
// // let humidity = document.querySelector('#Hum');
// // let uv = document.querySelector('#uv');
// // data.current.temp = document.getElementById('.temp').append('temp');



// }


//function printWeather

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