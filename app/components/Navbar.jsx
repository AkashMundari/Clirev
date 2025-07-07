"use client";
import { useState } from "react";
import { Heart } from "lucide-react";

const Navbar = () => {
  const [account, setAccount] = useState("");

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (err) {
        alert("Connection to MetaMask was rejected.");
      }
    } else {
      alert(
        "MetaMask is not installed. Please install it to connect your wallet."
      );
    }
  };

  // Shorten address for display
  const shortAddress = (addr) =>
    addr ? addr.slice(0, 6) + "..." + addr.slice(-4) : "";

  return (
    <div className="ml-70 bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-18 font-sans">
      <div className="text-black font-bold text-lg bg-green-700 p-2 rounded-lg">
        <Heart className="w-5 h-5 text-white" />
      </div>
      <div className="flex space-x-4 text-black items-center">
        {account ? (
          <span className="px-3 py-1 bg-gray-100 rounded-lg font-mono text-green-700 border border-green-700">
            {shortAddress(account)}
          </span>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
