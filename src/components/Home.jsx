import axios from "axios";
import { MapPin, Wind } from "lucide-react";
import { useState } from "react";

import { apiKey } from '../weather.config.json'

export const Home = () => {
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (handleFormSubmit) {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div
      className="h-screen bg-cover flex items-center justify-center flex-col gap-6 overflow-hidden"
      style={{
        backgroundImage: "url('./src/assets/images/pexels-pink-cloud.jpg')",
      }}
    >
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Digite a cidade"
            className="w-full md:w-96 h-10 rounded p-2 bg-transparent border-solid border-2 placeholder:text-zinc-600 border-zinc-300/30 outline-none"
          />
        </form>
      </div>

      {data.main ? (
        <div className="flex gap-6 flex-col md:flex-row w-full max-w-screen-lg">
          <div className="bg-violet-200/40 h-auto p-6 rounded w-full md:w-1/2">
            <span className="text-zinc-600 text-sm flex gap-1">
              <MapPin size={19} /> {data.name}
            </span>
            <div className="flex flex-col items-center justify-center mt-9">
              <span className="text-7xl bold">{data.main.temp.toFixed()}°</span>
              <span>{data.weather[0].description}</span>
            </div>
          </div>

          <div className="flex flex-col gap-6 justify-between w-full md:w-1/2">
            <div className="bg-violet-200/40 h-auto w-full rounded p-6 flex flex-col gap-3 items-center">
              <span className="text-4xl">{data.wind.speed}</span>
              <span className="flex gap-2 items-center">
                <Wind size={20} />
                wind speed
              </span>
            </div>

            <div className="bg-violet-200/40 w-full rounded flex justify-between p-6">
              <div>
                <p className="text-4xl">{data.main.temp_min.toFixed()}°</p>
                <p>minimum</p>
              </div>
              <div>
                <p className="text-4xl">{data.main.temp_max.toFixed()}°</p>
                <p>maximum</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};