import React from 'react';

function Home() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="w-full max-w-[2420px] mx-auto min-h-[850px] flex items-center rounded-[5em] bg-[url('/images/Background-home.png')] bg-cover bg-no-repeat bg-left shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
    >
      <div className="p-2 ml-40 justify-center">
        <h1 
          className="rounded-[25px] mb-4 p-2 text-[#278de9] text-2xl  bg-[rgba(230, 195, 195, 0.11)] 
                     sm:text-1xl md:text-2xl lg:text-2xl"
        >
          كارفكس الوكيل الحصري في العراق لصيانة المركبات
        </h1>
        <p className="text-xl sm:text-2xl md:text-2xl lg:text-sm  mb-6 ml-12">
          خدماتنا تشمل صيانة كافة اجزاء السيارة ,بأحدث الأجهزة وبأيادي محترفة ومتمرسة
        </p>
        <div className="mt-5 p-2 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 ">
          <a 
            href="#"
            onClick={() => scrollToSection('Services')}
            className="inline-block bg-[#278ee9f3] text-white text-sm font-semibold rounded-lg px-4 py-2 shadow-md transition-transform duration-300 hover:scale-110 hover:bg-[#2962b3fe]"
          >
            تعرف على خدماتنا
          </a>
          <a 
            href="#contact"
            onClick={() => scrollToSection('footer')}
            className="inline-block bg-[#278ee9f3] text-white text-sm font-semibold rounded-lg px-4 py-2 shadow-md transition-transform duration-300 hover:scale-110 hover:bg-[#2962b3fe]"
          >
            تواصل معنا
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;
