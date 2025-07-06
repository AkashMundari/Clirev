# Clirev

🌦️ **Decentralized Mutual Aid for Weather Disasters**

Clirev is a Web3 platform for creating, funding, and managing community-driven liquidity pools that provide rapid financial relief in response to extreme weather events, powered by **WeatherXM's API** for real-time weather data and the **Mosaia platform** for AI-driven event analysis.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [How It Works](#how-it-works)
- [WeatherXM API Integration](#weatherxm-api-integration)
- [Mosaia AI Agent Integration](#mosaia-ai-agent-integration)
- [Smart Contracts](#smart-contracts)
- [Architecture](#architecture)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)
- [Additional Best Practices](#additional-best-practices)

---

## Overview

**Clirev** empowers communities to create, fund, and manage decentralized liquidity pools for mutual aid in response to extreme weather events. By leveraging smart contracts, real-time weather data from **WeatherXM**, and AI-driven analysis via **Mosaia**, Clirev enables users to pool resources and provide rapid, transparent financial relief to people in specific geographic areas affected by abnormal temperatures, wind, or other weather anomalies.

---

## Features

- **Create and manage weather-triggered liquidity pools**
- **Community funding and donations**
- **Member-triggered, transparent withdrawals** based on real-world weather data and AI analysis
- **On-chain governance and auditability**
- **Integration with WeatherXM's API and the Mosaia platform**
- **User-friendly frontend** for pool creation, funding, and monitoring

---

## How It Works

### Pool Creation
Users specify location, weather parameters, and withdrawal rules.

### Funding
Anyone can deposit or donate to a pool.

### Weather Monitoring
The platform uses **WeatherXM's API** for real-time weather data, analyzed by the **Mosaia AI agent**.

### Withdrawal Permission
When a weather event matches the pool’s criteria, the agent notifies members. Only members can call the withdrawal function, and only if the contract verifies the weather condition is met.

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
| Automation    | Agent/Oracle Notifies Members | Members call withdraw if allowed   |

---

## Demo

- [Demo Video Link]
- [Live Testnet Deployment Link]

---

## Contributing

Contributions are welcome! Please open issues or pull requests.

---

## License

MIT License

---

## Additional Best Practices

- Add contract addresses and Etherscan links.
- Include screenshots or a demo video.
- Document your API/oracle integration (**WeatherXM**, **Mosaia**).
- List all dependencies and setup steps.
- Describe your member-triggered withdrawal approach.
- Acknowledge any limitations or future work.

---

Clirev is inspired by the vision of decentralized, community-driven resilience in the face of climate change and extreme weather. By combining Web3, smart contracts, real-world data from **WeatherXM**, and AI-driven analysis from **Mosaia**, Clirev aims to make mutual aid faster, fairer, and more transparent for everyone.
