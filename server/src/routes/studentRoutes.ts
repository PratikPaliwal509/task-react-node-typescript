import express from "express";
import {
  registerStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  loginStudent
} from "../controllers/studentController";

const router = express.Router();
console.log("studentRoutes loaded") // Debug log to confirm route loading 
router.post("/register", registerStudent);
router.get("/students", getStudents);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);
router.post("/login", loginStudent);

export default router;