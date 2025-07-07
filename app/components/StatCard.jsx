import { TrendingUp } from "lucide-react";

const StatCard = ({ title, value, subtitle, icon: Icon }) => (
  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow duration-150">
    <div className="flex items-center justify-between mb-3">
      <div className="p-2 bg-green-50 rounded-lg">
        <Icon className="w-5 h-5 text-green-700" />
      </div>
      
    </div>
    <div className="mb-1">
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-900">{title}</p>
    </div>
    {subtitle && <p className="text-xs text-gray-600 mt-1">{subtitle}</p>}
  </div>
);

export default StatCard;
