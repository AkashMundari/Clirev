"use client";
import { useState, useEffect } from "react";
import { DollarSign, Users, Heart, Wallet } from "lucide-react";
import StatCard from "./StatCard";
import { ethers } from "ethers";
import abi from "../abi.json";

const PoolStats = ({ dashboardStats, poolAddress, connectedAddress }) => {
  const [contractBalance, setContractBalance] = useState("");
  const [totalDeposited, setTotalDeposited] = useState("0");
  const [totalDonated, setTotalDonated] = useState("0");
  const [userDeposits, setUserDeposits] = useState("0");
  const [userDonations, setUserDonations] = useState("0");

  useEffect(() => {
    if (!poolAddress || !connectedAddress) return;

    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/1O_vtMC0Xmdz0SqRDpGcqE3Gmd4osAV3"
    );
    const poolVault = new ethers.Contract(poolAddress, abi, provider);

    async function readPoolVaultData() {
      const contractBalance = await poolVault.getBalance();
      const totalDeposited = await poolVault.totalDeposited();
      const totalDonated = await poolVault.totalDonated();
      const userDeposits = await poolVault.deposits(connectedAddress);
      const userDonations = await poolVault.donations(connectedAddress);

      setContractBalance(ethers.utils.formatEther(contractBalance));
      setTotalDeposited(ethers.utils.formatEther(totalDeposited));
      setTotalDonated(ethers.utils.formatEther(totalDonated));
      setUserDeposits(ethers.utils.formatEther(userDeposits));
      setUserDonations(ethers.utils.formatEther(userDonations));
    }

    readPoolVaultData();
  }, [poolAddress, connectedAddress]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Value Locked"
        value={`${contractBalance} ETH`}
        subtitle="Community treasury"
        icon={DollarSign}
        trend="+12.5%"
      />
      <StatCard
        title="Members"
        value={dashboardStats.totalPools}
        subtitle="Membership Status"
        icon={Users}
        trend="+5.1%"
      />
      <StatCard
        title="Total Deposits"
        value={totalDeposited}
        subtitle="Contributing members"
        icon={Wallet}
        trend="+8.2%"
      />
      <StatCard
        title="Total Donated"
        value={totalDonated}
        subtitle="Generous supporters"
        icon={Heart}
        trend="+15.3%"
      />
    </div>
  );
};

export default PoolStats;
