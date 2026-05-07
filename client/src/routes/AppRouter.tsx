import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
// import StudentPage from "../pages/StudentPage";

import RegisterPage from "../pages/RegisterPage";
import StudentListPage from "../pages/StudentListPage";
export default function AppRouter() {
    const isLoggedIn = localStorage.getItem("auth");

    return (
        <BrowserRouter>
            <Routes>

                {/* Login */}
                <Route path="/" element={<StudentListPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Route */}
                {/* <Route
          path="/"
          element={
            isLoggedIn ? <StudentPage /> : <Navigate to="/login" />
          }
        /> */}

            </Routes>
        </BrowserRouter>
    );
}