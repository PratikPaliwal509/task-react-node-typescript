import React, { useState } from "react";
// import StudentForm, { Studz entFormData } from "../components/StudentForm";
import type { StudentFormData } from "../components/StudentForm";

  import axios from "axios";
import { encryptData } from "../utils/crypto";

import StudentForm from "../components/StudentForm";

export default function RegisterPage() {
  const [students, setStudents] = useState<StudentFormData[]>([]);

  const [form, setForm] = useState<StudentFormData>({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    course: "",
    password: "",
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // 🔐 Encrypt form data
  const encryptedData = encryptData(form);
console.log("Encrypted Data:", encryptedData);
  try {
    const res = await axios.post("http://localhost:5000/api/register", {
      data: encryptedData,
    });
console.log("Encrypted Data Sent:", encryptedData);
    console.log("Response:", res.data);

    // store locally only if backend success
    setStudents([...students, encryptedData]);

    setForm({
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      address: "",
      course: "",
      password: "",
    });
  } catch (error) {
    console.error("Error sending data:", error);
  }
};
  return (
    <div className="p-6 space-y-8">
      <StudentForm form={form} setForm={setForm} onSubmit={handleSubmit} />

    </div>
  );
}