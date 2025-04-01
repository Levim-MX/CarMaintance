import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa1, fa2, fa3 } from '@fortawesome/free-solid-svg-icons';

function Home2() {
  return (
    <section 
      id="howItWork" 
      className="relative top-[13em] left-[40%] -translate-x-1/2 flex flex-col items-center gap-20"
    >
      {/* Heading */}
      <div id="heading" className="w-full text-center">
        <h2 className="text-2xl mb-8">خطوات حجز موعد للصيانة</h2>
      </div>
      
      {/* Cards Container */}
      <div className="cardCountinar flex flex-wrap gap-32 justify-center">
        {/* Card 1 */}
        <div className="card flex flex-col items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.15)] bg-[#519bdc31] rounded-[30px] py-[10px] px-[20px]">
          <span className="text-[#278de9] text-[4em]">
            <FontAwesomeIcon icon={fa1} />
          </span>
          <h1 className="text-xl font-semibold">اختر الخدمة</h1>
          <p className="text-black text-[20px] p-4 text-center">
            اختر الخدمة التي تحتاجها مثلاً تبديل زيت
            <br />
            تغيير إطارات أو تنظيف السيارة ..
          </p>
        </div>
        {/* Card 2 */}
        <div className="card flex flex-col items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.15)] bg-[#519bdc31] rounded-[30px] py-[10px] px-[20px]">
          <span className="text-[#278de9] text-[4em]">
            <FontAwesomeIcon icon={fa2} />
          </span>
          <h1 className="text-xl font-semibold">املاء البيانات</h1>
          <p className="text-black text-[20px] p-4 text-center">
            عند الضغط على الخدمة سوف تظهر قائمة تتضمن
            <br />
            بعض المعلومات التي يجب إدخالها
            <br />
            مثل موديل السيارة، رقم الجوال، تحديد الفرع...
          </p>
        </div>
        {/* Card 3 */}
        <div className="card flex flex-col items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.15)] bg-[#519bdc31] rounded-[30px] py-[10px] px-[20px]">
          <span className="text-[#278de9] text-[4em]">
            <FontAwesomeIcon icon={fa3} />
          </span>
          <h1 className="text-xl font-semibold">أرسل المعلومات</h1>
          <p className="text-black text-[20px] p-4 text-center">
            بعد ملء المعلومات وإرسالها سوف يقوم فريقنا
            <br />
            بالاتصال عليك لتأكيد الحجز
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home2;
