import React, { useEffect, useState } from 'react';

import Header from './componts/Header.jsx';
import FQA from './componts/FQA.jsx';
import Home from './componts/Home.jsx';
import ServicesContent from './componts/ServicesContent.jsx';
import Home2 from './componts/Home2.jsx';
import Footer from './componts/Footer.jsx';
import AboutUs from './componts/AboutUs.jsx';
import Form from './componts/Form.jsx';


import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // تعيين حالة التحميل بعد تحميل الصفحة
    const timer = setTimeout(() => setIsLoaded(true), 100); // تأخير بسيط
    return () => clearTimeout(timer); // تنظيف المؤقت
  }, []);

  return (
    <>
       <Form/>
      {/* <div className={`fade-in ${isLoaded ? 'loaded' : ''}`}>
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
        <ServicesContent />
      </div>

      <div className={`fade-in ${isLoaded ? 'loaded' : ''}`}>
        <AboutUs />
      </div>

      <div className={`fade-in ${isLoaded ? 'loaded' : ''} AApp`}>
        <Footer />
      </div> */}
    </>
  );
}

export default App;
