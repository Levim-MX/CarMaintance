import React from 'react';
import './ServicesContent.css';
import '../App.css';

function ServicesContent({ onServiceClick }) {
    return (
        <section className="Services" id="Services">
            {/* عنوان القسم */}
            <div className="heading">
                <h1>خدمات الصيانة</h1>
            </div>

            {/* حاوية الخدمات */}
            <div className="serverice-continar" id="serverice-continar">
                {/* صيانة المحرك */}
                <div className="box">
                    <img src="/images/audiCarEngin.jpg" alt="صيانة المحرك" />
                    <button className="btn" id="btn" onClick={() => onServiceClick("Engine Maintenance")}>
                        صيانة المحرك
                    </button>
                    
                </div>

                {/* تبديل زيت وفلاتر السيارة */}
                <div className="box">
                    <img src="/images/oilChange.jpg" alt="تبديل الزيت" />
                    <button className="btn" id="btn" onClick={() => onServiceClick("Oil Change")}>
                        تبديل زيت وفلاتر السيارة
                    </button>
                   
                </div>

                {/* تبديل بستم المحرك */}
                <div className="box">
                    <img src="/images/part2.png" alt="تبديل بستم المحرك" />
                    <button className="btn" id="btn" onClick={() => onServiceClick("Piston Change")}>
                        تبديل بستم المحرك
                    </button>
                  
                </div>

                {/* صيانة الإطارات */}
                <div className="box">
                    <img src="/images/audiCarWheel.jpeg" alt="صيانة الإطارات" />
                    <button className="btn" id="btn" onClick={() => onServiceClick("Tire Maintenance")}>
                        صيانة الإطارات
                    </button>
                   
                </div>

                {/* فحص وتبديل البطارية */}
                <div className="box">
                    <img src="/images/car battrey.jpg" alt="فحص وتبديل البطارية" />
                    <button className="btn" id="btn" onClick={() => onServiceClick("Battery Replacement")}>
                        فحص وتبديل البطارية
                    </button>
                    
                </div>

                {/* غسل وتنظيف السيارة */}
                <div className="box">
                    <img src="/images/carWashinggg.jpg" alt="غسل السيارة" />
                    <button className="btn" id="btn" onClick={() => onServiceClick("Car Washing")}>
                        غسل وتنظيف السيارة
                    </button>
                </div>

                {/* إصلاح أنظمة الكهرباء */}
                <div className="box">
                    <img src="/images/wiers.jpg" alt="إصلاح أنظمة الكهرباء" />
                    <button className="btn" id="btn" onClick={() => onServiceClick("Electrical System Repair")}>
                        صيانة أنظمة الكهرباء
                    </button>
                    
                </div>

                {/* صيانة المكابح */}
                <div className="box">
                    <img src="/images/640px-Bremsanlage.jpg" alt="صيانة المكابح" />
                    <button className="btn" id="btn" onClick={() => onServiceClick("Brake Maintenance")}>
                        صيانة المكابح
                    </button>
                    
                </div>
            </div>
        </section>
    );
}

export default ServicesContent;
