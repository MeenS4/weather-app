import styles from "./app.module.scss";
import axios from "axios";

import { useEffect, useState } from "react";
import { Text } from "./components";
import { createEndpointUrl } from "./utils";

// Klucz API z reguły powinien być przechowywany w zmiennej stanowej lub pliku json,
// który nie jest udostępniany na githubie.
// Używam go tutaj dla wygody testowania aplikacji i w związku
// z brakiem konswekwencji udostępnienia klucza do internetu.
const API_KEY = "7efe2959280fac1ff1ec353f0bec4355";

export function App() {
  const [city, setCity] = useState<string>("paris");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [searchedCity, setSearchedCity] = useState("paris");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(createEndpointUrl(city, API_KEY));
      setWeatherData(response.data);
    }

    fetchData();
  }, [searchedCity]);

  function handleInputChange(value: string) {
    setCity(value);
  }

  function handleCityChange() {
    setSearchedCity(city);
  }

  return (
    <section className={styles["main"]}>
      <Text className={styles["main__header"]}>Weather status in [city]</Text>

      <input
        className={styles["main__input"]}
        type="text"
        placeholder="City name"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(e.target.value)
        }
        value={city}
      />

      <div className={styles["main__button"]} onClick={handleCityChange}>
        Search weather
      </div>

      <div className={styles["main__content"]}>
        {weatherData &&
          weatherData.weather &&
          weatherData.weather.length > 0 && (
            <Text>
              <b>General description:</b>{" "}
              {weatherData.weather[0].main as string}
            </Text>
          )}

        {weatherData && weatherData.main && (
          <>
            <Text>
              <b>Temp:</b> {weatherData.main.temp as string} Celsius
            </Text>

            <Text>
              <b>Feels-like temp:</b> {weatherData.main.feels_like as string}{" "}
              Celsius
            </Text>

            <Text>
              <b>Pressure:</b> {weatherData.main.pressure as string}
            </Text>

            <Text>
              <b>Humidity:</b> {weatherData.main.humidity as string}
            </Text>
          </>
        )}
      </div>
    </section>
  );
}
