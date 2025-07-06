const TopContributors = ({ members }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Top Contributors
      </h3>
      <div className="space-y-4">
        {members.slice(0, 5).map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900 text-sm">
                {member.address}
              </p>
              <p className="text-xs text-gray-600">Joined {member.joinDate}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-700">
                {member.contribution} ETH
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributors;
