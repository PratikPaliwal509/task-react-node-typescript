import { Request, Response } from "express";
import Student from "../models/Student";
import { encrypt, decrypt, decryptFrontend } from "../utils/crypto";

// CREATE
export const registerStudent = async (req: Request, res: Response) => {
  try {
    const data = req.body.data;

    // Level 2 encryption
    const encryptedData: any = {};
    for (let key in data) {
      encryptedData[key] = encrypt(data[key]);
    }

    const student = await Student.create(encryptedData);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: "Error creating student" });
  }
};

// READ
export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();

    const decrypted = students.map((student: any) => {
      const obj: any = {};

      for (let key in student._doc) {
        if (key === "_id" || key === "__v") {
          obj[key] = student[key];
        } else {
          const value = student[key];

          // ✅ FIX: check before decrypting
          if (typeof value === "string") {
            obj[key] = decrypt(value);
          } else {
            obj[key] = value;
          }
        }
      }

      return obj;
    });

    res.json(decrypted);
  } catch (err) {
    res.status(500).json({ error: "Error fetching students" });
  }
};

// UPDATE
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const encryptedData: any = {};
    // for (let key in req.body) {
    //   encryptedData[key] = encrypt(req.body[key]);
    // }
    const data = req.body.payload;
    for (let key in data) {
      if (key === "_id") continue; // ❌ NEVER encrypt or update _id

      encryptedData[key] = encrypt(data[key]);
    }

    const updated = await Student.findByIdAndUpdate(id, encryptedData, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating student" });
  }
};

// DELETE
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting student" });
  }
}; export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body.data;
    const students = await Student.find();

    const matchedStudent = students.find((student: any) => {
      try {
        const frontendEncryptedEmail = decrypt(student.email);
        const frontendEncryptedPassword = decrypt(student.password);

        const storedEmail = decryptFrontend(frontendEncryptedEmail);
        const storedPassword = decryptFrontend(frontendEncryptedPassword);

        const loginEmail = decryptFrontend(email);
        const loginPassword = decryptFrontend(password);

        return storedEmail === loginEmail && storedPassword === loginPassword;
      } catch (err) {
        return false;
      }
    });

    if (!matchedStudent) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const safeStudent = {
      _id: matchedStudent._id,
      fullName: decryptFrontend(decrypt(matchedStudent.fullName)),
      email: decryptFrontend(decrypt(matchedStudent.email)),
      phone: decryptFrontend(decrypt(matchedStudent.phone)),
      dob: decryptFrontend(decrypt(matchedStudent.dob)),
      gender: decryptFrontend(decrypt(matchedStudent.gender)),
      address: decryptFrontend(decrypt(matchedStudent.address)),
      course: decryptFrontend(decrypt(matchedStudent.course)),
    };

    return res.status(200).json({
      message: "Login successful",
      student: safeStudent,
    });
  } catch (err) {
    return res.status(500).json({ error: "Error during login" });
  }
};