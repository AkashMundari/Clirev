import { Users, Heart, Wallet, Gift } from "lucide-react";
import StatCard from "./StatCard";

const UserStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="My Total Contribution"
        value="4.3 ETH"
        subtitle="Across all pools"
        icon={Wallet}
        trend=""
      />
      <StatCard
        title="Member of Pools"
        value="2"
        subtitle="Active memberships"
        icon={Users}
        trend=""
      />
      <StatCard
        title="Total Donations"
        value="1.2 ETH"
        subtitle="Community support"
        icon={Gift}
        trend=""
      />
      <StatCard
        title="Protection Status"
        value="Active"
        subtitle="Coverage enabled"
        icon={Heart}
        trend=""
      />
    </div>
  );
};

export default UserStats;
