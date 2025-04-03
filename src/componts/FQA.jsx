import React, { useState } from "react";

function FQA() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="
        absolute top-[150%] right-[3%] w-80 max-w-sm bg-blue-100 p-5 rounded-2xl shadow-lg text-gray-800 font-roboto max-h-[90vh]
        sm:top-[140%] sm:right-[2%]
        md:top-[130%] md:right-0
        lg:top-[120%] lg:right-[5%]
        xl:top-[110%] xl:right-[8%]
        2xl:top-[150%] 2xl:right-[5%]
      "
    >
      <h1 className="text-center text-blue-500 text-2xl font-bold mb-5">
        الأسئلة الشائعة
      </h1>
      <ul className="space-y-4">
        {faqData.map((faq, index) => (
          <li key={index} className="bg-white p-4 rounded-md shadow-md">
            <div
              className="flex justify-between items-center font-bold text-gray-800 cursor-pointer hover:text-blue-500"
              onClick={() => toggleAnswer(index)}
            >
              <span>{faq.question}</span>
              <span
                className="text-xl transition-transform duration-300"
                style={{
                  transform: activeIndex === index ? "rotate(135deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </div>
            {activeIndex === index && (
              <div className="mt-2 text-gray-600 text-sm">{faq.answer}</div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

const faqData = [
  {
    question: "ما هو العمر الافتراضي لإطارات العجلة؟",
    answer:
      "لتجنب انفجار إطار العجلة، ننصح بالتبديل الدوري كل 50 ألف كيلومتر أو عند ظهور علامات التآكل على الإطار.",
  },
  {
    question: "ما هي أقصى فترة لتبديل زيت السيارة؟",
    answer: (
      <div>
        <h2 className="font-bold">يعتمد على نوعية الزيت:</h2>
        <ul className="list-disc pl-5 mt-2">
          <li>الزيوت التقليدية: كل 5000 كيلومتر</li>
          <li>الزيوت النصف تخليقية: كل 7000-10000 كيلومتر</li>
          <li>الزيوت التخليقية الكاملة: حتى 10000-15000 كيلومتر</li>
        </ul>
      </div>
    ),
  },
  {
    question: "ما هي علامات الحاجة إلى تغيير بطارية السيارة؟",
    answer:
      "ضعف تشغيل المحرك، انخفاض سطوع الأضواء، وظهور إشارة البطارية في لوحة القيادة.",
  },
  {
    question: "كم مرة يجب فحص ضغط الإطارات؟",
    answer:
      "ننصح بفحص ضغط الإطارات مرة كل شهر على الأقل للحفاظ على الأداء الأمثل.",
  },
  {
    question: "ما هي الخدمات التي توفرونها؟",
    answer:
      "نقدم خدمات تشمل تصليح المحركات، صيانة الإطارات، تغيير الزيوت، فحص إلكتروني شامل، وصيانة المكابح والتكييف والبطاريات.",
  },
];

export default FQA;
