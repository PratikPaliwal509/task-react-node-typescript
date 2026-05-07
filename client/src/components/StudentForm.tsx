import React from "react";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Student Registration</h2>

      <input
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full border p-2 rounded"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        className="w-full border p-2 rounded"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full border p-2 rounded"
      />

      <input
        name="dob"
        value={form.dob}
        onChange={handleChange}
        type="date"
        className="w-full border p-2 rounded"
      />

      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full border p-2 rounded"
      />

      <input
        name="course"
        value={form.course}
        onChange={handleChange}
        placeholder="Course Enrolled"
        className="w-full border p-2 rounded"
      />

      <input
        name="password"
        value={form.password}
        onChange={handleChange}
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {buttonText}
      </button>
    </form>
  );
}