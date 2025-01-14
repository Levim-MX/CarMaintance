import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Form = ({ onCloseForm }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false); // حالة المستخدم العائد
  const [loginEmail, setLoginEmail] = useState(""); // البريد الإلكتروني للمستخدم العائد
  const [loginPassword, setLoginPassword] = useState(""); // كلمة المرور للمستخدم العائد

  // تخطي التحقق ونقل المستخدم مباشرة إلى الخطوة الثانية
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginEmail === "test@example.com" && loginPassword === "123456") {
      setCurrentStep(2); // نقل المستخدم إلى الخطوة الثانية
    } else {
      alert("البريد الإلكتروني أو كلمة المرور غير صحيحين.");
    }
  };

  const handleBack = () => {
    setCurrentStep(1); // العودة إلى الخطوة الأولى
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!isValid) {
      alert("يرجى تصحيح الأخطاء قبل المتابعة.");
    } else {
      setCurrentStep(2); // الانتقال إلى الخطوة الثانية

    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setShowError(false); // إخفاء رسالة الخطأ عند تحديد المربع
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);

  const validatePhoneNumber = (phoneNumber) => {
    const normalizedNumber = phoneNumber.replace(/\D/g, ""); // إزالة أي رموز غير أرقام
    const iraqRegex = /^(9647\d{9}|07\d{9}|7\d{8})$/; // الأنماط المقبولة
    return iraqRegex.test(normalizedNumber);
  };

  const handleChange = (value) => {
    setPhoneNumber(value);
    setIsValid(validatePhoneNumber(value));
  };

  const handleFocus = () => {
    if (phoneNumber.startsWith("964")) {
      setPhoneNumber(phoneNumber.slice(3)); // إزالة المقدمة الدولية 964
    }
  };

  const handleBlur = () => {
    if (!phoneNumber.startsWith("964") && !phoneNumber.startsWith("07")) {
      setPhoneNumber(`964${phoneNumber}`); // إعادة المقدمة الدولية إذا لم يبدأ الرقم بـ 07
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isChecked) {
      setShowError(true); // إظهار رسالة الخطأ عند عدم اختيار المربع
    } else {
      alert("تم تأكيد الحجز بنجاح!");
    }
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
            <button
              type="button"
              className="btn2"
              onClick={() => setIsReturningUser(false)}
            >
              العودة للتسجيل
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
                  <input
                    type="email"
                    placeholder="example@gmail.com الايميل"
                    required
                  />
                  <FontAwesomeIcon icon={faEnvelope} className="icon" />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="كلمة السر"
                    required
                  />
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
                  {!isValid && (
                    <p className="error-message">رقم الهاتف غير صالح</p>
                  )}
                </div>
              </div>
              <div className="form-footer">
                <p>سيتم خزن وتشفير جميع البيانات لضمان السرية</p>
                <button type="submit">التالي</button>
                <button
                  type="button"
                  className="btn2"
                  onClick={() => setIsReturningUser(true)}
                >
                  اضغط هنا اذا كان لديك حساب مسجل مسبقا
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
            </form>
          )}

          {/* الخطوة الثانية */}
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
                  <select id="carService" className="custom-select" required>
                    <option value="">اختر نوع الخدمة</option>
                    <option value="Oil Change">تغير زيت السيارة</option>
                    <option value="Engine Maintenance">صيانة المحرك</option>
                    <option value="Piston">صيانة بستم المحرك</option>
                    <option value="Car Washing">غسل وتنظيف المركبة</option>
                    <option value="Car Brakes">صيانة المكابح</option>
                    <option value="Car Wheels">صيانة الإطارات</option>
                    <option value="Car Wheels">إصلاح أنظمة الكهرباء  </option>
                    <option value="Car Wheels">فحص وتبديل البطارية </option>
                  </select>
                </div>

                <div className="form-group">
                  <select id="carCrane" className="custom-select" required>
                    <option value="">هل تحتاج إلى كرين سحب؟</option>
                    <option value="YES">نعم، أحتاج إلى كرين سحب</option>
                    <option value="NO">لا، سأحضر المركبة بنفسي</option>
                  </select>
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
