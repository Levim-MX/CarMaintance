import React from 'react';

function ServicesContent({ onServiceClick }) {
  return (
    <section 
      id="Services" 
      className="mt-[20em] relative top-[30em] flex flex-col items-center gap-[100px] mb-[10em]"
    >
      {/* عنوان القسم */}
      <div className="heading font-bold text-2xl">
        <h1>خدمات الصيانة</h1>
      </div>

      {/* حاوية الخدمات */}
      <div 
        id="serverice-continar" 
        className="grid grid-cols-3 gap-2 gap-y-[60px] w-full md:w-[100%] mr-24 mt-40"
      >
        {/* صيانة المحرك */}
        <div 
          className="box ml-16 w-[450px] h-[450px] bg-[#fff6f8] rounded-lg p-[10px] border-2 border-[#4386c163] flex flex-col items-center justify-center shadow-[1px_4px_5px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:border-[3px] hover:border-[#278ee9c2]"
        >
          <img 
            src="/images/audiCarEngin.jpg" 
            alt="صيانة المحرك" 
            className="p-[3px] w-full h-[350px] object-cover" 
          />
          <button 
            className="btn py-2 px-4 mt-10 font-normal text-[22px] bg-[#3694e6cf] rounded-[20px] text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:bg-[#278ee9f3]"
            onClick={() => onServiceClick("Engine Maintenance")}
          >
            صيانة المحرك
          </button>
        </div>

        {/* تبديل زيت وفلاتر السيارة */}
        <div 
          className="box ml-16 w-[450px] h-[450px] bg-[#fff6f8] rounded-lg p-[10px] border-2 border-[#4386c163] flex flex-col items-center justify-center shadow-[1px_4px_5px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:border-[3px] hover:border-[#278ee9c2]"
        >
          <img 
            src="/images/oilChange.jpg" 
            alt="تبديل الزيت" 
            className="p-[3px] w-full h-[350px] object-cover" 
          />
          <button 
            className="btn py-2 px-4 mt-10 font-normal text-[22px] bg-[#3694e6cf] rounded-[20px] text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:bg-[#278ee9f3]"
            onClick={() => onServiceClick("Oil Change")}
          >
            تبديل زيت وفلاتر السيارة
          </button>
        </div>

        {/* تبديل بستم المحرك */}
        <div 
          className="box ml-16 w-[450px] h-[450px] bg-[#fff6f8] rounded-lg p-[10px] border-2 border-[#4386c163] flex flex-col items-center justify-center shadow-[1px_4px_5px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:border-[3px] hover:border-[#278ee9c2]"
        >
          <img 
            src="/images/part2.png" 
            alt="تبديل بستم المحرك" 
            className="p-[3px] w-full h-[290px] object-cover" 
          />
          <button 
            className="btn py-2 px-4 mt-10 font-normal text-[22px] bg-[#3694e6cf] rounded-[20px] text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:bg-[#278ee9f3]"
            onClick={() => onServiceClick("Piston Change")}
          >
            تبديل بستم المحرك
          </button>
        </div>

        {/* صيانة الإطارات */}
        <div 
          className="box ml-16 w-[450px] h-[450px] bg-[#fff6f8] rounded-lg p-[10px] border-2 border-[#4386c163] flex flex-col items-center justify-center shadow-[1px_4px_5px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:border-[3px] hover:border-[#278ee9c2]"
        >
          <img 
            src="/images/audiCarWheel.jpeg" 
            alt="صيانة الإطارات" 
            className="p-[3px] w-full h-[350px] object-cover" 
          />
          <button 
            className="btn py-2 px-4 mt-10 font-normal text-[22px] bg-[#3694e6cf] rounded-[20px] text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:bg-[#278ee9f3]"
            onClick={() => onServiceClick("Tire Maintenance")}
          >
            صيانة الإطارات
          </button>
        </div>

        {/* فحص وتبديل البطارية */}
        <div 
          className="box ml-16 w-[450px] h-[450px] bg-[#fff6f8] rounded-lg p-[10px] border-2 border-[#4386c163] flex flex-col items-center justify-center shadow-[1px_4px_5px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:border-[3px] hover:border-[#278ee9c2]"
        >
          <img 
            src="/images/car battrey.jpg" 
            alt="فحص وتبديل البطارية" 
            className="p-[3px] w-full h-[350px] object-cover" 
          />
          <button 
            className="btn py-2 px-4 mt-10 font-normal text-[22px] bg-[#3694e6cf] rounded-[20px] text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:bg-[#278ee9f3]"
            onClick={() => onServiceClick("Battery Replacement")}
          >
            فحص وتبديل البطارية
          </button>
        </div>

        {/* غسل وتنظيف السيارة */}
        <div 
          className="box ml-16 w-[450px] h-[450px] bg-[#fff6f8] rounded-lg p-[10px] border-2 border-[#4386c163] flex flex-col items-center justify-center shadow-[1px_4px_5px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:border-[3px] hover:border-[#278ee9c2]"
        >
          <img 
            src="/images/carWashinggg.jpg" 
            alt="غسل السيارة" 
            className="p-[3px] w-full h-[350px] object-cover" 
          />
          <button 
            className="btn py-2 px-4 mt-10 font-normal text-[22px] bg-[#3694e6cf] rounded-[20px] text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:bg-[#278ee9f3]"
            onClick={() => onServiceClick("Car Washing")}
          >
            غسل وتنظيف السيارة
          </button>
       
        </div>

        {/* إصلاح أنظمة الكهرباء */}
        <div 
          className="box ml-16 w-[450px] h-[450px] bg-[#fff6f8] rounded-lg p-[10px] border-2 border-[#4386c163] flex flex-col items-center justify-center shadow-[1px_4px_5px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:border-[3px] hover:border-[#278ee9c2]"
        >
          <img 
            src="/images/wiers.jpg" 
            alt="إصلاح أنظمة الكهرباء" 
            className="p-[3px] w-full h-[350px] object-cover" 
          />
          <button 
            className="btn py-2 px-4 mt-10 font-normal text-[22px] bg-[#3694e6cf] rounded-[20px] text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:bg-[#278ee9f3]"
            onClick={() => onServiceClick("Electrical System Repair")}
          >
            إصلاح أنظمة الكهرباء
          </button>
          
        </div>

        {/* صيانة المكابح */}
        <div 
          className="box ml-16 w-[450px] h-[450px] bg-[#fff6f8] rounded-lg p-[10px] border-2 border-[#4386c163] flex flex-col items-center justify-center shadow-[1px_4px_5px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:border-[3px] hover:border-[#278ee9c2]"
        >
          <img 
            src="/images/640px-Bremsanlage.jpg" 
            alt="صيانة المكابح" 
            className="p-[3px] w-full h-[350px] object-cover" 
          />
          <button 
            className="btn py-2 px-4 mt-10 font-normal text-[22px] bg-[#3694e6cf] rounded-[20px] text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-[5px_6px_30px_rgba(0,0,0,0.35)] hover:bg-[#278ee9f3]"
            onClick={() => onServiceClick("Brake Maintenance")}
          >
            صيانة المكابح
          </button>
         
        </div>
      </div>
    </section>
  );
}

export default ServicesContent;
