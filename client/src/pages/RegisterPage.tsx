import React, { useState } from "react";
import type { StudentFormData } from "../components/StudentForm";
import axios from "axios";
import { encryptData } from "../utils/crypto";
import StudentForm from "../components/StudentForm";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [students, setStudents] = useState<StudentFormData[]>([]);
  const [loading, setLoading] = useState(false);

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

    // Basic validation
    if (!form.fullName || !form.email || !form.password) {
      toast.error("Please fill required fields");
      return;
    }

    if (!form.email.includes("@")) {
      toast.error("Invalid email format");
      return;
    }

    setLoading(true);

    try {
      // Encrypt form data
      const encryptedData = encryptData(form);

      const res = await axios.post("http://localhost:5000/api/register", {
        data: encryptedData,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Student Registered Successfully");

        setStudents([...students, encryptedData]);

        // reset form
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
      } else {
        toast.error(res.data?.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Error sending data:", error);

      toast.error(
        error?.response?.data?.message || "Server error during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex items-center justify-center">
      <div className="w-full">
        <StudentForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          buttonText={loading ? "Registering..." : "Register"}
        />
      </div>
    </div>
  );
}