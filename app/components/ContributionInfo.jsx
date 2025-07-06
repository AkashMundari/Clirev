"use client";

import AllDonors from "./AllDonors";
import AllMembers from "./AllMembers";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../abi.json";

const ContributionInfo = ({ poolAddress }) => {
  const [members, setMembers] = useState([]);
  const [memberDeposits, setMemberDeposits] = useState([]);
  const [donors, setDonors] = useState([]);
  const [donorDonations, setDonorDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!poolAddress) return;

    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/1O_vtMC0Xmdz0SqRDpGcqE3Gmd4osAV3"
    );
    const poolVault = new ethers.Contract(poolAddress, abi, provider);

    async function readPoolVaultData() {
      const code = await provider.getCode(poolAddress);
      console.log(code);
      setLoading(true);
      try {
        // Fetch members and their deposits
        const [memberAddresses, deposits] =
          await poolVault.getAllMemberDeposits();
        setMembers(memberAddresses);
        setMemberDeposits(deposits);

        // Fetch donors and their donations
        const [donorAddresses, donations] =
          await poolVault.getAllDonorDonations();
        setDonors(donorAddresses);
        setDonorDonations(donations);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
      setLoading(false);
    }

    readPoolVaultData();
  }, [poolAddress]);

  return (
    <div className="w-full  mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-6 mt-8 justify-items-center items-center p-2 rounded-xl shadow">
        {/* All Members */}
        <div className="w-full">
          <AllMembers members={members} memberDeposits={memberDeposits} />
        </div>
        {/* All Donors */}
        <div className="w-full">
          <AllDonors donors={donors} donorDonations={donorDonations} />
        </div>
        {/* Add a third column here if needed */}
      </div>
    </div>
  );
};

export default ContributionInfo;
