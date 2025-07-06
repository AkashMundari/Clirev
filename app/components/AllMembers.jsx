import { Users } from "lucide-react";
import { ethers } from "ethers";
const AllMembers = ({ members, memberDeposits }) => {
  const formattedDeposits = memberDeposits.map((deposit) =>
    ethers.utils.formatEther(deposit)
  );
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        All Members ({members.length})
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {members.map((address, idx) => (
          <div
            key={address}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-green-700" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {address.slice(0, 6)}...
                </p>
                <p className="text-xs text-gray-600">Member since</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-700">
                {formattedDeposits[idx]} ETH
              </p>
              <p className="text-xs text-gray-600">Contribution</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMembers;
