import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const AdminLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "1234";

    if (email === adminEmail && password === adminPassword) {
      onLogin();
      navigate("/admin/dashboard");
    } else {
      setErrorMessage("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 lg:p-20 xl:p-32">
      <form 
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md lg:max-w-lg xl:max-w-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Header */}
        <h1 className="text-2xl lg:text-3xl font-bold text-center mb-6 text-gray-700">تسجيل دخول خاص بل أدمن</h1>
        
        {/* Email Input */}
        <div className="mb-4 relative">
          <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-500" />
          <input
            type="email"
            placeholder="Enter Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg lg:text-xl"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-500" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg lg:text-xl"
          />
        </div>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm lg:text-base text-center mb-4">{errorMessage}</p>}

        {/* Login Button */}
        <button 
          type="button" 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-lg lg:text-xl"
          onClick={handleLogin}
        >
          تسجيل الدخول
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
