import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Form = ({ onCloseForm, selectedService, isAuthenticated, onLogin }) => {
  // تخزين نوع الخدمة المختارة من قسم الخدمات
  const [selectedCarService, setSelectedCarService] = useState("");
  useEffect(() => {
    if (selectedService) {
      setSelectedCarService(selectedService);
    }
  }, [selectedService]);

  // بيانات التسجيل (للمستخدم الجديد)
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");

  // بيانات تسجيل الدخول للمستخدم العائد
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");

  // حالة رقم الهاتف والتحقق منه
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);

  // حالة checkbox والشروط
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  // تحديد الخطوة الحالية
  // إذا لم يكن المستخدم مسجّل (isAuthenticated === false) نعرض فورم التسجيل فقط
  // وإذا كان المستخدم مسجّل (isAuthenticated === true) نعرض فورم معلومات المركبة فقط
  const [currentStep, setCurrentStep] = useState(isAuthenticated ? 2 : 1);
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  }, [isAuthenticated]);

  // دالة التحقق من رقم الهاتف (حسب الصيغة العراقية)
  const validatePhoneNumber = (phoneNumber) => {
    const normalizedNumber = phoneNumber.replace(/\D/g, "");
    const iraqRegex = /^(9647\d{9}|07\d{9}|7\d{8})$/;
    return iraqRegex.test(normalizedNumber);
  };

  const handleChange = (value) => {
    setPhoneNumber(value);
    setIsValid(validatePhoneNumber(value));
  };

  const handleFocus = () => {
    if (phoneNumber.startsWith("964")) {
      setPhoneNumber(phoneNumber.slice(3));
    }
  };

  const handleBlur = () => {
    if (!phoneNumber.startsWith("964") && !phoneNumber.startsWith("07")) {
      setPhoneNumber(`964${phoneNumber}`);
    }
  };

  // دالة إرسال بيانات التسجيل (للمستخدم الجديد)
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting registration form...", { userName, phoneNumber, userPass });
    if (!userName || !phoneNumber || !userPass) {
      alert("يرجى ملء جميع الحقول قبل المتابعة.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/api/users/register", {
        name: userName,
        phoneNumber,
        password: userPass,
      });
      if (res.data && res.data.token) {
        const token = res.data.token;
        console.log("Register successful. Token:", token);
        localStorage.setItem("token", token);
        onLogin(userName);
        onCloseForm();
      } else {
        alert("حدث خطأ غير متوقع أثناء التسجيل. الرجاء المحاولة لاحقًا.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response && error.response.data) {
        alert(error.response.data.msg || "حدث خطأ أثناء التسجيل.");
      } else {
        alert("تعذر الاتصال بالخادم. الرجاء المحاولة لاحقًا.");
      }
    }
  };

  // دالة إرسال بيانات تسجيل الدخول (للمستخدم العائد)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // إرسال بيانات تسجيل الدخول (POST)
      const res = await axios.post("http://localhost:3000/api/users/login", {
        phoneNumber,
        password: loginPassword,
      });
      const token = res.data.token;
      console.log("Token from server:", token);
      localStorage.setItem("token", token);
  
      // استخدام التوكن لاستدعاء API وجلب بيانات المستخدم (GET)
      const userRes = await axios.get("http://localhost:3000/api/users/", {
        headers: { "x-auth-token": token }
      });
      
      console.log("User data:", userRes.data);
  
      // تحديث حالة المستخدم في الواجهة (يمكنك استخدام خاصية اسم المستخدم من بيانات userRes.data)
      onLogin(userRes.data.name || userRes.data.username);
      onCloseForm();
  
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        alert(error.response.data.msg || "Login error");
      } else {
        console.error(error);
        alert("Login error");
      }
    }
  };
  

  // دالة إرسال بيانات حجز المركبة (للمستخدم المسجّل)
  const handleBookingSubmit = async (e) => {

    e.preventDefault();
    console.log("Submitting registration form...", { userName, phoneNumber, userPass });

    console.log("Booking branch for user:", { selectedCarService });
    alert("تم تأكيد الحجز بنجاح!");
    onCloseForm();
  };

  // دالة تغيير حالة checkbox
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setShowError(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {!isAuthenticated ? (
        // إذا لم يكن المستخدم مسجّل، عرض فورم التسجيل/تسجيل الدخول
        <>
          {isReturningUser ? (
            // فورم تسجيل الدخول
            <form onSubmit={handleLoginSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4 text-center">
                <h1 className="text-2xl font-bold">تسجيل الدخول</h1>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <PhoneInput
                    country={"iq"}
                    value={phoneNumber}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    enableAreaCodes={true}
                    required
                    containerClass="w-full"
                    inputClass="w-full p-3 border border-gray-300 rounded shadow pl-[50px]"
                  />
                  {!isValid && (
                    <p className="text-red-500 text-sm mt-1">رقم الهاتف غير صالح</p>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="كلمة المرور"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded shadow"
                  />
                  <FontAwesomeIcon icon={faLock} className="absolute right-3 top-3 text-gray-500" />
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center">
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
                  تسجيل الدخول
                </button>
                <button
                  type="button"
                  className="mt-4 w-full bg-gray-300 text-gray-800 p-3 rounded hover:bg-gray-400"
                  onClick={() => setIsReturningUser(false)}
                >
                  العودة للتسجيل
                </button>
                <div className="mt-4">
                  <button type="button" className="text-red-600 hover:underline" onClick={onCloseForm}>
                    إغلاق
                  </button>
                </div>
              </div>
            </form>
          ) : (
            // فورم التسجيل
            <form onSubmit={handleRegisterSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4 text-center">
                <h1 className="text-2xl font-bold">معلومات التسجيل الشخصية</h1>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="الاسم الثلاثي"
                    required
                    className="w-full p-3 border border-gray-300 rounded shadow"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faUser} className="absolute right-3 top-3 text-gray-500" />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="كلمة السر"
                    required
                    className="w-full p-3 border border-gray-300 rounded shadow"
                    value={userPass}
                    onChange={(e) => setUserPass(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faLock} className="absolute right-3 top-3 text-gray-500" />
                </div>
                <div className="relative">
                  <PhoneInput
                    country={"iq"}
                    value={phoneNumber}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    enableAreaCodes={true}
                    required
                    containerClass="w-full"
                    inputClass="w-full p-3 border border-gray-300 rounded shadow pl-[50px]"
                  />
                  {!isValid && (
                    <p className="text-red-500 text-sm mt-1">رقم الهاتف غير صالح</p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center w-full relative text-right">
                <p className="mb-8 text-gray-600 text-xl font-medium">
                  بالضغط على "إرسال المعلومات وتأكيد الحجز"، أؤكد صحة المعلومات وأوافق على اتصال فريق الدعم لتأكيد الحجز.
                </p>
                <div className="relative flex items-center gap-2 w-full justify-end">
                  <input
                    type="checkbox"
                    id="confirmation-checkbox"
                    onChange={handleCheckboxChange}
                    checked={isChecked}
                    className="w-5 h-5"
                  />
                  <label htmlFor="confirmation-checkbox" className="text-xl">
                    أوافق على الشروط
                  </label>
                </div>
                {showError && (
                  <p className="absolute text-red-500 text-lg top-1/2 right-1">
                    يرجى النقر على المربع قبل تأكيد الحجز.
                  </p>
                )}
                <div className="flex flex-col items-center gap-4 mt-4 w-full">
                  <button type="submit" className="w-1/2 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition text-base">
                    التالي
                  </button>
                  <button
                    type="button"
                    className="w-1/2 bg-gray-300 text-white p-3 rounded hover:bg-gray-400 transition text-base"
                    onClick={() => setIsReturningUser(true)}
                  >
                    اضغط هنا اذا كان لديك حساب مسجل مسبقا
                  </button>
                  <button type="button" className="w-1/2 bg-red-600 text-white p-3 rounded hover:bg-red-700 transition text-base" onClick={onCloseForm}>
                    إغلاق
                  </button>
                </div>
              </div>
            </form>
          )}
        </>
      ) : (
        // إذا كان المستخدم مسجّل، نعرض فورم معلومات المركبة فقط
        <form onSubmit={handleBookingSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold">معلومات المركبة</h1>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <select id="carType" className="w-full p-3 border border-gray-300 rounded" required>
                <option value="">اختر نوع المركبة</option>
                <option value="AUDI A3">أودي A3</option>
                <option value="AUDI A4">AUDI A4</option>
                <option value="AUDI A6">AUDI A6</option>
                <option value="AUDI A8">AUDI A8</option>
                <option value="AUDI Q3">أودي Q3</option>
                <option value="AUDI Q5">أودي Q5</option>
                <option value="AUDI Q7">أودي Q7</option>
                <option value="AUDI Q8">أودي Q8</option>
                <option value="AUDI TT">أودي TT</option>
                <option value="AUDI R8">أودي R8</option>
              </select>
            </div>
            <div className="relative">
              <select
                id="carService"
                className="w-full p-3 border border-gray-300 rounded"
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
                <option value="Electrical System Repair">إصلاح أنظمة الكهرباء</option>
                <option value="Battery Replacement">فحص وتبديل البطارية</option>
              </select>
            </div>
            {selectedCarService === "Oil Change" && (
              <div className="relative">
                <label className="block mb-1 text-gray-700 text-xl">اختر نوع الزيت</label>
                <select className="w-full p-3 border border-gray-300 rounded" required>
                  <option value="">اختر نوع الزيت</option>
                  <option value="Full Synthetic">زيت تخليقي بالكامل (150$)</option>
                  <option value="Semi Synthetic">زيت شبه تخليقي (140$)</option>
                  <option value="Mineral">زيت صناعي (130$)</option>
                </select>
              </div>
            )}
            {selectedCarService === "Car Washing" && (
              <div className="relative">
                <label className="block mb-1 text-gray-700 text-xl">اختر نوع الغسيل</label>
                <select className="w-full p-3 border border-gray-300 rounded" required>
                  <option value="">اختر نوع الغسيل</option>
                  <option value="Interior">غسيل داخلي (50$)</option>
                  <option value="Exterior">غسيل خارجي (40$)</option>
                  <option value="Full">غسيل شامل (70$)</option>
                </select>
              </div>
            )}
            {selectedCarService === "Electrical System Repair" && (
              <div className="relative">
                <label className="block mb-1 text-gray-700 text-xl">اختر خدمة أنظمة الكهرباء</label>
                <select className="w-full p-3 border border-gray-300 rounded" required>
                  <option value="">اختر الخدمة</option>
                  <option value="Alternator Repair">إصلاح المولد (120$)</option>
                  <option value="Starter Motor Repair">إصلاح موتور التشغيل (130$)</option>
                  <option value="Wiring Diagnosis">تشخيص الأسلاك (100$)</option>
                  <option value="All Options">جميع الخيارات (320$)</option>
                </select>
              </div>
            )}
            {selectedCarService === "Engine Maintenance" && (
              <div className="relative">
                <label className="block mb-1 text-gray-700 text-xl">اختر خدمة المحرك</label>
                <select className="w-full p-3 border border-gray-300 rounded" required>
                  <option value="">اختر الخدمة</option>
                  <option value="Spark Plugs">استبدال شمعات الإشعال (200$)</option>
                  <option value="Fuel Injector Cleaning">تنظيف بخاخات الوقود (180$)</option>
                  <option value="Timing Belt Replacement">استبدال سير التوقيت (250$)</option>
                  <option value="All Options">جميع الخيارات (500$)</option>
                </select>
              </div>
            )}
            {selectedCarService === "Battery Replacement" && (
              <div className="relative">
                <label className="block mb-1 text-gray-700 text-xl">اختر خدمة البطارية</label>
                <select className="w-full p-3 border border-gray-300 rounded" required>
                  <option value="">اختر الخدمة</option>
                  <option value="Battery Testing">اختبار البطارية (80$)</option>
                  <option value="Battery Replacement">استبدال البطارية (150$)</option>
                  <option value="Battery Charging">شحن البطارية (60$)</option>
                </select>
              </div>
            )}
            {selectedCarService === "Piston Change" && (
              <div className="relative">
                <label className="block mb-1 text-gray-700 text-xl">اختر نوع الخدمة لبستم المحرك</label>
                <select className="w-full p-3 border border-gray-300 rounded" required>
                  <option value="">اختر الخدمة</option>
                  <option value="Basic Piston Service">خدمة أساسية (50$)</option>
                  <option value="Advanced Piston Service">خدمة متقدمة (70$)</option>
                </select>
              </div>
            )}
          </div>
          <div className="mt-6 flex flex-col items-center w-full relative text-right gap-4">
            <p className="mb-8 text-gray-600 text-xl font-medium">
              بالضغط على "إرسال المعلومات وتأكيد الحجز"، أؤكد صحة المعلومات وأوافق على اتصال فريق الدعم لتأكيد الحجز.
            </p>
            <div className="relative flex items-center gap-2 w-full justify-end">
              <input
                type="checkbox"
                id="confirmation-checkbox"
                onChange={handleCheckboxChange}
                checked={isChecked}
                className="w-5 h-5"
              />
              <label htmlFor="confirmation-checkbox" className="text-xl">
                أوافق على الشروط
              </label>
            </div>
            {showError && (
              <p className="absolute text-red-500 text-lg top-1/2 right-1">
                يرجى النقر على المربع قبل تأكيد الحجز.
              </p>
            )}
            <div className="flex flex-col items-center gap-4 mt-4 w-full">
              <button type="submit" className="w-1/2 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition text-base">
                إرسال المعلومات وتأكيد الحجز
              </button>
              <button type="button" className="w-1/2 bg-red-600 text-white p-3 rounded hover:bg-red-700 transition text-base" onClick={onCloseForm}>
                إغلاق
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};

export default Form;
