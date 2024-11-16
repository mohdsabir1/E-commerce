"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { getCurrentUserId } from "@/utlis/cartUtlis";
import { addProfile } from "@/redux/profileSlice";


export default function CheckoutForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

    if (!formData.name.trim()) newErrors.name = "Name requires";
    if (!formData.email.trim()) newErrors.email = "email is required";
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
      const userId = getCurrentUserId();
      if (userId) {
        dispatch(addProfile({ userId, profileData: formData }));
        console.log("Profile data submitted:", userId, formData);
      } else {
        console.log("User ID not found.");
      }
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto border p-5 rounded bg-gray-600 ">
      <div className="grid md:grid-cols-2 md:gap-4 md:space-x-2 mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white  mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="test@gmail.com."
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-4 md:space-x-2 mb-4">
        <div className="mb-4">
          <label htmlFor="address1" className="block text-sm font-medium text-white mb-1">
            Address 1
          </label>
          <input
            id="address1"
            type="text"
            name="address1"
            placeholder="Enter your address"
            value={formData.address1}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />
          {errors.address1 && <p className="text-red-500 text-sm">{errors.address1}</p>}
        </div>
        <div>
          <label htmlFor="address2" className="block text-sm font-medium text-white  mb-1">
            Address 2
          </label>
          <input
            id="address2"
            type="text"
            name="address2"
            placeholder="Apartment, suite, etc."
            value={formData.address2}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-4 md:space-x-2 mb-4">
        <div className="mb-4">
          <label htmlFor="landmark" className="block text-sm font-medium text-white  mb-1">
            Landmark
          </label>
          <input
            id="landmark"
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-white  mb-1">
            City
          </label>
          <input
            id="city"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-4 md:space-x-2">
        <div className="mb-4">
          <label htmlFor="state" className="block text-sm font-medium text-white  mb-1">
            State
          </label>
          <input
            id="state"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
        </div>
        <div>
          <label htmlFor="pincode" className="block text-sm font-medium text-white  mb-1">
            Pincode
          </label>
          <input
            id="pincode"
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />
          {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
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
