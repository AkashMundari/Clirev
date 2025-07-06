import { Heart } from "lucide-react";

const Navbar = () => {
  return (
    <div className="ml-70  bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-18">
      <div className="text-black font-bold text-lg bg-green-700 p-2 rounded-lg">
        <Heart className="w-5 h-5 text-white" />
      </div>
      <div className="flex space-x-4 text-black">
        <h1>Account</h1>
      </div>
    </div>
  );
};

export default Navbar;
