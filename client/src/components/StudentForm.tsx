import React from "react";
import { Link } from "react-router-dom";

export interface StudentFormData {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  course: string;
  password: string;
}

interface Props {
  form: StudentFormData;
  setForm: React.Dispatch<React.SetStateAction<StudentFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  buttonText?: string;
}

export default function StudentForm({
  form,
  setForm,
  onSubmit,
  buttonText = "Submit",
}: Props) {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-xl bg-white p-6 rounded-lg shadow-sm border space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Student Registration
        </h2>

        {/* Full Name */}
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        {/* Email */}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        {/* Phone */}
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        {/* DOB */}
        <input
          name="dob"
          value={form.dob}
          onChange={handleChange}
          type="date"
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        {/* Gender */}
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        {/* Address */}
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        {/* Course */}
        <input
          name="course"
          value={form.course}
          onChange={handleChange}
          placeholder="Course Enrolled"
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        {/* Password */}
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
        >
          {buttonText}
        </button>
<p className="text-sm text-center text-gray-600 mt-2">
  Already registered?{" "}
  <Link to="/login" className="text-gray-800 font-medium hover:underline">
    Login here
  </Link>
</p>
      </form>
    </div>
  );
}