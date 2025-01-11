import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// مكونات الفرونت
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false); // التحكم بعرض الفورم
  const [isAuthenticated, setIsAuthenticated] = useState(false); // تحديد حالة تسجيل الدخول

  useEffect(() => {
    // تعيين حالة التحميل بعد تحميل الصفحة
    const timer = setTimeout(() => setIsLoaded(true), 100); // تأخير بسيط
    return () => clearTimeout(timer); // تنظيف المؤقت
  }, []);

  // دالة لإظهار الفورم عند اختيار خدمة
  const handleShowForm = () => {
    setShowForm(true);
  };

  // دالة لإخفاء الفورم والعودة للصفحة الرئيسية
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // دالة لتسجيل الدخول
  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  return (
    <Router>
      <Routes>
        {/* صفحات المستخدم العادي */}
        <Route
          path="/"
          element={
            <>
              {!showForm && (
                <>
                  <div className={`fade-in ${isLoaded ? 'loaded' : ''}`}>
                    <Header />
                  </div>

                  <div className={`fade-in ${isLoaded ? 'loaded' : ''}`}>
                    <Home />
                  </div>

                  <div className={`fade-in ${isLoaded ? 'loaded' : ''} FqaHome2`}>
                    <Home2 />
                    <FQA />
                  </div>

                  <div className={`fade-in ${isLoaded ? 'loaded' : ''}`}>
                    <ServicesContent onServiceClick={handleShowForm} />
                  </div>

                  <div className={`fade-in ${isLoaded ? 'loaded' : ''}`}>
                    <AboutUs />
                  </div>

                  <div className={`fade-in ${isLoaded ? 'loaded' : ''} AApp`}>
                    <Footer />
                  </div>
                </>
              )}

              {showForm && <Form onCloseForm={handleCloseForm} />}
            </>
          }
        />

        {/* صفحات الأدمن */}
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
