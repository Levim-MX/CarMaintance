import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-[#282828] text-[#f0f0f0] py-5 mt-[60em]">
      {/* الحاوية الرئيسية للـ Footer */}
      <div className="footer-container flex justify-between flex-wrap gap-5 px-[15px] max-w-[1200px] mx-auto">
        {/* شعار الموقع ونص تعريفي */}
        <div className="footer-logo">
          <h2 className="text-2xl font-bold text-[#f0f0f0]">CarFix</h2>
          <p className="text-sm">Providing quality services since 2010.</p>
        </div>

        {/* روابط سريعة */}
        <div className="footer-links">
          <h3 className="mb-4 font-semibold">Quick Links</h3>
          <ul className="list-none p-0">
            <li className="my-1">
              <a 
                onClick={() => scrollToSection('HeaderBar')} 
                className="cursor-pointer text-[#f0f0f0] transition-colors duration-300 hover:text-[#ff6600]"
              >
                Home
              </a>
            </li>
            <li className="my-1">
              <a 
                onClick={() => scrollToSection('About')} 
                className="cursor-pointer text-[#f0f0f0] transition-colors duration-300 hover:text-[#ff6600]"
              >
                About
              </a>
            </li>
            <li className="my-1">
              <a 
                onClick={() => scrollToSection('Services')} 
                className="cursor-pointer text-[#f0f0f0] transition-colors duration-300 hover:text-[#ff6600]"
              >
                Services
              </a>
            </li>
            <li className="my-1">
              <a 
                onClick={() => scrollToSection('contact')} 
                className="cursor-pointer text-[#f0f0f0] transition-colors duration-300 hover:text-[#ff6600]"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* روابط التواصل الاجتماعي */}
        <div className="footer-social">
          <h3 className="mb-4 font-semibold">Follow Us</h3>
          <div className="social-icons flex space-x-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              className="text-[#f0f0f0] transition-colors duration-300 hover:text-[#ff6600]"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-xl" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter"
              className="text-[#f0f0f0] transition-colors duration-300 hover:text-[#ff6600]"
            >
              <FontAwesomeIcon icon={faTwitter} className="text-xl" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="text-[#f0f0f0] transition-colors duration-300 hover:text-[#ff6600]"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-xl" />
            </a>
          </div>
        </div>
      </div>
      {/* الجزء السفلي من Footer */}
      <div className="footer-bottom text-center mt-5">
        <p className="text-[0.9rem] md:text-sm lg:text-base ml-40 md:ml-0 mt-12 md:mt-4">
          &copy; 2024 CarFix. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
