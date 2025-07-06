import React from "react";

import WeatherAnalysis from "../../components/WeatherAnalysis";

import PoolStats from "../../components/PoolStats";

import LiquidityManagement from "../../components/LiquidityManagement";
import ContributionInfo from "../../components/ContributionInfo";

const dashboardStats = {
  tvl: 145.7,
  totalMembers: 234,
  totalDonors: 67,
  totalPools: 12,
};






export default async function MainDashboard({ params }) {
  const poolAddress = (await params).poolAddress;

  console.log(poolAddress);

  const connectedAddress = "0x4a9973ad4dbb8a968ca5a5c8d2b13937deb0f928";

  return (
    <div className="ml-70 pt-18 min-h-screen bg-gray-50 font-sans">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Community Protection Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor community funds and weather-triggered assistance
          </p>
        </div>

        {/* Stats Grid */}
        <PoolStats
          dashboardStats={dashboardStats}
          poolAddress={poolAddress}
          connectedAddress={connectedAddress}
        />

        {/* Add Liquidity Button */}
        <LiquidityManagement poolAddress={poolAddress} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weather Analytics */}
          <WeatherAnalysis poolAddress={poolAddress} />

          {/* Members List */}
          {/* <TopContributors members={members} /> */}
        </div>

        {/* Full Members and Donors Lists */}
        <ContributionInfo poolAddress={poolAddress} />
      </div>
    </div>
  );
}
