import React from 'react';

import './Header.css';
import '../App.css';

const Header = () => {
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
      </nav>
    </header>
    
  );
};

export default Header;
