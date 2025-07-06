"use client";

import React from "react";
import { Heart, User, Home, LayoutDashboard, Layers } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    {
      id: "homepage",
      label: "Home",
      icon: Home,
      href: "/",
    },
    {
      id: "pool",
      label: "Pool Dashboard",
      icon: LayoutDashboard,
      href: "/pools",
    },
    {
      id: "user",
      label: "My Dashboard",
      icon: User,
      href: "/users",
    },
    {
      id: "createpool",
      label: "Create Pool",
      icon: Layers,
      href: "/create-pool",
    },
  ];

  const handleNavigation = (href) => {
    router.push(href);
  };

  return (
    <div className="fixed left-0 top-0 h-full w-70 bg-white border-r border-gray-200 z-30 font-sans">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Clirev DAO</h2>
            <p className="text-xs text-gray-600">Community Protection</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Main
          </p>
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.href)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-50 text-green-700 border-r-2 border-green-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
