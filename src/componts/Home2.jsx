import React from 'react';
import './Home2.css';
import '../App.css';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { fa1, fa2, fa3 } from '@fortawesome/free-solid-svg-icons'; // استيراد الأيقونات

function Home2() {
  return (
    <section className='howItWork' id='howItWork'>
      {/* heading */}
      <div className='heading' id='heading'>
        <h2>خطوات حجز موعد للتصليح</h2>
      </div>
      
      {/* cards */}
      <div className='cardCountinar'>
        {/* card1 */}
        <div className='card'>
          <span><FontAwesomeIcon icon={fa1} /></span>  
          <h1>اختر الخدمة</h1>
          <p>اختر الخدمة التي تحتاجها مثلاً تبديل زيت<br /> تغيير إطارات أو تنظيف السيارة ..</p>
        </div>

        {/* card2 */}
        <div className='card'>
         <span><FontAwesomeIcon icon={fa2} /></span>  
          <p>عند الضغط على الخدمة سوف تظهر قائمة تتضمن<br /> بعض المعلومات التي يجب إدخالها<br /> مثل موديل السيارة، رقم الجوال، تحديد الفرع...</p>
        </div>

        {/* card3 */}
        <div className='card'>
           <span><FontAwesomeIcon icon={fa3} /></span>   
          <h1>أرسل المعلومات</h1>
          <p>بعد ملء المعلومات وإرسالها سوف يقوم فريقنا<br /> بالاتصال عليك لتأكيد الحجز</p>
        </div>
      </div>
    </section>
  );
}

export default Home2;