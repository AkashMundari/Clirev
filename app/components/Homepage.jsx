import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Hash,
  ChevronDown,
  Layers,
  Landmark,
  DollarSign,
} from "lucide-react";
import { ethers } from "ethers";
import StatCard from "./StatCard";
import { useRouter } from "next/navigation";
import factoryAbi from "../factoryAbi.json";

const formatBigNumber = (val, decimals = 0) => {
  if (!val) return "";
  let num;
  try {
    num = ethers.BigNumber.isBigNumber(val) ? val.toString() : val;
    num = Number(num);
  } catch {
    num = val;
  }
  if (decimals > 0) {
    return (num / Math.pow(10, decimals)).toFixed(7);
  }
  return num;
};

const PoolCard = ({ pool }) => {
  const router = useRouter();
  // Array indices as per your structure
  const stationID = pool[0];
  const poolAddress = pool[1];
  const location = pool[2];
  const latitude = formatBigNumber(pool[3], 7);
  const longitude = formatBigNumber(pool[4], 7);
  const tempLower = formatBigNumber(pool[5]);
  const tempUpper = formatBigNumber(pool[6]);
  const windLower = formatBigNumber(pool[7]);
  const windUpper = formatBigNumber(pool[8]);
  const creator = pool[9];

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col space-y-2 text-black"
      onClick={() => {
        router.push("/pools/" + poolAddress);
      }}
    >
      <div className="font-bold text-md text-green-700 break-all">
        Pool Address:
        <span className="text-sm text-gray-800 ml-2">{poolAddress}</span>
      </div>
      <div>
        <span className="font-semibold">Station ID:</span> {stationID}
      </div>
      <div>
        <span className="font-semibold">Location:</span> {location}
      </div>

      <div>
        <span className="font-semibold">Creator:</span>
        <span className="font-mono text-gray-700 ml-2">
          {creator.slice(0, 10)}...
        </span>
      </div>
      <div>
        <span className="font-semibold">Latitude:</span> {latitude}
      </div>
      <div>
        <span className="font-semibold">Longitude:</span> {longitude}
      </div>
    </div>
  );
};

const Homepage = () => {
  const sortOptions = [
    { label: "Location", value: "location", icon: MapPin },
    { label: "Pool Address", value: "poolAddress", icon: Hash },
  ];
  const factoryAddress = "0xb797601CF5D594b9DFE81caF693D500f94e6A6E3";

  const [poolsArray, setPoolsArray] = useState([]);
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/1O_vtMC0Xmdz0SqRDpGcqE3Gmd4osAV3"
    );
    const poolFactory = new ethers.Contract(
      factoryAddress,
      factoryAbi,
      provider
    );

    async function getPools() {
      const pools = await poolFactory.getAllPools();
      setPoolsArray(pools);
    }

    getPools();
  }, []);

  const [sortOption, setSortOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSortSelect = (value) => {
    setSortOption(value);
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search logic here
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="ml-70 pt-24 min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome !</h1>
        <p className="text-gray-600">
          Be a part of the community of MutualAid DAO
        </p>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Pools"
          value="1,234"
          subtitle=""
          icon={Layers}
          trend=""
        />
        <StatCard
          title="Active Locations"
          value="216"
          subtitle=""
          icon={MapPin}
          trend=""
        />
        <StatCard
          title="Total Volume"
          value="$2.5M"
          subtitle=""
          icon={DollarSign}
          trend=""
        />
        <StatCard
          title="Average TVL"
          value="$150K"
          subtitle=""
          icon={Landmark}
          trend=""
        />
      </div>

      {/* Main Search Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Search Pools</h2>
        </div>

        <div className="flex gap-3 items-center flex-wrap">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium cursor-pointer min-w-40 justify-between transition-all duration-150 border ${
                sortOption
                  ? "bg-green-700 text-white border-green-700"
                  : "bg-white text-green-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                {sortOption &&
                  (() => {
                    const selectedOption = sortOptions.find(
                      (opt) => opt.value === sortOption
                    );
                    const IconComponent = selectedOption?.icon;
                    return IconComponent ? <IconComponent size={16} /> : null;
                  })()}
                <span>
                  {sortOption
                    ? sortOptions.find((opt) => opt.value === sortOption)?.label
                    : "Sort By"}
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-150 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full rounded-xl bg-white shadow-sm border border-gray-100">
                <ul className="py-2">
                  {sortOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <li
                        key={option.value}
                        className="flex items-center gap-2 px-4 py-3 text-gray-900 cursor-pointer text-sm hover:bg-gray-50 transition-colors"
                        onClick={() => handleSortSelect(option.value)}
                      >
                        <IconComponent size={16} />
                        {option.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="flex-1 min-w-75 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearching(false);
              }}
              onKeyPress={handleKeyPress}
              placeholder={
                sortOption === "location"
                  ? "Enter location..."
                  : sortOption === "poolAddress"
                  ? "Enter pool address..."
                  : "Enter search query..."
              }
              className="w-full px-5 py-3 text-sm border border-gray-200 rounded-lg outline-none bg-white text-gray-900 transition-colors focus:border-green-700"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
            className={`flex items-center justify-center w-12 h-12 rounded-lg border-none transition-all duration-150 ${
              searchQuery.trim()
                ? "bg-green-700 text-white cursor-pointer hover:bg-green-600"
                : "bg-gray-200 text-white cursor-not-allowed"
            }`}
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Pool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {poolsArray.map((pool, idx) => (
          <PoolCard key={pool[1] || idx} pool={pool} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
