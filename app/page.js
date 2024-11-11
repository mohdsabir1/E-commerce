"use client";
import { useState } from "react";
import BestSeller from "./components/BestSeller";
import FeaturedProduct from "./components/FeaturedProduct";
import HomeBanner from "./components/Homebanner";

export default function Home() {
  // State to manage which section is active (BestSeller or FeaturedProduct)
  const [activeTab, setActiveTab] = useState("bestseller");

  // Handle click to toggle between sections
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <HomeBanner />
      <div className=" mt-14 max-w-6xl mx-auto ">
        {/* Tab buttons */}
        <div className="space-x-4 mb-2 flex items-center">
          <button
            onClick={() => handleTabChange("bestseller")}
            className={`py-1 md:py-2 px-2  md:px-4 md:text-lg text-xs rounded-md font-semibold ${
              activeTab === "bestseller"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Best Seller
          </button>
          <button
            onClick={() => handleTabChange("featured")}
            className={`py-1 md:py-2 px-2  md:px-4 md:text-lg text-xs rounded-md font-semibold ${
              activeTab === "featured"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Featured Products
          </button>
        </div>
        <hr />
        {/* Conditional rendering based on activeTab */}
        {activeTab === "bestseller" ? <BestSeller /> : <FeaturedProduct />}
      </div>
    </div>
  );
}
