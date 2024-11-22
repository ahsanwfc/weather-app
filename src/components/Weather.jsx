import React, { useEffect, useRef, useState } from "react";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import dizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import searchIcon from "../assets/search.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";
import "./Weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": cloudIcon,
    "04n": cloudIcon,
    "09d": dizzleIcon,
    "09n": dizzleIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };
  const handleApi = async (city) => {
    try {
      if (city === "") {
        alert("Please input city Name");
        return null;
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3398a520785a7fab084ffe5dd826baab`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clearIcon;
      setWeatherData({
        humidity: data.main.humidity,
        temperature: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        location: data.name,
        icon: icon,
      });
      inputRef.current.value = "";
    } catch (error) {
      setWeatherData(false);
      alert("Please select correctly Country name");
    }
  };
  // useEffect(() => {
  //   handleApi("London");
  // }, []);
  return (
    <div className="container">
      <div className="wrapper">
        <div className="search-bar">
          <input type="text" placeholder="Search" ref={inputRef} />
          <img
            onClick={() => handleApi(inputRef.current.value.trim())}
            src={searchIcon}
            alt=""
          />
        </div>
        {weatherData ? (
          <>
            <div className="image-wrapper">
              <img src={weatherData.icon} alt="" />
              <div>
                <h1>{weatherData.temperature} C</h1>
                <p>{weatherData.location}</p>
              </div>
            </div>
            <div className="weather-wrapper">
              <div className="svgs-wrapper">
                <img src={humidityIcon} alt="" />
                <div className="text-wrapper">
                  <p>{weatherData.humidity}</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="svgs-wrapper">
                <img src={windIcon} alt="" />
                <div className="text-wrapper">
                  <p>{weatherData.windSpeed} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Weather;
