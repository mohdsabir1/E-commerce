'use client';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfile } from "@/redux/profileSlice";
import { getCurrentUserId } from "@/utlis/cartUtlis";
import { useProfile } from "@/hooks/useCart";
import Sidebar from "./Sidebar";

export default function CheckoutForm() {
  const userId = getCurrentUserId();
  const dispatch = useDispatch();

  // Fetch profile data using custom hook
  useProfile(userId);

  // Access profile data from the Redux store
  const profileData = useSelector((state) => state.profile.items[userId] || []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  // Populate formData with profile data if available
  useEffect(() => {
    if (profileData.length > 0) {
      setFormData(profileData[0]);
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
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
      if (userId) {
        dispatch(addProfile({ userId, profileData: formData }));
        console.log("Profile data submitted:", userId, formData);
        setIsEditable(false); // Lock form after submission
      } else {
        console.log("User ID not found.");
      }
    } else {
      console.log("Form has errors");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditable(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto p-5">
      {/* Profile Details Section */}
      <Sidebar />

      {/* Profile Form Section */}
      <form
        onSubmit={isEditable ? handleSubmit : handleEdit}
        className="space-y-6 bg-gray-600 p-5 rounded shadow-md"
      >
        {Object.keys(formData).map((field) => (
          <div key={field} className="mb-4">
            <label
              htmlFor={field}
              className="block text-sm font-medium text-white mb-1"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              disabled={!isEditable}
              className={`w-full px-3 py-2 border rounded-md shadow-sm ${
                isEditable
                  ? "border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800"
                  : "bg-gray-200 text-gray-500"
              }`}
            />
            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}
          </div>
        ))}
        <div className="mt-6">
          <button
            type="submit"
            className={`w-full py-2 rounded ${
              isEditable
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isEditable ? "Submit" : "Edit Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
