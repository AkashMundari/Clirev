# Clirev

🌦️ **Decentralized Mutual Aid for Weather Disasters**

Clirev is a Web3 platform for creating, funding, and managing community-driven liquidity pools that provide rapid financial relief in response to extreme weather events, powered by **WeatherXM's API** for real-time weather data and the **Mosaia platform** for AI-driven event analysis.

---

## Table of Contents

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

**Clirev** empowers communities to create, fund, and manage decentralized liquidity pools for mutual aid in response to extreme weather events. By leveraging smart contracts, real-time weather data from **WeatherXM**, and AI-driven analysis via **Mosaia**, Clirev enables users to pool resources and provide rapid, transparent financial relief to people in specific geographic areas affected by abnormal temperatures, wind, or other weather anomalies.

<img width="813" alt="01" src="https://github.com/user-attachments/assets/ec408459-8f05-41c1-a46f-88b95c937c7b" />

---

## Features

- **Create and manage weather-triggered liquidity pools**
  
 

- **Community funding and donations**



- **Member-triggered, transparent withdrawals** based on real-world weather data and AI analysis

- **Integration with WeatherXM's API and the Mosaia platform**



- **User-friendly frontend** for pool creation, funding, and monitoring

---

## How It Works

### Pool Creation
Users specify location and weather parameters.

<img width="296" alt="02" src="https://github.com/user-attachments/assets/14abf6f1-8019-4288-925e-e92ae9ce3e21" />

 

User fills out the pool creation form on Clirev and enters the coordinates (latitude and longitude) for a target area **-->** The platform sends these coordinates to the WeatherXM API **-->** WeatherXM returns a list of nearby weather stations **-->** The platform automatically selects the nearest station based on geographic distance **-->** Real-time weather parameters (such as temperature, wind speed, humidity, etc.) from this station are fetched and displayed or used for pool configuration and monitoring

 
<img width="586" alt="05" src="https://github.com/user-attachments/assets/8b6ff4a2-ae84-4592-aa1c-778878e4c092" />

### Funding
Anyone can deposit or donate to a pool.

<img width="797" alt="03" src="https://github.com/user-attachments/assets/425de3a2-a897-464d-adde-acb9a87c85fa" />

Anyone who deposits or adds liquidity to a pool becomes a member and is eligible to receive funds when distributions occur.

Anyone who donates becomes a donor and supports the pool but does not receive any distributions.

### Weather Monitoring
The platform uses **WeatherXM's API** for real-time weather data, analyzed by the **Mosaia AI agent**.

<img width="799" alt="04" src="https://github.com/user-attachments/assets/2cea7726-bec5-4f33-8053-7dc2e6f45953" />

**Weather Data Fetch:**
The platform retrieves real-time weather data for the pool’s location using the WeatherXM API.

**AI Analysis:**
The Mosaia agent analyzes this data, summarizes the weather, and checks if the pool’s trigger conditions are met.

**Withdrawal Enablement:**
If conditions are met, members (liquidity providers) are notified and allowed to call the withdrawal function.

**Member Withdrawal:**
Eligible members can then call the smart contract’s withdrawal function, which verifies their status and distributes funds according to the pool’s rules.


<img width="450" alt="06" src="https://github.com/user-attachments/assets/99a52bee-a871-4336-8d80-196e32d84bd9" />

### Withdrawal Permission
When a weather event matches the pool’s criteria, the agent notifies members. Only members can call the withdrawal function, and only if the contract verifies the weather condition is met.


## Fund Distribution Logic

### Distribution Rules

| Source of Funds | Distribution Rule                                 | Recipient(s)   |
|-----------------|---------------------------------------------------|----------------|
| Deposits        | 50% of total, split proportionally by deposit     | All members    |
| Donations       | 100% of total, split equally                      | All members    |

---


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

| Member | Deposit Share Calculation | Deposit Share | Donation Share | **Total Received** |
|--------|--------------------------|--------------|---------------|--------------------|
| Alice  | (6 / 10) × 5 = 3 ETH     | 3 ETH        | 1 ETH         | **4 ETH**          |
| Bob    | (4 / 10) × 5 = 2 ETH     | 2 ETH        | 1 ETH         | **3 ETH**          |



---

### Summary

This mechanism ensures a fair and transparent distribution of funds:
- **Members** receive payouts based on their deposit proportion and an equal share of donations.
- **Donors** support the pool but do **not** receive any payouts.


---

## WeatherXM API Integration

- **WeatherXM's API** provides reliable, real-time weather data for any location.
- Clirev fetches temperature, wind speed, humidity, and other parameters directly from WeatherXM, ensuring that all pool triggers are based on objective, up-to-date information.
- This integration allows for highly localized and accurate weather event detection.

---

## Mosaia AI Agent Integration

The **Mosaia platform** powers Clirev’s AI agent, which:

- Analyzes weather data from WeatherXM.
- Summarizes current weather conditions for pool members.
- Determines, based on pool rules, if withdrawal conditions are met.
- Notifies members when they are eligible to call the withdrawal function.

This ensures that all decisions are transparent, auditable, and free from human bias.

---

## Smart Contracts

- **PoolVault.sol:** Core contract for each pool, managing deposits, donations, and weather-triggered, member-initiated withdrawals.
- **PoolVaultFactory.sol:** Factory contract for deploying and tracking multiple pools.

Contracts are deployed on Ethereum Sepolia Testnet:  
`[Your contract addresses here]`

---

## Architecture

| Layer         | Technology         | Description                                 |
|---------------|-------------------|---------------------------------------------|
| Frontend      | React/Next.js     | User interface for pool management          |
| Smart Contract| Solidity          | Pool logic, automation, and withdrawals     |
| Oracle        | WeatherXM API     | Real-time weather data feeds                |
| AI Agent      | Mosaia Platform   | Weather event analysis and member notification |


---

## Demo

- [Demo Video Link]
- [Live Testnet Deployment Link]


---

Clirev is inspired by the vision of decentralized, community-driven resilience in the face of climate change and extreme weather. By combining Web3, smart contracts, real-world data from **WeatherXM**, and AI-driven analysis from **Mosaia**, Clirev aims to make mutual aid faster, fairer, and more transparent for everyone.
