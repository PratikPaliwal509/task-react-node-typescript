import { useEffect, useState } from "react";
import StudentList from "../components/StudentList";
import { encryptData, decryptData } from "../utils/crypto";

const API = "http://localhost:5000/api";

interface Student {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  course: string;
  password: string;
}

export default function StudentListPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState<Student | null>(null);

  // 🔹 Fetch + decrypt
  const fetchStudents = async () => {
    const res = await fetch(`${API}/students`);
    const data = await res.json();
    console.log("Encrypted Students from API:", data);
    const decrypted = data.map((item: any) => decryptData(item));
    console.log("Decrypted Students:", decrypted);
    setStudents(decrypted);
    return decrypted;
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔹 Delete
  const handleDelete = async (id: string) => {
    await fetch(`${API}/student/${id}`, {
      method: "DELETE",
    });

    fetchStudents();
  };

  // 🔹 Update
  const handleUpdate = async () => {
    if (!form || !form._id) return;

    // 🔐 encrypt BEFORE sending to backend
    const encryptedPayload = encryptData(form);
    console.log("Encrypted Payload for Update:", encryptedPayload);
    await fetch(`${API}/student/${form._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: encryptedPayload,
      }),
    });

    setForm(null);
    fetchStudents();
  };

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold">Student List</h2>

      {/* 🔥 CLEAN COMPONENT USAGE */}
      <StudentList
        students={students}
        onDelete={handleDelete}
        onEdit={(s) => setForm(s)}
      />

      {/* UPDATE FORM */}
      {form && (
        <div className="p-4 border rounded mt-4">
          <h3 className="text-lg font-bold mb-2">Update Student</h3>

          <div className="grid grid-cols-2 gap-2">
            <input
              name="fullName"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="border p-2"
            />
            <input
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border p-2"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border p-2"
            />
            <input
              name="course"
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              className="border p-2"
            />
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-3 py-1"
            >
              Update
            </button>

            <button
              onClick={() => setForm(null)}
              className="bg-gray-400 text-white px-3 py-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}