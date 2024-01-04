const Base_url =
  "https://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid={API_KEY}&units=metric";
const API_KEY = "cffb3b881333c8b77984d9f95a766025";
const weather_container = document.getElementById("city-weather-container");
const form = document.getElementById("form");

let weather_arr = [];
let weather_object_arr = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log("submitted");
  let cityName = form.cityName.value;

  if (cityName === "") {
    alert("Please Enter City Name!");
    return;
  }

  if (weather_arr.includes(cityName)) {
    alert(`${cityName.toUpperCase()} city weather card already exist!`);
    return;
  }
  else {
    weather_arr.push(cityName);
    checkWeather(cityName);
  }

  form.reset();
  // console.log(weather_arr);
});

async function checkWeather(city) {
  try {
    let result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    // console.log(result);
    let data = await result.json();
    // console.log(data);

    let icon_url = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    // console.log(icon_url);


    //  Creating obj arr so that to sort temp in increasing order //
    let obj = {
      cityName: data.name,
      weather: data.weather[0].description,
      temp: data.main.temp,
      feel: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind: data.wind.speed,
      clouds: data.clouds.all,
      sys_sunRise: data.sys.sunrise,
      sys_sunSet: data.sys.sunset,
      img_url: icon_url,
    };
    weather_object_arr.push(obj);
    weather_object_arr.sort((a, b) => a["temp"] - b["temp"]);
    weatherDetails(weather_object_arr);
    // invoking card_creating function
  }
  catch (err) {
    console.log(err);
  }
}

// checkWeather("korba");
function weatherDetails(Obj_arr) {
  weather_container.innerHTML = "";
  // console.log(Obj_arr);


  // FOREACH() ON Obj_arr TO TRAVERSE ON EACH ELEMENT 
  Obj_arr.forEach((element) => {

    // console.log(weather_container);
    const name = element.cityName;
    const weather = element.weather;
    const main = element.temp;
    const wind = element.wind;
    const clouds = element.clouds;
    const sys_sunRise = element.sys_sunRise;
    const img= element.img_url;
    const feel= element.feel;
    const humidity= element.humidity;
    const pressure= element.pressure;
    // console.log(sys_sunRise, typeof sys_sunRise);
    let sunRise_time = new Date(sys_sunRise * 1000);
    sunRise_time = `${sunRise_time.getHours()} : ${sunRise_time.getMinutes()} am`;

    let sys_sunSet = element.sys_sunSet;
    let sunSet_time = new Date(sys_sunSet * 1000);
    sunSet_time = `${sunSet_time.getHours()} : ${sunSet_time.getMinutes()} pm`;



    // CREATING EACH CARD DYNAMICALLY

    let weather_div = document.createElement("div");
    weather_div.className = "weather-div";
    weather_div.innerHTML = `<div id="temp_deg">
                                <div>${main} <span>&#176;</span>C</div>
                                <div><img src=${img}></div>
                            </div>
                                <div>
                                    <div id="extra-details">
                                      <div id="feels-like"> 
                                        <div>${feel} <span>&#176;</span>C<sub> feels like</sub></div>
                                        <div>${weather} <sub>weather</sub></div>
                                      </div>
                                      <div id="wind-detail"><div>${wind} m/s <sub>Wind speed</sub></div><div>${humidity}% <sub>Humidity</sub></div><div>${pressure} hPa <sub>Air Pressure</sub></div></div>
                                      <div id="cloudiness">Cloudiness ${clouds}%</div>
                                    </div>
                                    <div id="city-name-container">
                                        <div>
                                        <p id="city-name-p">${name.toUpperCase()}</p>
                                        </div>
                                        <div id="sun">
                                          <p><span class=material-icons id="sunrise_icon">wb_sunny</span><span>${sunRise_time}</span></p>
                                          <p><span class=material-icons id="sunset_icon">wb_twilight</span><span>${sunSet_time}</span></p>
                                        </div>
                                    </div>
                                </div>
                            `;


    weather_container.appendChild(weather_div);
  });
}
