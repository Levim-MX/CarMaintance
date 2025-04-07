import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa1, fa2, fa3 } from '@fortawesome/free-solid-svg-icons';

function Home2() {
  return (
    <section id="howItWork" className="py-16 bg-white-50 mt-[20%]">
      <div className="container mx-auto px-4">
        {/* عنوان القسم */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
          خطوات حجز موعد للصيانة
        </h2>

        {/* شبكة الكروت */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: اختر الخدمة */}
          <motion.div 
            className="flex flex-col items-center bg-white rounded-full p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className=" rounded-[70%] p-6 mb-4">
              <FontAwesomeIcon icon={fa1} className="text-blue-600 text-6xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">اختر الخدمة</h3>
            <p className="text-gray-700 text-center">
              اختر الخدمة التي تحتاجها مثل تبديل الزيت، تغيير الإطارات أو تنظيف السيارة يمكن طلب اكثر من خدمة 
            </p>
          </motion.div>

          {/* Card 2: املأ البيانات */}
          <motion.div 
            className="flex flex-col items-center bg-white rounded-full p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className=" rounded-full p-6 mb-4">
              <FontAwesomeIcon icon={fa2} className="text-blue-600 text-6xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">املأ البيانات</h3>
            <p className="text-gray-700 text-center">
              عند الضغط على الخدمة، ستظهر لك قائمة بالمعلومات التي يجب إدخالها مثل موديل السيارة، رقم الجوال وتحديد الفرع
            </p>
          </motion.div>

          {/* Card 3: أرسل المعلومات */}
          <motion.div 
            className="flex flex-col items-center bg-white rounded-full p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className=" rounded-full p-6 mb-4">
              <FontAwesomeIcon icon={fa3} className="text-blue-600 text-6xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">أرسل المعلومات</h3>
            <p className="text-gray-700 text-center">
              بعد ملء المعلومات وإرسالها، سيتواصل فريقنا معك لتأكيد موعد الحجز والتفاصيل الأخرى
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Home2;
