


# 🌦️ Clirev - Decentralized Mutual Aid for Weather Disasters

 

Clirev is a Web3 platform for creating, funding, and managing community-driven liquidity pools that provide rapid financial relief in response to extreme weather events. It is powered by [WeatherXM's API](https://weatherxm.com/) for real-time weather data and the [Mosaia platform](https://www.mosaia.ai/) for AI-driven event analysis.

[**Demo Video**](https://youtu.be/-BDZCYIdVeg?si=7PRdhyj3T6iga-NP)



---

## 📚 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [How It Works](#how-it-works)
- [Fund Distribution Logic](#fund-distribution-logic)
- [WeatherXM API Integration](#weatherxm-api-integration)
- [Mosaia AI Agent Integration](#mosaia-ai-agent-integration)
- [Smart Contracts](#smart-contracts)
- [Architecture](#architecture)
- [Demo](#demo)



---

## Overview

**Clirev** empowers communities to create, fund, and manage decentralized liquidity pools for mutual aid in response to extreme weather events. By leveraging smart contracts, real-time weather data from [WeatherXM](https://weatherxm.com/), and AI-driven analysis via [Mosaia](https://www.mosaia.ai/), Clirev enables users to pool resources and provide rapid, transparent financial relief to people in specific geographic areas affected by abnormal temperatures, wind, or other weather anomalies.

<img width="813" alt="01" src="https://github.com/user-attachments/assets/ec408459-8f05-41c1-a46f-88b95c937c7b" />

---

## 🚀 Features

- 🏦 **Create and manage weather-triggered liquidity pools**
- 🤝 **Community funding and donations**
- 🔓 **Member-triggered, transparent withdrawals** based on real-world weather data and AI analysis
- 🌐 **Integration with [WeatherXM's API](https://weatherxm.com/) and the [Mosaia platform](https://www.mosaia.ai/)**
- 🖥️ **User-friendly frontend** for pool creation, funding, and monitoring

---

## 🔗 How It Works

### 🗺️ Pool Creation

Users specify location and weather parameters.

<img width="296" alt="02" src="https://github.com/user-attachments/assets/14abf6f1-8019-4288-925e-e92ae9ce3e21" />

- User fills out the pool creation form on Clirev and enters the coordinates (latitude and longitude) for a target area.
- The platform sends these coordinates to the [WeatherXM API](https://weatherxm.com/).
- WeatherXM returns a list of nearby weather stations.
- The platform automatically selects the nearest station based on geographic distance.
- Real-time weather parameters (such as temperature, wind speed, humidity, etc.) from this station are fetched and displayed or used for pool configuration and monitoring.

<img width="586" alt="05" src="https://github.com/user-attachments/assets/8b6ff4a2-ae84-4592-aa1c-778878e4c092" />

### 💰 Funding

Anyone can deposit or donate to a pool.

<img width="797" alt="03" src="https://github.com/user-attachments/assets/425de3a2-a897-464d-adde-acb9a87c85fa" />

- Members (deposit): Contribute funds and become eligible for distributions
- Donors (donate): Support the pool without receiving distributions


### 🌦️ Weather Monitoring

The platform uses [WeatherXM's API](https://weatherxm.com/) for real-time weather data, analyzed by the [Mosaia AI agent](https://www.mosaia.ai/).

<img width="799" alt="04" src="https://github.com/user-attachments/assets/2cea7726-bec5-4f33-8053-7dc2e6f45953" />

**Workflow:**
- **Weather Data Fetch:** The platform retrieves real-time weather data for the pool’s location using the WeatherXM API.
- **AI Analysis:** The Mosaia agent analyzes this data, summarizes the weather, and checks if the pool’s trigger conditions are met.
- **Withdrawal Enablement:** If conditions are met, members (liquidity providers) are notified and allowed to call the withdrawal function.
- **Member Withdrawal:** Eligible members can then call the smart contract’s withdrawal function, which verifies their status and distributes funds according to the pool’s rules.

  <img width="450" alt="06" src="https://github.com/user-attachments/assets/99a52bee-a871-4336-8d80-196e32d84bd9" />

### 🔑 Withdrawal Permission

When a weather event matches the pool’s criteria, the agent notifies members. Only members can call the withdrawal function, and only if the contract verifies the weather condition is met.

---

## 💸 Fund Distribution Logic

### Distribution Rules

| 💧 Source of Funds | 📊 Distribution Rule                             | 🎯 Recipient(s)   |
|--------------------|-------------------------------------------------|-------------------|
| Deposits           | 50% of total, split proportionally by deposit   | All members       |
| Donations          | 100% of total, split equally                    | All members       |

### Example Calculation

Suppose:

- **Total Deposited:** 10 ETH  
- **Total Donated:** 2 ETH  
- **Members:**  
  - Alice (6 ETH deposit)  
  - Bob (4 ETH deposit)

#### Step 1: Calculate Distributable Amounts

- **Distributable Deposits:**  
  10 ETH ÷ 2 = 5 ETH

- **Donation Share (per member):**  
  2 ETH ÷ 2 = 1 ETH each

#### Step 2: Calculate Each Member's Share

| 👤 Member | 🧮 Deposit Share Calculation | 💰 Deposit Share | 🎁 Donation Share | 🏆 **Total Received** |
|-----------|-----------------------------|-----------------|------------------|----------------------|
| Alice     | (6 / 10) × 5 = 3 ETH        | 3 ETH           | 1 ETH            | **4 ETH**            |
| Bob       | (4 / 10) × 5 = 2 ETH        | 2 ETH           | 1 ETH            | **3 ETH**            |

---

### 📝 Summary

- **Members** receive payouts based on their deposit proportion and an equal share of donations.
- **Donors** support the pool but do **not** receive any payouts.

---
## Project Architecture

![diagram-export-7-7-2025-9_54_54-AM](https://github.com/user-attachments/assets/5deb4528-5c1b-4c17-894e-6c6dbb8f822c)


---
## 🌐 WeatherXM API Integration

- [WeatherXM's API](https://weatherxm.com/) provides reliable, real-time weather data for any location.
- Clirev fetches temperature, wind speed, humidity, and other parameters directly from WeatherXM, ensuring that all pool triggers are based on objective, up-to-date information.
- This integration allows for highly localized and accurate weather event detection.
- See the WeatherXM API documentation: [https://docs.weatherxm.com/](https://docs.weatherxm.com/)

- ### WeatherXM API Implementation

```javascript
// Fetch real-time weather data
const response = await fetch(
  `https://pro.weatherxm.com/api/v1/stations/${stationId}/latest`,
  {
    headers: {
      'Accept': 'application/json',
      'X-API-KEY': process.env.WEATHERXM_API_KEY
    }
  }
);
```

---

## 🤖 Mosaia AI Agent Integration

The [Mosaia platform](https://www.mosaia.ai/) powers Clirev’s AI agent, which:

- Analyzes weather data from WeatherXM.
- Summarizes current weather conditions for pool members.
- Determines, based on pool rules, if withdrawal conditions are met.
- Notifies members when they are eligible to call the withdrawal function.
  
- ### Mosaia Agent Workflow

```javascript
const agentPrompt = `
Given weather parameters:
- Temperature: ${temperature}°C
- Wind Speed: ${windSpeed} m/s
- Allowed ranges: ${tempRange}°C, ${windRange} m/s

1. Summarize current weather conditions
2. If outside allowed ranges, respond with "TRIGGER_WITHDRAW"
`;

const response = await fetch('https://api.mosaia.ai/v1/agent/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${MOSAIA_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: "68684f5cddb501570199b339",
    messages: [{ role: "user", content: agentPrompt }]
  })
});
```


This ensures that all decisions free from human bias.

---

## 📜 Smart Contracts

- **PoolVault.sol:** Core contract for each pool, managing deposits, donations, and weather-triggered, member-initiated withdrawals.
- **PoolVaultFactory.sol:** Factory contract for deploying and tracking multiple pools.

Contracts are deployed on Ethereum Sepolia Testnet:  
PoolVaultFactory.sol :`[0xb797601CF5D594b9DFE81caF693D500f94e6A6E3]`

---

## 🏗️ Tech Stack

| Component | Technology | Purpose |
| :-- | :-- | :-- |
| **Frontend** | Next.js + React | User interface and Web3 integration |
| **Smart Contracts** | Solidity + Ethers.js | Pool logic and automated distributions |
| **Weather Oracle** | WeatherXM API | Real-time hyperlocal weather data |
| **AI Agent** | Mosaia Platform | Weather event analysis and notifications |
| **Blockchain** | Ethereum Sepolia | Decentralized infrastructure |

---

## 🌍 Impact \& Vision

Clirev addresses the growing need for **climate resilience** in an era of increasing weather volatility. By combining:

- **Decentralized Infrastructure** (WeatherXM's global station network)
- **AI-Driven Intelligence** (Mosaia's analytical capabilities)
- **Web3 Transparency** (Smart contract automation)





---


