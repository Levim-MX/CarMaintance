import React from 'react';
import { useNavigate } from 'react-router-dom'; // استدعاء useNavigate للتوجيه

import './Header.css';
import '../App.css';

const Header = () => {
  const navigate = useNavigate(); // Hook للتوجيه

  // دالة للتمرير السلس
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (


    


    <header className="HeaderBar"  id='HeaderBar'>
      <a href="#" className="logo">CarFix.</a>
      
      <nav className="navbar">
        <a href="#" className="activ" onClick={() => scrollToSection('Home')}>Home</a>
        <a href="#" onClick={() => scrollToSection('About')}>About</a>
        <a href="#" onClick={() => scrollToSection('Services')}>Services</a>
        <a href="#" onClick={() => scrollToSection('footer')}>Contact</a>
        <button
          className="admin-login-btn"
          onClick={() => navigate('/admin/login')} // التوجيه إلى صفحة تسجيل الأدمن
        >
          Admin Login
        </button>
      </nav>
    </header>
    
  );
};

export default Header;
