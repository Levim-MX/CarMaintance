import React, { useState } from 'react';
import './FQA.css'
import '../App.css'


function FQA() {
  const [activeIndex, setActiveIndex] = useState(null); // State to manage the active answer

  const toggleAnswer = (index) => {
    // If the clicked index is the same as the activeIndex, close it; otherwise, set it as the active index
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="section-faq" className="section-faq">
      <h1>الأسئلة الشائعة</h1>
      <ul>
        <li>
          <div className="question" onClick={() => toggleAnswer(0)}>
            <span>ما هو العمر الافتراضي لأطارات العجلة؟</span>
            <span className="icon">
              <ion-icon name="add-outline" style={{ transform: activeIndex === 0 ? 'rotate(135deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}></ion-icon>
            </span>
          </div>
          <div className="answer" style={{ display: activeIndex === 0 ? 'block' : 'none' }}>
            <span>لتجنب انفجار أطار العجلة ننصح بتبديل الدوري كل 50 ألف كيلو متر أو عند ظهور علامات التأكل على الأطار</span>
          </div>
        </li>
        
        <li>
          <div className="question" onClick={() => toggleAnswer(1)}>
            <span>ما هي اقصى فترة لتبديل زيت السيارة ؟</span>
            <span className="icon">
              <ion-icon name="add-outline" style={{ transform: activeIndex === 1 ? 'rotate(135deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}></ion-icon>
            </span>
          </div>
          <div className="answer" style={{ display: activeIndex === 1 ? 'block' : 'none' }}>
            <span>
              <h2>يعتمد على نوعية الزيت</h2>
              <ul>
                <li>
                  <p>الزيوت التقليدية كل 5000 كيلومتر</p>
                </li>
                <li>
                  <p>الزيوت النصف تخليقية كل 7000-10000 كيلومتر أي كل 6 أشهر</p>
                </li>
                <li>
                  <p>الزيوت التخليقية الكاملة تدوم حتى 10000-15000 كيلومتر أي كل 8 أشهر أو سنة</p>
                </li>
              </ul>
            </span>
          </div>
        </li>

        <li>
          <div className="question" onClick={() => toggleAnswer(2)}>
            <span>ما هي علامات الحاجة إلى تغيير بطارية السيارة؟</span>
            <span className="icon">
              <ion-icon name="add-outline" style={{ transform: activeIndex === 2 ? 'rotate(135deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}></ion-icon>
            </span>
          </div>
          <div className="answer" style={{ display: activeIndex === 2 ? 'block' : 'none' }}>
            <span>من العلامات الشائعة ضعف في تشغيل المحرك، انخفاض سطوع الأضواء، وظهور إشارة البطارية في لوحة القيادة.</span>
          </div>
        </li>

        <li>
          <div className="question" onClick={() => toggleAnswer(3)}>
            <span>كم مرة يجب فحص ضغط الإطارات؟</span>
            <span className="icon">
              <ion-icon name="add-outline" style={{ transform: activeIndex === 3 ? 'rotate(135deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}></ion-icon>
            </span>
          </div>
          <div className="answer" style={{ display: activeIndex === 3 ? 'block' : 'none' }}>
            <span>ننصح بفحص ضغط الإطارات مرة كل شهر على الأقل للحفاظ على الأداء الأمثل</span>
          </div>
        </li>

        <li>
          <div className="question" onClick={() => toggleAnswer(4)}>
            <span>ما هي الخدمات التي توفروها؟</span>
            <span className="icon">
              <ion-icon name="add-outline" style={{ transform: activeIndex === 4 ? 'rotate(135deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}></ion-icon>
            </span>
          </div>
          <div className="answer" style={{ display: activeIndex === 4 ? 'block' : 'none' }}>
            <span>نقدم خدمات شاملة تشمل تصليح المحركات، صيانة الإطارات، تغيير الزيوت، صيانة المكابح، فحص إلكتروني شامل، بالإضافة إلى خدمات التكييف والبطاريات</span>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default FQA;