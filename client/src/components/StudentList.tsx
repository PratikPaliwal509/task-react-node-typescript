import { Link } from "react-router-dom";

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

interface Props {
  students: Student[];
  onDelete: (id: string) => void;
  onEdit: (student: Student) => void;
}

export default function StudentList({ students, onDelete, onEdit }: Props) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Students
        </h2>

        <Link
          to="/register"
          className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-900 transition"
        >
          + Create Student
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead>
            <tr className="text-left border-b text-gray-600">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr
                  key={s._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 font-medium text-gray-800">
                    {s.fullName}
                  </td>

                  <td className="text-gray-600">{s.email}</td>
                  <td className="text-gray-600">{s.phone}</td>
                  <td className="text-gray-600">{s.course}</td>

                  {/* ACTIONS */}
                  <td className="text-center space-x-2">

                    <button
                      onClick={() => onEdit(s)}
                      className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(s._id!)}
                      className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}