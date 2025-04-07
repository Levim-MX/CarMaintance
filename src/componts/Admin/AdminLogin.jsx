import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // بيانات تسجيل الدخول الافتراضية
  const adminEmail = "admin@gmail.com";
  const adminPassword = "1234";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
      Swal.fire({
        icon: "success",
        title: "مرحباً بعودتك!",
         text: "تم تسجيل الدخول بنجاح. يرجى الانتظار قليلاً للدخول إلى لوحة التحكم.",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 5000,
      }).then(() => {
        onLogin(); // تحديث حالة تسجيل الدخول
        navigate("/admin/dashboard"); // الانتقال إلى صفحة الداشبورد
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "فشل تسجيل الدخول",
        text: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
        confirmButtonText: "حسناً",
        
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          تسجيل دخول خاص بل أدمن
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FontAwesomeIcon icon={faEnvelope} className="absolute  right-3 top-3 text-gray-500" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon icon={faLock} className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 font-medium"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;