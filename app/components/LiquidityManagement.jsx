"use client";

import { useState } from "react";
import { Plus, Heart } from "lucide-react";
import { ethers } from "ethers";
import abi from "../abi.json";

const LiquidityManagement = ({ poolAddress }) => {
  // State for input fields
  const [liquidityAmount, setLiquidityAmount] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [txStatus, setTxStatus] = useState("");

  // Handler for Deposit (Add Liquidity)
  const handleDeposit = async () => {
    if (
      !liquidityAmount ||
      isNaN(Number(liquidityAmount)) ||
      Number(liquidityAmount) <= 0
    ) {
      setTxStatus("Please enter a valid liquidity amount.");
      return;
    }
    try {
      if (!window.ethereum) {
        setTxStatus("No wallet found. Please install MetaMask.");
        return;
      }
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const poolVault = new ethers.Contract(poolAddress, abi, signer);

      setTxStatus("Waiting for wallet confirmation...");
      const tx = await poolVault.deposit({
        value: ethers.utils.parseEther(liquidityAmount),
      });
      setTxStatus("Transaction sent. Waiting for confirmation...");
      await tx.wait();
      setTxStatus("Liquidity added successfully!");
      setLiquidityAmount("");
    } catch (error) {
      setTxStatus("Deposit failed: " + (error.reason || error.message));
    }
  };

  // Handler for Donate
  const handleDonate = async () => {
    if (
      !donationAmount ||
      isNaN(Number(donationAmount)) ||
      Number(donationAmount) <= 0
    ) {
      setTxStatus("Please enter a valid donation amount.");
      return;
    }
    try {
      if (!window.ethereum) {
        setTxStatus("No wallet found. Please install MetaMask.");
        return;
      }
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const poolVault = new ethers.Contract(poolAddress, abi, signer);

      setTxStatus("Waiting for wallet confirmation...");
      const tx = await poolVault.donate({
        value: ethers.utils.parseEther(donationAmount),
      });
      setTxStatus("Transaction sent. Waiting for confirmation...");
      await tx.wait();
      setTxStatus("Donation successful!");
      setDonationAmount("");
    } catch (error) {
      setTxStatus("Donation failed: " + (error.reason || error.message));
    }
  };

  return (
    <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 items-center">
      {/* Add Liquidity */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          placeholder="Enter liquidity amount"
          value={liquidityAmount}
          onChange={(e) => setLiquidityAmount(e.target.value)}
          className="mt-1 border border-gray-300 rounded-md shadow-sm p-2 text-black flex-1"
        />
        <button
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          onClick={handleDeposit}
        >
          <Plus className="w-5 h-5" />
          <span>Add Liquidity</span>
        </button>
      </div>
      {/* Donate */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          placeholder="Enter donation amount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          className="mt-1 border border-gray-300 rounded-md shadow-sm p-2 text-black flex-1"
        />
        <button
          className="bg-pink-600 hover:bg-pink-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          onClick={handleDonate}
        >
          <Heart className="w-4 h-4 text-pink-200" />

          <span>Donate</span>
        </button>
      </div>
      {/* Status Message */}
      {txStatus && (
        <div className="col-span-2 mt-2 text-center text-sm text-gray-700">
          {txStatus}
        </div>
      )}
    </div>
  );
};

export default LiquidityManagement;
