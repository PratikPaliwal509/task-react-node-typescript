interface Student {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
}

interface Props {
  students: Student[];
  onDelete: (id: string) => void;
  onEdit: (student: Student) => void;
}
import { Link } from "react-router-dom";
export default function StudentList({ students, onDelete, onEdit }: Props) {
  return (
    <div className="p-4 border rounded mt-4">
      <div className="flex justify-between mb-4">
      <h2 className="text-xl font-bold mb-3 w-20">Students</h2>
      <Link to="/register" className="w-36 bg-green-500 text-white px-4 py-2 rounded">
        Create Student
      </Link>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="border">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id} className="text-center border">
              <td>{s.fullName}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.course}</td>

              <td className="space-x-2">
                <button
                  onClick={() => onEdit(s)}
                  className="bg-blue-500 text-white px-2 py-1"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(s._id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}