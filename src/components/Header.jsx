/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ({ isAuthenticated, user, onLoginClick, onLogout }) => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'هل تريد تسجيل الخروج؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'نعم، تسجيل الخروج',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout(); // تنفيذ عملية تسجيل الخروج
        Swal.fire({
          icon: 'success',
          title: 'تم تسجيل الخروج بنجاح',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#ffffff] px-4 sm:px-8 md:px-[10%] py-4 shadow-md">
      <div className="flex justify-between items-center">
        <a
          href="#"
          className="text-[#278de9] text-2xl sm:text-4xl font-bold"
        >
          CarFix.
        </a>
        <button
          className="sm:hidden text-2xl text-[#278de9]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <nav
        className={`${menuOpen ? 'flex' : 'hidden'} flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0`}
      >
        <a
          href="#"
          onClick={() => {
            scrollToSection('Home');
            setMenuOpen(false);
          }}
          className="text-[#278ee9bf] text-base sm:text-lg font-medium transition-transform duration-300 hover:scale-110 hover:text-[#278de9]"
        >
          Home
        </a>
        <a
          href="#"
          onClick={() => {
            scrollToSection('About');
            setMenuOpen(false);
          }}
          className="text-[#278ee9bf] text-base sm:text-lg font-medium transition-transform duration-300 hover:scale-110 hover:text-[#278de9]"
        >
          About
        </a>
        <a
          href="#"
          onClick={() => {
            scrollToSection('Services');
            setMenuOpen(false);
          }}
          className="text-[#278ee9bf] text-base sm:text-lg font-medium transition-transform duration-300 hover:scale-110 hover:text-[#278de9]"
        >
          Services
        </a>
        <a
          href="#"
          onClick={() => {
            scrollToSection('footer');
            setMenuOpen(false);
          }}
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
              onClick={handleLogout}
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
