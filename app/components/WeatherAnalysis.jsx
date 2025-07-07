"use client";

import { useState, useEffect } from "react";
import { Thermometer, CloudRain, Loader2, Bot, Send } from "lucide-react";
import { ethers } from "ethers";
import abi from "../abi.json";

const WeatherAnalysis = ({ poolAddress }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  const [stationId, setStationId] = useState("");
  const [temperatureLowerLimit, setTemperatureLowerLimit] = useState("");
  const [temperatureUpperLimit, setTemperatureUpperLimit] = useState("");
  const [windLowerLimit, setWindLowerLimit] = useState("");
  const [windUpperLimit, setWindUpperLimit] = useState("");
  const [latestTemperature, setLatestTemperature] = useState(0);
  const [latestWindSpeed, setLatestWindSpeed] = useState(0);
  const [latestHumidity, setLatestHumidity] = useState(0);
  const [latestPressure, setLatestPressure] = useState(0);
  const [latestDewPoint, setLatestDewPoint] = useState(0);
  const [latestSolarIrradiance, setLatestSolarIrradiance] = useState(0);
  const [agentSummary, setAgentSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [txStatus, setTxStatus] = useState("");
  const [apiKey, setApiKey] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3RpdmVfaWQiOiI3MjYzZTJlNzI4MjI5ZDk3MTk5YmViZWU4NDJlYjQ3ZSIsImNsaWVudCI6IjY4NmEyMzllMjk2ZjNjMjk0MDgyOGMzOCIsInVzZXIiOiI2ODUxNDcyZGQzY2NlMDFkYjVkMzdkZTgiLCJhcHAiOiI2NzRiNjkxZTEwZGM3MzAyMmU5OGVkYzEiLCJib3QiOiI2ODZhMjM5ZTI5NmYzYzI5NDA4MjhjMzYiLCJpYXQiOjE3NTE3ODYzOTl9.vmk01gZvD9n_LTb7sZChAAEXpcu7owrkiA5_VZf09eU"
  );
  const [withdrawEnabled, setWithdrawEnabled] = useState(false);
  const [contractBalance, setContractBalance] = useState(0);

  // Fetch pool metadata
  useEffect(() => {
    if (!poolAddress) return;

    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/1O_vtMC0Xmdz0SqRDpGcqE3Gmd4osAV3"
    );
    const poolVault = new ethers.Contract(poolAddress, abi, provider);

    async function readPoolVaultData() {
      const latRaw = await poolVault.latitude();
      const lonRaw = await poolVault.longitude();
      const loc = await poolVault.location();
      const tempLow = await poolVault.tempLower();
      const tempUpper = await poolVault.tempUpper();
      const windLower = await poolVault.windLower();
      const windUpper = await poolVault.windUpper();
      const stationId = await poolVault.stationID();
      const contractBalance = await poolVault.getBalance();

      const lat =
        (ethers.BigNumber.isBigNumber(latRaw)
          ? latRaw.toNumber()
          : Number(latRaw)) / 1e7;
      const lon =
        (ethers.BigNumber.isBigNumber(lonRaw)
          ? lonRaw.toNumber()
          : Number(lonRaw)) / 1e7;
      const tL = ethers.BigNumber.isBigNumber(tempLow)
        ? tempLow.toNumber()
        : Number(tempLow);
      const tU = ethers.BigNumber.isBigNumber(tempUpper)
        ? tempUpper.toNumber()
        : Number(tempUpper);
      const wL = ethers.BigNumber.isBigNumber(windLower)
        ? windLower.toNumber()
        : Number(windLower);
      const wU = ethers.BigNumber.isBigNumber(windUpper)
        ? windUpper.toNumber()
        : Number(windUpper);

      setLatitude(lat);
      setLongitude(lon);
      setLocation(loc);
      setTemperatureLowerLimit(tL);
      setTemperatureUpperLimit(tU);
      setWindLowerLimit(wL);
      setWindUpperLimit(wU);
      setStationId(stationId);
      setContractBalance(contractBalance);
    }

    readPoolVaultData();
  }, [poolAddress]);

  // Fetch weather data and run agent
  useEffect(() => {
    if (!stationId || !apiKey) return;

    async function fetchWeatherAndAnalyze() {
      setIsLoading(true);
      setAgentSummary("");
      setTxStatus("");
      setWithdrawEnabled(false);

      try {
        // 1. Fetch latest weather data
        const response = await fetch(
          `https://pro.weatherxm.com/api/v1/stations/${stationId}/latest`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "X-API-KEY": "f57a818f-3446-4fae-879b-bd2e4840eb49",
            },
          }
        );
        if (!response.ok) throw new Error("Network response failed");
        const latestData = await response.json();
        const obs = latestData.observation;
        setLatestTemperature(obs.temperature);
        setLatestHumidity(obs.humidity);
        setLatestPressure(obs.pressure);
        setLatestWindSpeed(obs.wind_speed);
        setLatestDewPoint(obs.dew_point);
        setLatestSolarIrradiance(obs.solar_irradiance);

        // 2. Compose prompt for Mosaia agent
        const agentPrompt = `
Given the following weather parameters:
- Temperature: ${obs.temperature}°C
- Windspeed: ${obs.wind_speed} m/s
- Humidity: ${obs.humidity}%
- Rainfall: ${obs.precipitation ?? "N/A"} mm
- Pressure: ${obs.pressure} hPa
- Dew Point: ${obs.dew_point ?? "N/A"} °C
- Solar Irradiance: ${obs.solar_irradiance ?? "N/A"} W/m2

And the allowed ranges:
- Temperature: ${temperatureLowerLimit}°C to ${temperatureUpperLimit}°C
- Windspeed: ${windLowerLimit} m/s to ${windUpperLimit} m/s

1. Summarize the weather in 2-3 sentences.
2. If temperature or windspeed is outside the allowed range, reply with "TRIGGER_WITHDRAW".
`;

        // 3. Call Mosaia agent
        const mosaiaResp = await fetch(
          "https://api.mosaia.ai/v1/agent/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "68684f5cddb501570199b339",
              messages: [{ role: "user", content: agentPrompt }],
            }),
          }
        );
        if (!mosaiaResp.ok)
          throw new Error(`Mosaia API Error: ${mosaiaResp.status}`);
        const mosaiaData = await mosaiaResp.json();
        const agentReply = mosaiaData.choices[0].message.content;
        setAgentSummary(agentReply);

        // 4. If agent says to trigger withdraw, enable withdrawal button
        if (
          (agentReply.includes("TRIGGER_WITHDRAW") ||
            obs.temperature < temperatureLowerLimit ||
            obs.temperature > temperatureUpperLimit ||
            obs.wind_speed < windLowerLimit ||
            obs.wind_speed > windUpperLimit) &&
          contractBalance > 0
        ) {
          setWithdrawEnabled(true);
        } else {
          setWithdrawEnabled(false);
        }
      } catch (error) {
        setAgentSummary("Error: " + (error.reason || error.message));
        setWithdrawEnabled(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeatherAndAnalyze();
    // eslint-disable-next-line
  }, [stationId, apiKey]);

  // Withdraw function
  async function callWithdraw() {
    try {
      if (!window.ethereum) {
        setTxStatus("No wallet found. Please install MetaMask.");
        return;
      }
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const poolVault = new ethers.Contract(poolAddress, abi, signer);

      setTxStatus("Sending withdraw transaction...");
      const tx = await poolVault.withdraw();
      await tx.wait();
      setTxStatus("Withdraw successful!");
    } catch (error) {
      setTxStatus("Withdraw failed: " + (error.reason || error.message));
    }
  }

  return (
    <>
      <div className="lg:col-span-2 rounded-xl shadow-sm p-6 border border-gray-100 bg-white text-black font-sans">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Station Info:</h3>
          <br />
          <p>
            <b>Location:</b> {location}
          </p>
          <p>
            <b>Station ID:</b> {stationId}
          </p>
          <div className="flex justify-between">
            <span>
              <b>Latitude:</b> {latitude}
            </span>
            <span>
              <b>Longitude:</b> {longitude}
            </span>
          </div>
          <br />
          <h3 className="text-lg font-bold text-gray-900">
            Weather Parameters:
          </h3>
          <br />
          <div className="flex justify-between">
            <span>
              <b>Temperature: </b>
              {latestTemperature} °C
            </span>
            <span>
              <b>Wind-Speed:</b> {latestWindSpeed} m/s
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              <b>Pressure:</b> {latestPressure} hPa
            </span>
            <span>
              <b>Solar Irradiance: </b>
              {latestSolarIrradiance} W/m2
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              <b>Dew Point:</b> {latestDewPoint} °C
            </span>
            <span>
              <b>Humidity:</b> {latestHumidity}%
            </span>
          </div>
          <div>
            <b>Temperature range:</b> {temperatureLowerLimit}-
            {temperatureUpperLimit} °C
          </div>
          <div>
            <b>Wind-Speed range: </b>
            {windLowerLimit}-{windUpperLimit} m/s
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-black">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Agent Analysis
        </h3>
        <div>
          {isLoading ? (
            <div className="flex items-center gap-2 text-purple-700">
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing weather...
            </div>
          ) : (
            <div className="whitespace-pre-line">{agentSummary}</div>
          )}
          {withdrawEnabled && (
            <div className="mt-4 text-center">
              <button
                onClick={callWithdraw}
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Withdraw
              </button>
            </div>
          )}
          {txStatus && (
            <div className="mt-2 text-sm text-center text-purple-700 font-medium">
              {txStatus}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherAnalysis;
