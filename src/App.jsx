import { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "animate.css";

// مكونات الواجهة الأمامية
import Header from "./components/Header.jsx";
import FQA from "./components/FQA.jsx";
import Home from "./components/Home.jsx";
import ServicesContent from "./components/ServicesContent.jsx";
import Home2 from "./components/Home2.jsx";
import Footer from "./components/Footer.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Form from "./components/Form.jsx";

import "./App.css";

// مكونات الأدمن
import AdminLogin from "./components/Admin/AdminLogin.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";

function App() {
  // للتحكم بعرض الفورم الخاص بالخدمة
  const [showForm, setShowForm] = useState(false);
  // حفظ نوع الخدمة المختارة من قسم الخدمات
  const [selectedService, setSelectedService] = useState("");
  // حالة تسجيل الدخول للمستخدم (العميل)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // تخزين بيانات المستخدم مثل الاسم
  const [user, setUser] = useState({ username: "" });

  // دالة لإظهار الفورم عند اختيار خدمة من قسم الخدمات
  const handleShowForm = (service) => {
    setSelectedService(service);
    setShowForm(true);
  };

  // دالة لإخفاء الفورم والعودة للواجهة الرئيسية
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedService("");
  };

  // دالة لتسجيل الدخول (مثلاً بعد إدخال بيانات العميل في فورم التسجيل)
  const handleLogin = useCallback((username) => {
    setIsAuthenticated(true);
    setUser({ username });
  }, []);

  // دالة لتسجيل الخروج
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser({ username: "" });
  };

  return (
    <Router>
      {/* إذا كان الفورم ظاهر نضيف طبقة خلفية ضبابية */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}
      <Routes>
        {/* صفحة الواجهة الرئيسية للمستخدم */}
        <Route
          path="/"
          element={
            <>
              <Header
                isAuthenticated={isAuthenticated}
                user={user}
                onLoginClick={() => setShowForm(true)}
                onLogout={handleLogout}
              />
              {!showForm ? (
                <>
                  <Home />
                  <Home2 />
                  <FQA />
                  <ServicesContent onServiceClick={handleShowForm} />
                  <AboutUs />
                  <Footer />
                </>
              ) : (
                // تمرير onLogin لتحديث حالة المستخدم عند التسجيل/تسجيل الدخول
                <div className="fixed z-50 inset-0 flex items-center justify-center">
                  <Form
                    onCloseForm={handleCloseForm}
                    selectedService={selectedService}
                    isAuthenticated={isAuthenticated}
                    onLogin={handleLogin}
                  />
                </div>
              )}
            </>
          }
        />

        {/* مسارات الأدمن ء*/}
        <Route
          path="/admin/login"
          element={<AdminLogin onLogin={handleLogin} />}
        />
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
