import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'animate.css';

// مكونات الواجهة الأمامية
import Header from './componts/Header.jsx';
import FQA from './componts/FQA.jsx';
import Home from './componts/Home.jsx';
import ServicesContent from './componts/ServicesContent.jsx';
import Home2 from './componts/Home2.jsx';
import Footer from './componts/Footer.jsx';
import AboutUs from './componts/AboutUs.jsx';
import Form from './componts/Form.jsx';
import './App.css';

// مكونات الأدمن
import AdminLogin from './componts/Admin/AdminLogin.jsx';
import AdminDashboard from './componts/Admin/AdminDashboard.jsx';

function App() {
  // حالة تحميل الصفحة
  const [isLoaded, setIsLoaded] = useState(false);
  // للتحكم بعرض الفورم الخاص بالخدمة
  const [showForm, setShowForm] = useState(false);
  // حفظ نوع الخدمة المختارة من قسم الخدمات
  const [selectedService, setSelectedService] = useState("");
  // حالة تسجيل الدخول للمستخدم (العميل)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // تخزين بيانات المستخدم مثل الاسم
  const [user, setUser] = useState({ username: "" });

  useEffect(() => {
    // تعيين حالة التحميل بعد تأخير بسيط
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
                  <ServicesContent onServiceClick={handleShowForm} />
                  <AboutUs />
                  <Footer />
                </>
              ) : (
                // تمرير onLogin لتحديث حالة المستخدم عند التسجيل/تسجيل الدخول
                <Form
                  onCloseForm={handleCloseForm}
                  selectedService={selectedService}
                  isAuthenticated={isAuthenticated}
                  onLogin={handleLogin}
                />
              )}
            </>
          }
        />

        {/* مسارات الأدمن */}
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
