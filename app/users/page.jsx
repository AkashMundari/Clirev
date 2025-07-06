"use client";
import { useState } from "react";
import UserStats from "../components/UserStats";

const userPools = [
  {
    id: 1,
    name: "Phoenix Heat Relief Pool",
    contribution: 2.5,
    status: "Active",
    members: 180,
  },
  {
    id: 2,
    name: "Flood Protection DAO",
    contribution: 1.8,
    status: "Active",
    members: 95,
  },
  {
    id: 3,
    name: "Drought Relief Network",
    contribution: 0.0,
    donation: 1.2,
    status: "Donated",
    members: 150,
  },
];

const UserDashboard = () => {
  const [userDashboardTab, setUserDashboardTab] = useState("members");
  return (
    <div className="ml-70 pt-18 min-h-screen bg-gray-50 font-sans">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600">
            Track your contributions and protection coverage
          </p>
        </div>

        {/* User Stats */}
        <UserStats />

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setUserDashboardTab("members")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  userDashboardTab === "members"
                    ? "border-green-700 text-green-700"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                My Memberships
              </button>
              <button
                onClick={() => setUserDashboardTab("donations")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  userDashboardTab === "donations"
                    ? "border-green-700 text-green-700"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                My Donations
              </button>
            </nav>
          </div>

          <div className="p-6">
            {userDashboardTab === "members" ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Active Memberships
                </h3>
                {userPools
                  .filter((pool) => pool.contribution > 0)
                  .map((pool) => (
                    <div
                      key={pool.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {pool.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {pool.members} total members
                          </p>
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {pool.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-700">
                            {pool.contribution} ETH
                          </p>
                          <p className="text-sm text-gray-600">
                            My contribution
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  My Donations
                </h3>
                {userPools
                  .filter((pool) => pool.donation)
                  .map((pool) => (
                    <div
                      key={pool.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-pink-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {pool.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {pool.members} total members
                          </p>
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                              Donated
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-pink-700">
                            {pool.donation} ETH
                          </p>
                          <p className="text-sm text-gray-600">
                            Donation amount
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
