import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Form = ({ onCloseForm, selectedService }) => {
  // حالة لتخزين نوع الخدمة المختارة في الفورم
  const [selectedCarService, setSelectedCarService] = useState("");

  // الحالة الأساسية للنموذج
  const [currentStep, setCurrentStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  // حالة المستخدم العائد (لأصحاب الحساب المسجل مسبقاً)
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [loginEmail, setLoginEmail] = useState(""); // البريد الإلكتروني للمستخدم العائد
  const [loginPassword, setLoginPassword] = useState(""); // كلمة المرور للمستخدم العائد

  // حالة رقم الهاتف والتحقق منه
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);

  // تحديث نوع الخدمة عند تحميل الفورم
  useEffect(() => {
    if (selectedService) {
      setSelectedCarService(selectedService);
    }
  }, [selectedService]);

  // دالة التحقق من رقم الهاتف
  const validatePhoneNumber = (phoneNumber) => {
    const normalizedNumber = phoneNumber.replace(/\D/g, ""); // إزالة أي رموز غير أرقام
    const iraqRegex = /^(9647\d{9}|07\d{9}|7\d{8})$/; // الأنماط المقبولة
    return iraqRegex.test(normalizedNumber);
  };

  // عند تغيير رقم الهاتف
  const handleChange = (value) => {
    setPhoneNumber(value);
    setIsValid(validatePhoneNumber(value));
  };

  // عند التركيز على حقل رقم الهاتف
  const handleFocus = () => {
    if (phoneNumber.startsWith("964")) {
      setPhoneNumber(phoneNumber.slice(3)); // إزالة المقدمة الدولية 964
    }
  };

  // عند فقدان التركيز على رقم الهاتف
  const handleBlur = () => {
    if (!phoneNumber.startsWith("964") && !phoneNumber.startsWith("07")) {
      setPhoneNumber(`964${phoneNumber}`); // إعادة المقدمة الدولية إذا لم يبدأ الرقم بـ 07
    }
  };

  // دالة إرسال نموذج معلومات المركبة
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isChecked) {
      setShowError(true); // إظهار رسالة الخطأ عند عدم اختيار المربع
    } else {
      alert("تم تأكيد الحجز بنجاح!");
    }
  };

  // دالة إرسال نموذج تسجيل الدخول للمستخدم العائد
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginEmail === "test@example.com" && loginPassword === "123456") {
      setCurrentStep(2); // نقل المستخدم إلى الخطوة الثانية (معلومات المركبة)
    } else {
      alert("البريد الإلكتروني أو كلمة المرور غير صحيحين.");
    }
  };

  // دالة الانتقال للرجوع إلى الخطوة الأولى (التسجيل الشخصي)
  const handleBack = () => {
    setCurrentStep(1);
  };

  // دالة الانتقال للخطوة الثانية (معلومات المركبة) في حالة التسجيل الجديد
  const handleNext = (e) => {
    e.preventDefault();
    if (!isValid) {
      alert("يرجى تصحيح الأخطاء قبل المتابعة.");
    } else {
      setCurrentStep(2);
    }
  };

  // دالة تغيير حالة اختيار المربع (الشروط)
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setShowError(false);
  };

  return (
    <section className="form-container">
      {/* نموذج تسجيل الدخول للمستخدمين العائدين */}
      {isReturningUser && (
        <form onSubmit={handleLoginSubmit}>
          <div className="form-header">
            <h1>تسجيل الدخول</h1>
          </div>
          <div className="form-body">
            <div className="form-group">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="كلمة المرور"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <FontAwesomeIcon icon={faLock} className="icon" />
            </div>
          </div>
          <div className="form-footer">
            <button type="submit" className="btn2">
              تسجيل الدخول
            </button>
            <button type="button" className="btn2" onClick={() => setIsReturningUser(false)}>
              العودة للتسجيل
            </button>
            <div className="closeBtn">
              <button type="button" className="btn3" onClick={onCloseForm}>
                إغلاق
              </button>
            </div>
          </div>
        </form>
      )}

      {/* نموذج التسجيل الجديد */}
      {!isReturningUser && (
        <>
          {currentStep === 1 && (
            <form onSubmit={handleNext}>
              <div className="form-header">
                <h1>معلومات التسجيل الشخصية</h1>
              </div>
              <div className="form-body">
                <div className="form-group">
                  <input type="text" placeholder="الاسم الثلاثي" required />
                  <FontAwesomeIcon icon={faUser} className="icon" />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="example@gmail.com الايميل" required />
                  <FontAwesomeIcon icon={faEnvelope} className="icon" />
                </div>
                <div className="form-group">
                  <input type="password" placeholder="كلمة السر" required />
                  <FontAwesomeIcon icon={faLock} className="icon" />
                </div>
                <div className="form-group">
                  <PhoneInput
                    country={"iq"}
                    value={phoneNumber}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    enableAreaCodes={true}
                    required
                    containerClass="phone-input"
                  />
                  {!isValid && <p className="error-message">رقم الهاتف غير صالح</p>}
                </div>
              </div>
              <div className="form-footer">
                <p>سيتم خزن وتشفير جميع البيانات لضمان السرية</p>
                <button type="submit">التالي</button>
                <button type="button" className="btn2" onClick={() => setIsReturningUser(true)}>
                  اضغط هنا اذا كان لديك حساب مسجل مسبقا
                </button>
                <div className="closeBtn">
                  <button type="button" className="btn3" onClick={onCloseForm}>
                    إغلاق
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* الخطوة الثانية: معلومات المركبة */}
          {currentStep === 2 && (
            console.log("Rendering step 2 form..."),
            <form onSubmit={handleFormSubmit}>
              <div className="form-header">
                <h1>معلومات المركبة</h1>
              </div>
              <div className="form-body">
                <div className="form-group">
                  <select id="carType" className="custom-select" required>
                    <option value="">اختر نوع المركبة</option>
                    <option value="AUDI A3">أودي A3</option>
                    <option value="AUDI A4">AUDI A4</option>
                    <option value="AUDI A6">AUDI A6</option>
                    <option value="AUDI A8">AUDI A8</option>
                    <option value="AUDI Q3">AUDI Q3</option>
                    <option value="AUDI Q5">AUDI Q5</option>
                    <option value="AUDI Q7">AUDI Q7</option>
                    <option value="AUDI Q8">AUDI Q8</option>
                    <option value="AUDI TT">AUDI TT</option>
                    <option value="AUDI R8">AUDI R8</option>
                  </select>
                </div>

                <div className="form-group">
                  <input type="text" placeholder=" رقم شاصي المركبة " required />
                </div>
                      
                <div className="form-group">
                  <select id="carBranch" className="custom-select" required>
                    <option value="">اختر أقرب فرع عليك</option>
                    <option value="branch1">فرع شارع فلسطين/نادي التركماني</option>
                    <option value="branch2">فرع الكرادة/ مجمع مشن </option>
                    <option value="branch3">فرع الكرخ/البياع الصناعية </option>
                    <option value="branch4">فرع الحرية / شارع الربيع </option>
                    <option value="branch5">فرع الرصافة/الشيخ عمر </option>
                    <option value="branch5">فرع الرصافة/ شارع الصناعة </option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    id="carService"
                    className="custom-select"
                    required
                    value={selectedCarService}
                    onChange={(e) => setSelectedCarService(e.target.value)}
                  >
                    <option value="">اختر نوع الخدمة</option>
                    <option value="Oil Change">تغير زيت السيارة</option>
                    <option value="Engine Maintenance">صيانة المحرك</option>
                    <option value="Piston Change">صيانة بستم المحرك</option>
                    <option value="Car Washing">غسل وتنظيف المركبة</option>
                    <option value="Brake Maintenance">صيانة المكابح</option>
                    <option value="Tire Maintenance">صيانة الإطارات</option>
                    <option value="Electrical System Repair">صيانة أنظمة الكهرباء</option>
                    <option value="Battery Replacement">فحص وتبديل البطارية</option>
                  </select>
                </div>

                {/* إضافة حقول إضافية بناءً على الخدمة المختارة */}
                {selectedCarService === "Oil Change" && (
                  <div className="form-group">
                    <label>اختر نوع الزيت</label>
                    <select className="custom-select" required>
                      <option value="">اختر نوع الزيت</option>
                      <option value="Full Synthetic"> زيت تخليقي (60$)  </option>
                      <option value="Semi Synthetic"> زيت نصف تخليقي(45$)  </option>
                      <option value="Mineral">  زيت صناعي(35$)</option>
                    </select>
                  </div>
                )}

                {selectedCarService === "Car Washing" && (
                  <div className="form-group">
                    <label>اختر نوع الغسيل</label>
                    <select className="custom-select" required>
                      <option value="">اختر نوع الغسيل</option>
                      <option value="Interior">  غسيل داخلي(20$)</option>
                      <option value="Exterior"> غسيل خارجي(15$)</option>
                      <option value="Full"> غسيل شامل(30$)</option>
                    </select>
                  </div>
                )}

  {selectedCarService === "Tire Maintenance" && (
  <>
    <div className="form-group">
      <label>اختر الإطار </label>
      <select className="custom-select" required>
        <option value="">  الأطارات الصيفية</option>
        <option value="summer1">Michelin Pilot Sport 4 (220$)</option>
        <option value="summer2">Bridgestone Potenza RE-71R (250$)</option>
        <option value="summer3">Continental ExtremeContact Sport (230$)</option>
        <option value="">  الأطارات الشتوية</option>
        <option value="winter1">Michelin X-Ice Snow (150$)</option>
        <option value="winter2">Bridgestone Blizzak WS90 (160$)</option>
        <option value="winter3">Continental VikingContact 7 (170$)</option>
      </select>
    </div>


   
  </>
)}
                   {selectedCarService === "Battery Replacement" && (
                  <div className="form-group">
                    <label>اختر خدمة البطارية</label>
                    <select className="custom-select" required>
                      <option value="">اختر خدمة البطارية</option>
                      <option value="Battery Testing">اختبار البطارية (80$)</option>
                      <option value="Battery Replacement">استبدال البطارية (150$)</option>
                      <option value="Battery Charging">شحن البطارية (60$)</option>
                 
                    </select>
                  </div>
                )}

              {selectedCarService === "Engine Maintenance" && (
                  <div className="form-group">
                    <label>اختر خدمة المحرك</label>
                    <select className="custom-select" required>
                      <option value=""> صيانة الاجزاء التالية.. </option>
                      <option value="Spark Plugs">استبدال شمعات الإشعال (200$)</option>
                      <option value="Fuel Injector Cleaning">تنظيف بخاخات الوقود (180$)</option>
                      <option value="Timing Belt Replacement">استبدال سير التوقيت (250$)</option>
                      <option value="Timing Belt Replacement">  جميع الخيارات  (500$)</option>

                    </select>
                  </div>
                )}


                  {selectedCarService === "Electrical System Repair" && (
                  <div className="form-group">
                    <label>اختر خدمة أنظمة الكهرباء</label>
                    <select className="custom-select" required>
                      <option value="">اختر الأجزاء المطلوب صيانتها  </option>
                      <option value="Alternator Repair">إصلاح المولد (120$)</option>
                      <option value="Starter Motor Repair">إصلاح موتور التشغيل (130$)</option>
                      <option value="Wiring Diagnosis">تشخيص الأسلاك (100$)</option>
                      <option value="Timing Belt Replacement">  جميع الخيارات  (320$)</option>

                    </select>
                  </div>
                )}

              </div>

              <div className="form-footer">
                <p>
                  بالضغط على " أرسال المعلومات و تأكيد الحجز"، أؤكد صحة
                  المعلومات وأوافق على اتصال فريق الدعم لتأكيد الحجز.
                </p>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="confirmation-checkbox"
                    onChange={handleCheckboxChange}
                    checked={isChecked}
                  />
                  <label htmlFor="confirmation-checkbox">أوافق على الشروط</label>
                </div>

                {showError && (
                  <p className="error-message">
                    يرجى النقر على المربع قبل تأكيد الحجز.
                  </p>
                )}
                <div className="btn-Y">
                  <button type="submit" className="btn2">
                    إرسال المعلومات وتأكيد الحجز
                  </button>
                  <button type="button" className="btn2" onClick={handleBack}>
                    رجوع
                  </button>
                  <div className="closeBtn">
                    <button
                      type="button"
                      className="btn3"
                      onClick={onCloseForm}
                    >
                      إغلاق
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </>
      )}
    </section>
  );
};

export default Form;
