"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import factoryAbi from "../factoryAbi.json";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const factoryAddress = "0xb797601CF5D594b9DFE81caF693D500f94e6A6E3";

// Find the closest station to the reference point
const findClosestStation = (stations, givenLatitude, givenLongitude) => {
  if (!stations || stations.length === 0) return null;

  let minDistance = Infinity;
  let closestStation = null;

  for (const station of stations) {
    const { lat, lon } = station.location;
    const distance = calculateDistance(givenLatitude, givenLongitude, lat, lon);
    if (distance < minDistance) {
      minDistance = distance;
      closestStation = station;
    }
  }
  return closestStation;
};

const getLocationName = async (lat, lon) => {
  const response = await fetch(
    `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=685eca4c540cc983855104ndx147e73`
  );
  const data = await response.json();
  const location = `${data.address.town}, ${data.address.province}, ${data.address.country}`;
  return location;
};

const CreatePool = () => {
  const [givenLatitude, setGivenLatitude] = useState("");
  const [givenLongitude, setGivenLongitude] = useState("");
  const [stationLatitude, setStationLatitude] = useState("");
  const [stationLongitude, setStationLongitude] = useState("");
  const [stationId, setStationId] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [temperatureLowerLimit, setTemperatureLowerLimit] = useState("");
  const [temperatureUpperLimit, setTemperatureUpperLimit] = useState("");
  const [windLowerLimit, setWindLowerLimit] = useState("");
  const [windUpperLimit, setWindUpperLimit] = useState("");
  // const [duration, setDuration] = useState("");
  // const [liquidity, setLiquidity] = useState("");
  const [error, setError] = useState("");
  const radius = 60000;

  const fetchClosestStation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://pro.weatherxm.com/api/v1/stations/near?lat=${givenLatitude}&lon=${givenLongitude}&radius=${radius}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-KEY": "f57a818f-3446-4fae-879b-bd2e4840eb49",
          },
        }
      );

      if (!response.ok) throw new Error("Network response failed");

      const data = await response.json();
      // Access the 'stations' array inside the JSON object
      const stations = data.stations;
      const closestStation = findClosestStation(
        stations,
        givenLatitude,
        givenLongitude
      );

      const lat = closestStation.location.lat;
      const lon = closestStation.location.lon;
      console.log(closestStation);

      console.log(closestStation.id);
      const location = await getLocationName(lat, lon);

      setStationLatitude(lat);
      setStationLongitude(lon);
      setLocation(location);
      setStationId(closestStation.id);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    // Submit logic here
    console.log({
      stationId,
      location,
      givenLatitude,
      givenLongitude,
      stationLatitude,
      stationLongitude,
      temperatureLowerLimit,
      temperatureUpperLimit,
      windLowerLimit,
      windUpperLimit,
    });

    let formattedLatitude = Math.round(Number(stationLatitude) * 10000000);

    let formattedLongitude = Math.round(Number(stationLongitude) * 10000000);

    async function createPool() {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const poolFactory = new ethers.Contract(
        factoryAddress,
        factoryAbi,
        signer
      );

      console.log(poolFactory);

      const tx = await poolFactory.createPoolVault(
        stationId,
        location,
        formattedLatitude,
        formattedLongitude,
        temperatureLowerLimit,
        temperatureUpperLimit,
        windLowerLimit,
        windUpperLimit
      );
      console.log("Pool created:", tx);
    }

    createPool();
  }

  return (
    <div className="ml-70 pt-22 min-h-screen bg-gray-50 font-sans p-6 flex items-center justify-center">
      <div className="p-5 border border-gray-200 rounded-lg w-max md:p-10">
        <form className="space-y-4">
          <label className="text-md font-bold text-gray-700">
            Temperature range:
          </label>
          <div className="flex space-x-4">
            <div>
              <input
                type="text"
                placeholder="Lower Limit"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                value={temperatureLowerLimit}
                onChange={(e) => setTemperatureLowerLimit(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Upper Limit"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                value={temperatureUpperLimit}
                onChange={(e) => setTemperatureUpperLimit(e.target.value)}
              />
            </div>
          </div>

          <label className="text-md font-bold text-gray-700">
            Wind-Speed range:
          </label>
          <div className="flex space-x-4">
            <div>
              <input
                type="text"
                placeholder="Lower Limit"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                value={windLowerLimit}
                onChange={(e) => setWindLowerLimit(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Upper Limit"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                value={windUpperLimit}
                onChange={(e) => setWindUpperLimit(e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
                type="text"
                placeholder="e.g. 40.8781"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                value={givenLatitude}
                onChange={(e) => setGivenLatitude(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input
                type="text"
                placeholder="e.g. 29.3754"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                value={givenLongitude}
                onChange={(e) => setGivenLongitude(e.target.value)}
              />
            </div>
          </div>

          <button
            className="w-[30%] bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md "
            onClick={fetchClosestStation}
            type="button"
          >
            Done
          </button>
          <br />

          <label className="text-md font-bold text-gray-700">
            Coordinates of Nearest WeatherXM Station:
          </label>
          <div className="flex space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
                type="text"
                placeholder=""
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                value={stationLatitude}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input
                type="text"
                placeholder=""
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                value={stationLongitude}
                disabled
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location of WeatherXM Station
            </label>
            <input
              type="text"
              placeholder=""
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              value={location}
              disabled
            />
          </div>

          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md"
            type="submit"
          >
            Create Pool
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePool;
