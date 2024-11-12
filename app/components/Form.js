"use client";

import { useState } from "react";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.address1.trim()) newErrors.address1 = "Address 1 is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Pincode must be 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log("Form submitted:", formData);
      // Here you would typically send the data to your server
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid  md:grid-cols-2 md:gap-4 md:space-x-2 mb-4">
        <div className="mb-4">
          <label
            htmlFor="address1"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address 1
          </label>
          <input
            id="address1"
            type="text"
            placeholder="m@example.com"
            value={formData.address1}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="address2"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address 2
          </label>
          <input
            id="address2"
            type="text"
            placeholder="johnDoe"
            value={formData.address2}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid  md:grid-cols-2 md:gap-4 md:space-x-2 mb-4">
        <div className="mb-4">
          <label
            htmlFor="landmark"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Landmark
          </label>
          <div className="relative">
            <input
              id="landmark"
              type="text"
              value={formData.landmark}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            City
          </label>
          <div className="relative">
            <input
              id="state"
              type="text"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
          </div>
        </div>
      </div>
<div className="grid  md:grid-cols-2 md:gap-4 md:space-x-2">
<div className="mb-4">
        <label
          htmlFor="state"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          State
        </label>
        <div className="relative">
          <input
            id="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="pincode"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Pincode
        </label>
        <div className="relative">
          <input
            id="pincode"
            type="text"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />
        </div>
      </div>
</div>
      
      <div className="mt-6">
        <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Proceed to Checkout
        </button>
      </div>
    </form>
  );
}
