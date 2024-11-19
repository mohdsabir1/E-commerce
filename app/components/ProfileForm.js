'use client'

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProfile } from "@/redux/profileSlice"
import { getCurrentUserId } from "@/utlis/cartUtlis"
import { useProfile } from "@/hooks/useCart"
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function ProfileForm() {
  const userId = getCurrentUserId()
  const dispatch = useDispatch()

  useProfile(userId)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const profileData = useSelector((state) => state.profile.items[userId] || [])

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [errors, setErrors] = useState({})
  const [isEditable, setIsEditable] = useState(false)

  useEffect(() => {
    if (profileData.length > 0) {
      setFormData(profileData[0])
    }
  }, [profileData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }))
    }
  }

  const validateForm = () => {
    let newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits"
    if (!formData.address1.trim()) newErrors.address1 = "Address 1 is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required"
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 6 digits"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        if (userId) {
          await dispatch(addProfile({ userId, profileData: formData }))
          console.log("Profile data submitted:", userId, formData)
          setIsEditable(false)
          setSubmitStatus('success')
        } else {
          console.log("User ID not found.")
          setSubmitStatus('error')
        }
      } catch (error) {
        console.error("Error submitting profile:", error)
        setSubmitStatus('error')
      } finally {
        setIsSubmitting(false)
      }
    } else {
      console.log("Form has errors")
    }
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setIsEditable(true)
    setSubmitStatus(null)
  }

  const renderField = (field, label) => (
    <div key={field} className="relative mb-4">
      <label
        htmlFor={field}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={field}
        type={field === "phone" || field === "pincode" ? "tel" : "text"}
        name={field}
        value={formData[field]}
        onChange={handleChange}
        disabled={!isEditable}
        className={`w-full px-3 py-2 border rounded-md shadow-sm ${
          isEditable
            ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            : "bg-gray-100 text-gray-800"
        } ${errors[field] ? "border-red-500" : ""}`}
        aria-invalid={errors[field] ? "true" : "false"}
        aria-describedby={`${field}-error`}
      />
      {errors[field] && (
        <p id={`${field}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {errors[field]}
        </p>
      )}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {isEditable ? "Edit Profile" : "Profile Details"}
      </h2>
      <form onSubmit={isEditable ? handleSubmit : handleEdit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {renderField("name", "Name")}
            {renderField("phone", "Phone")}
            {renderField("address1", "Address 1")}
            {renderField("address2", "Address 2 (Optional)")}
          </div>
          <div>
            {renderField("landmark", "Landmark (Optional)")}
            {renderField("city", "City")}
            {renderField("state", "State")}
            {renderField("pincode", "Pincode")}
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isEditable
                ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            } transition duration-150 ease-in-out`}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin mx-auto h-5 w-5" />
            ) : isEditable ? (
              "Save Changes"
            ) : (
              "Edit Profile"
            )}
          </button>
        </div>
      </form>
      {submitStatus && (
        <div className={`mt-4 p-3 rounded-md ${
          submitStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`} role="alert">
          {submitStatus === 'success' ? (
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Profile updated successfully!</span>
            </div>
          ) : (
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Error updating profile. Please try again.</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
