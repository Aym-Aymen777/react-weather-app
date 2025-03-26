import React, { useState } from "react";
import "./app.css";

import { AnimateClouds } from "./animation";

const App = () => {
  const Populars = ["New york", "Chicago", "Los Angeles", "Tokyo", "London"];

  const [result, setResult] = useState({});
  //  const [querySearch, setQuerySearch] = useState("");
  const [isGetting, setIsGetting] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: "", lon: "" });
  const [backgroundClass, setBackgroundClass] = useState("");

  const getWeatherDataByCoords = async (lat, long) => {
    if (!coordinates.lat || !coordinates.lon) {
      alert("Please enter both latitude and longitude");
      return;
    }
    if (isNaN(coordinates.lat) || isNaN(coordinates.lon)) {
      alert("Invalid coordinates - must be numbers");
      return;
    }
    console.log("Searching coordinates:", coordinates);
    try {
      await fetch(
        `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${long}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setResult(data);
          setIsGetting(true);
          switch (data.weather[0].description) {
            case "overcast clouds":
              setBackgroundClass("cloud");
              break;
            case "scattered clouds":
              setBackgroundClass("cloud");
              break;
            case "clear sky":
              setBackgroundClass("sun");
              break;
            case "moderate rain":
              setBackgroundClass("rain");
              break;
          }
        });
    } catch (error) {
      console.log("error in getting weather data", error);
    }
  };

  const getWeatherDataByCity = async (city) => {
    try {
      await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setResult(data);
          setIsGetting(true);
          switch (data.weather[0].description) {
            case "overcast clouds":
              setBackgroundClass("cloud");
              break;
            case "scattered clouds":
              setBackgroundClass("cloud");
              break;
            case "clear sky":
              setBackgroundClass("sun");
              break;
            case "moderate rain":
              setBackgroundClass("rain");
              break;
          }
        });
    } catch (error) {
      console.log("error in getting weather data", error);
    }
  };

  const handleQuerySearch = (e) => {
    e.preventDefault();

    const searchInput = e.target.querySelector("input").value.trim();
    if (!searchInput) {
      console.log("Please enter a search query.");
      return;
    }
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude.toFixed(4),
          lon: position.coords.longitude.toFixed(4),
        });
      },
      (error) => {
        console.log(error);
        if (error.code === 2) {
          alert(
            "Location services are unavailable. Please check your GPS or try again."
          );
        }
      }
    );
  };

  AnimateClouds(backgroundClass);

  return (
    <div className="app">
      {isGetting && (
        <div className="weather-container">
          {backgroundClass == "sun" && (
            <div className="weather-sun">
              <div className="sun">
                <div className="rays"></div>
                <div className="rays"></div>
                <div className="rays"></div>
                <div className="rays"></div>
              </div>
            </div>
          )}
          {backgroundClass == "cloud" && (
            <div id="clouds">
              <div className="cloud1"></div>
              <div className="cloud2"></div>
              <div className="cloud3"></div>
            </div>
          )}
          {backgroundClass == "rain" && (
            <div className="rain">
              {[...Array(250)].map((_, r) => (
                <svg
                  key={r}
                  className="rain__drop"
                  preserveAspectRatio="xMinYMin"
                  viewBox="0 0 5 50"
                  style={{
                    "--x": Math.floor(Math.random() * 100),
                    "--y": Math.floor(Math.random() * 100),
                    "--o": Math.random(),
                    "--a": Math.random() + 0.5,
                    "--d": Math.random() * 2 - 1,
                    "--s": Math.random(),
                  }}>
                  <path
                    stroke="none"
                    d="M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"
                  />
                </svg>
              ))}
            </div>
          )}
        </div>
      )}
      <form className="search-container" onSubmit={handleQuerySearch}>
        <div className="coordinate-inputs">
          <input
            type="number"
            className="coordinate-input"
            placeholder="Latitude (-90 to 90)"
            value={coordinates.lat}
            onChange={(e) =>
              setCoordinates({ ...coordinates, lat: e.target.value })
            }
            step="0.0001"
            min="-90"
            max="90"
          />
          <input
            type="number"
            className="coordinate-input"
            placeholder="Longitude (-180 to 180)"
            value={coordinates.lon}
            onChange={(e) =>
              setCoordinates({ ...coordinates, lon: e.target.value })
            }
            step="0.0001"
            min="-180"
            max="180"
          />
        </div>
        <button
          className="search-button"
          onClick={() =>
            getWeatherDataByCoords(coordinates.lat, coordinates.lon)
          }>
          Search
        </button>
        <button
          className="search-button"
          onClick={handleGeolocation}
          style={{ backgroundColor: "#2196F3" }}>
          Use My Location
        </button>
      </form>
      <div className="city-list">
        {Populars.map((city) => (
          <button
            key={city}
            className="city-button"
            onClick={() => getWeatherDataByCity(city)}>
            {city}
          </button>
        ))}
      </div>
      {isGetting && (
        <div className="weather-grid">
          <div className="weather-card">
            <h2>{result.name}</h2>
            <img className="weather-icon" src={result.weather[0].icon} />
            <div className="temperature">{result.main.temp}°C</div>
            <div className="condition">{result.weather[0].description}</div>

            <div className="details">
              <div className="detail-item">
                <div className="detail-label">Humidity</div>
                <div className="detail-value">{result.main.humidity}%</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Wind</div>
                <div className="detail-value">{result.wind.speed} km/h</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
