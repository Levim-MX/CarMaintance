import React from 'react';

function AboutUs() {
  return (
    <section
      id="About"
      dir="rtl" 
      className="relative top-[50vh] mx-auto w-full max-w-[1000px] p-5 bg-gradient-to-r from-[#fff6f8] to-[#f9f9f9] rounded-[15px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] text-center mb-10"
      // إذا كان عرض الشاشة أقل من 1920px، استخدم عرض 800px؛ يمكنك تعديل هذا حسب الحاجة
      style={{ width: window.innerWidth <= 1920 ? "800px" : "100%" }}
    >
      <div className="about-us-content">
        <h1 className="text-[2.5rem] text-black mb-4">من نحن ؟</h1>
        <h2 className="text-[2rem] text-[#278de9] mb-5">كارفكس</h2>
        <p className="text-[1.2rem] text-[#333] leading-[1.8] mb-5">
          شركة مختصة بتصليح أجزاء السيارات والسيارات بشكل عام.<br />
          خدماتنا شاملة تشمل جميع أجزاء المركبة.<br />
          بدأت قصتنا في ورشة صغيرة لتصليح السيارات سنة 2010.<br />
          ومع مرور الوقت إلى يومنا هذا سنة 2024 أصبح لدينا 6 أفرع في بغداد فقط:
        </p>
        <ul className="list-none p-0 mb-5">
          <li className="text-[1.2rem] font-semibold text-[#555] mb-2">فرع الكرادة</li>
          <li className="text-[1.2rem] font-semibold text-[#555] mb-2">فرع الأعظمية</li>
          <li className="text-[1.2rem] font-semibold text-[#555] mb-2">المنصور</li>
          <li className="text-[1.2rem] font-semibold text-[#555] mb-2">شارع فلسطين</li>
          <li className="text-[1.2rem] font-semibold text-[#555] mb-2">الكاظمية</li>
          <li className="text-[1.2rem] font-semibold text-[#555] mb-2">حي القاهرة</li>
        </ul>
        <p className="text-[1.2rem] text-[#333] leading-[1.8]">
          كارفكس تحوي على أمهر العاملين أصحاب خبرة لسنوات طويلة في مجالنا. سيارتك بيد أمينة.
        </p>
      </div>
    </section>
  );
}

export default AboutUs;
