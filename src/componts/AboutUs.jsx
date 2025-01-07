import React from 'react';
import './AboutUs.css'
import '../App.css'

function AboutUs(){

    return (
        <section className="About" id='About'>
            
          <div className="about-us-content">
            <h1>من نحن ؟</h1>
            <h2>كارفكس</h2>
            <p>
            شركة مختصة بتصليح أجزاء السيارات والسيارات بشكل عام.<br />
خدماتنا شاملة تشمل جميع أجزاء المركبة.<br />
بدأت قصتنا في ورشة صغيرة لتصليح السيارات سنة 2010.<br />
ومع مرور الوقت إلى يومنا هذا سنة 2024 أصبح لدينا 6 أفرع في بغداد فقط:

            </p>
            <ul>
              <li>فرع الكرادة</li>
              <li>فرع الأعظمية</li>
              <li>المنصور</li>
              <li>شارع فلسطين</li>
              <li>الكاظمية</li>
              <li>حي القاهرة</li>
            </ul>
            <p>
              كارفكس تحوي على أمهر العاملين أصحاب خبرة لسنوات طويلة في مجالنا. سيارتك بيد أمينة.
            </p>
          </div>

       

        </section>
      );
    };


export default AboutUs