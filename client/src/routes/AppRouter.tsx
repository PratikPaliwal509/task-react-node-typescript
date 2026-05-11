import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StudentListPage from "../pages/StudentListPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            localStorage.getItem("auth") === "true" ? (
              <StudentListPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Register */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
                
        {/* Login */}
        {/* <Route
          path="/login"
          element={
            localStorage.getItem("auth") !== "true" ? (
              <LoginPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}