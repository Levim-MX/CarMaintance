import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, user, onLoginClick, onLogout }) => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full bg-[#fff6f8] px-4 sm:px-8 md:px-[10%] py-4 flex flex-col sm:flex-row justify-between items-center shadow-md">
      <a 
        href="#" 
        className="text-[#278de9] text-2xl sm:text-4xl font-bold mb-2 sm:mb-0"
      >
        CarFix.
      </a>

      <nav className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <a 
          href="#"
          onClick={() => scrollToSection('Home')}
          className="text-[#278ee9bf] text-base sm:text-lg font-medium transition-transform duration-300 hover:scale-110 hover:text-[#278de9]"
        >
          Home
        </a>
        <a 
          href="#"
          onClick={() => scrollToSection('About')}
          className="text-[#278ee9bf] text-base sm:text-lg font-medium transition-transform duration-300 hover:scale-110 hover:text-[#278de9]"
        >
          About
        </a>
        <a 
          href="#"
          onClick={() => scrollToSection('Services')}
          className="text-[#278ee9bf] text-base sm:text-lg font-medium transition-transform duration-300 hover:scale-110 hover:text-[#278de9]"
        >
          Services
        </a>
        <a 
          href="#"
          onClick={() => scrollToSection('footer')}
          className="text-[#278ee9bf] text-base sm:text-lg font-medium transition-transform duration-300 hover:scale-110 hover:text-[#278de9]"
        >
          Contact
        </a>

        {!isAuthenticated ? (
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button 
              className="mt-2 sm:mt-0 px-3 py-2 bg-[#278de9] text-white text-base sm:text-lg font-semibold rounded transition-all duration-300 hover:bg-[#0966b7] hover:scale-105 animate__animated animate__pulse"
              onClick={onLoginClick}
            >
              Login
            </button>
            <button 
              className="mt-2 sm:mt-0 px-3 py-2 bg-green-600 text-white text-base sm:text-lg font-semibold rounded transition-all duration-300 hover:bg-green-700 hover:scale-105"
              onClick={onLoginClick}

            >
              Register
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="text-base sm:text-lg font-medium">
              Hello, {user.username}
            </span>
            <button 
              className="mt-2 sm:mt-0 px-3 py-2 bg-red-600 text-white text-base sm:text-lg font-semibold rounded transition-all duration-300 hover:bg-red-700 hover:scale-105"
              onClick={onLogout}
            >
              Sign Out
            </button>
          </div>
        )}

        <button 
          className="mt-2 sm:mt-0 ml-0 sm:ml-5 px-3 py-2 bg-[#278de9] text-white text-base sm:text-lg font-semibold rounded transition-all duration-300 hover:bg-[#0966b7] hover:scale-105"
          onClick={() => navigate('/admin/login')}
        >
          Admin Login
        </button>
      </nav>
    </header>
  );
};

export default Header;
