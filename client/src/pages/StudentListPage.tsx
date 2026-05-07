import { useEffect, useState } from "react";
import StudentList from "../components/StudentList";
import { encryptData, decryptData } from "../utils/crypto";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch + decrypt
  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API}/students`);

      if (!res.ok) {
        toast.error("Failed to fetch students");
        return;
      }

      const data = await res.json();

      const decrypted = data.map((item: any) => decryptData(item));
      setStudents(decrypted);
    } catch (error) {
      console.error(error);
      toast.error("Server error while fetching students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔹 Delete
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/student/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Failed to delete student");
        return;
      }

      toast.success("Student deleted successfully!");
      fetchStudents();
    } catch (error) {
      console.error(error);
      toast.error("Server error during delete");
    }
  };

  // 🔹 Update
  const handleUpdate = async () => {
    if (!form || !form._id) {
      toast.error("Invalid update data");
      return;
    }

    setLoading(true);

    try {
      const encryptedPayload = encryptData(form);

      const res = await fetch(`${API}/student/${form._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: encryptedPayload,
        }),
      });

      if (!res.ok) {
        toast.error("Failed to update student");
        return;
      }

      toast.success("Student updated successfully!");

      setForm(null);
      fetchStudents();
    } catch (error) {
      console.error(error);
      toast.error("Server error during update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-semibold text-gray-800">
        Student List
      </h2>

      {/* LIST */}
      <StudentList
        students={students}
        onDelete={handleDelete}
        onEdit={(s) => setForm(s)}
      />

      {/* UPDATE FORM */}
      {form && (
        <div className="bg-white p-4 border rounded-md shadow-sm mt-4 space-y-3">

          <h3 className="text-lg font-semibold text-gray-700">
            Update Student
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="border p-2 rounded"
              placeholder="Full Name"
            />

            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border p-2 rounded"
              placeholder="Email"
            />

            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border p-2 rounded"
              placeholder="Phone"
            />

            <input
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              className="border p-2 rounded"
              placeholder="Course"
            />
          </div>

          <div className="flex gap-2 mt-2">

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              onClick={() => setForm(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  );
}