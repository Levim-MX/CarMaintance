import React from 'react';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';

function ServicesContent({ onServiceClick }) {
  // إعداد الأعمدة حسب حجم الشاشة باستخدام react-masonry-css
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  // مصفوفة الخدمات (يمكنك تعديل الصور والعناوين حسب الحاجة)
  const services = [
    {
      id: 1,
      title: "صيانة المحرك",
      service: "Engine Maintenance",
      image: "/images/audiCarEngin.jpg",
    },
    {
      id: 2,
      title: "تبديل زيت وفلاتر السيارة",
      service: "Oil Change",
      image: "/images/oilChange.jpg",
    },
    {
      id: 3,
      title: "تبديل بستم المحرك",
      service: "Piston Change",
      image: "/images/part2.png",
    },
    {
      id: 4,
      title: "صيانة الإطارات",
      service: "Tire Maintenance",
      image: "/images/audiCarWheel.jpeg",
    },
    {
      id: 5,
      title: "فحص وتبديل البطارية",
      service: "Battery Replacement",
      image: "/images/car battrey.jpg",
    },
    {
      id: 6,
      title: "غسل وتنظيف السيارة",
      service: "Car Washing",
      image: "/images/carWashinggg.jpg",
    },
    {
      id: 7,
      title: "إصلاح أنظمة الكهرباء",
      service: "Electrical System Repair",
      image: "/images/wiers.jpg",
    },
    {
      id: 8,
      title: "صيانة المكابح",
      service: "Brake Maintenance",
      image: "/images/640px-Bremsanlage.jpg",
    },
    
  ];

  return (
    <section
      id="Services"
      className="mt-[20%] py-10 border-4 rounded-[40px] bg-white-50 flex flex-col items-center"
    >
      {/* عنوان القسم */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-600 border-b-2 border-blue-300 pb-2">
          خدمات الصيانة
        </h1>
      </div>

      {/* شبكة الخدمات باستخدام Masonry */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-[50%]  mr-[30%] gap-[20%]"
        columnClassName="pl-4 bg-clip-padding"
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: service.id * 0.1 }}
            className="flex flex-col items-center mb-6"
          >
            {/* حاوية الصورة بشكل دائري */}
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-200 shadow-lg transition-transform duration-300 ease-out hover:scale-105">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* زر عرض الخدمة مع اسم الخدمة أسفله */}
            <button
              onClick={() => onServiceClick(service.service)}
              className="mt-4 py-2 px-4 font-medium text-white bg-blue-600 rounded-full transition-colors hover:bg-blue-700"
            >
              {service.title}
            </button>
          </motion.div>
        ))}
      </Masonry>
    </section>
  );
}

export default ServicesContent;
