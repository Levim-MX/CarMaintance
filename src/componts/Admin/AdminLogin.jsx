import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const AdminLogin = ({ onLogin }) => {
  const navigate = useNavigate(); // Hook للتوجيه
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    // بيانات الدخول الافتراضية
    const adminEmail = "admin@gmail.com";
    const adminPassword = "1234";

    if (email === adminEmail && password === adminPassword) {
      onLogin(); // تحديث حالة تسجيل الدخول
      navigate("/admin/dashboard"); // الانتقال إلى صفحة الداشبورد
    } else {
      // عرض رسالة خطأ عند إدخال بيانات خاطئة
      setErrorMessage("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
    }
  };

  return (
    <div className="container">
      <form className="theFormCountinar" onSubmit={(e) => e.preventDefault()}>
        {/* Header form */}
        <div className="headerForm">
          <h1>تسجيل دخول خاص بل أدمن</h1>
        </div>
        {/* Mid form */}
        <div className="midForm">
          <div>
            <input
              type="email"
              placeholder="Enter Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // تحديث البريد الإلكتروني
              required
            />
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // تحديث كلمة المرور
              required
            />
            <FontAwesomeIcon icon={faLock} className="icon" />
          </div>
        </div>
        {/* Footer form */}
        <div className="footerForm">
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* رسالة الخطأ */}
          <button type="button" className="loginBtn" onClick={handleLogin}>
            تسجيل الدخول
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
