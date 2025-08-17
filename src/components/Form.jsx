/* eslint-disable react/prop-types, no-unused-vars, react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';

const Form = ({ onCloseForm, selectedService, isAuthenticated, onLogin }) => {
  // تخزين نوع الخدمة المختارة من قسم الخدمات
  const [selectedCarService, setSelectedCarService] = useState('');
  useEffect(() => {
    if (selectedService) {
      setSelectedCarService(selectedService);
    }
  }, [selectedService]);

  // بيانات التسجيل (للمستخدم الجديد)
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');

  // بيانات تسجيل الدخول للمستخدم العائد
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');

  // حالة رقم الهاتف والتحقق منه
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);

  // حالة checkbox والشروط
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  // تحديد الخطوة الحالية
  const [currentStep, setCurrentStep] = useState(isAuthenticated ? 2 : 1);
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  }, [isAuthenticated]);

  // حالات معلومات المركبة
  const [carType, setCarType] = useState('');
  const [branchName, setBranchName] = useState('');
  // حالة الخدمة الفرعية (على سبيل المثال Oil Change)
  const [subService, setSubService] = useState('');

  // دالة التحقق من رقم الهاتف (حسب الصيغة العراقية)
  const validatePhoneNumber = (phoneNumber) => {
    const normalizedNumber = phoneNumber.replace(/\D/g, '');
    const iraqRegex = /^(9647\d{9}|07\d{9}|7\d{8})$/;
    return iraqRegex.test(normalizedNumber);
  };

  const handleChange = (value) => {
    setPhoneNumber(value);
    setIsValid(validatePhoneNumber(value));
  };

  const handleFocus = () => {
    if (phoneNumber.startsWith('964')) {
      setPhoneNumber(phoneNumber.slice(3));
    }
  };

  const handleBlur = () => {
    if (!phoneNumber.startsWith('964') && !phoneNumber.startsWith('07')) {
      setPhoneNumber(`964${phoneNumber}`);
    }
  };

  // دالة إرسال بيانات التسجيل (للمستخدم الجديد)
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'يرجى الموافقة على الشروط قبل المتابعة.',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#d33',
      });
      return;
    }
    console.log('Submitting registration form...', {
      userName,
      phoneNumber,
      userPass,
    });
    if (!userName || !phoneNumber || !userPass) {
      alert('يرجى ملء جميع الحقول قبل المتابعة.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3000/api/users/register', {
        name: userName,
        phoneNumber,
        password: userPass,
      });
      if (res.data && res.data.token) {
        const token = res.data.token;
        console.log('Register successful. Token:', token);
        localStorage.setItem('token', token);
        onLogin(userName);
        onCloseForm();
        Swal.fire({
          title: 'تم التسجيل!',
          icon: 'success',
          confirmButtonText: 'حسناً',
          confirmButtonColor: '#28a745',
          timer: 2000,
          width: '300px',
          padding: '0.8rem',
          customClass: {
            title: 'swal-small-title',
            popup: 'swal-small-popup',
            confirmButton: 'swal-small-button',
          },
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      } else {
        alert('حدث خطأ غير متوقع أثناء التسجيل. الرجاء المحاولة لاحقاً.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response && error.response.data) {
        Swal.fire({
          text: 'لا يمكن استخدام معلومات مسجلة مسبقاً',
          icon: 'error',
          confirmButtonText: 'حسناً',
          confirmButtonColor: '#d33',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCloseButton: true,
        });
      } else {
        Swal.fire({
          text: 'تعذر الاتصال بالخادم. الرجاء المحاولة لاحقاً.',
          icon: 'error',
          confirmButtonText: 'حسناً',
          confirmButtonColor: '#d33',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCloseButton: true,
        });
      }
    }
  };

  // دالة إرسال بيانات تسجيل الدخول (للمستخدم العائد)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users/login', {
        phoneNumber,
        password: loginPassword,
      });
      const token = res.data.token;
      console.log('Token from server:', token);
      localStorage.setItem('token', token);

      const userRes = await axios.get('http://localhost:3000/api/users/', {
        headers: { 'x-auth-token': token },
      });
      console.log('User data:', userRes.data);
      onLogin(userRes.data.name || userRes.data.username);
      onCloseForm();
      Swal.fire({
        toast: true,
        position: 'center',
        icon: 'success',
        title: 'تم تسجيل الدخول بنجاح!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        Swal.fire({
          title: 'خطأ في تسجيل الدخول ❌',
          text: 'المعلومات المدخلة غير صحيحة. يرجى التحقق من رقم الجوال أو كلمة المرور والمحاولة مرة أخرى.',
          icon: 'error',
          confirmButtonText: 'حسناً',
          confirmButtonColor: '#d33',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCloseButton: true,
        });
      } else {
        console.error(error);
        Swal.fire({
          title: 'خطأ في تسجيل الدخول',
          text: 'تعذر الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
          icon: 'error',
          confirmButtonText: 'حسناً',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  // دالة إرسال بيانات حجز المركبة (للمستخدم المسجّل)
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'يرجى الموافقة على الشروط قبل تأكيد الحجز.',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#d33',
      });
      return;
    }
    if (!carType || !branchName || !selectedCarService) {
      alert('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }
    if (selectedCarService === 'Oil Change' && !subService) {
      alert('يرجى اختيار نوع الزيت.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/api/order',
        {
          car_name: carType,
          branch_name: branchName,
          service_name: selectedCarService,
          selected_sub_service: subService,
          confirmed: true,
        },
        { headers: { 'x-auth-token': token } }
      );
      console.log('Order created successfully:', res.data);
      Swal.fire({
        title: 'تم تأكيد الحجز ✅',
        text: 'تم حجز الخدمة بنجاح! سيقوم فريق العمل بالتواصل معك قريباً لتأكيد موعد الحجز والتفاصيل الأخرى. شكرًا لاختيارك خدمتنا! 🚗',
        icon: 'success',
        confirmButtonText: 'حسناً',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCloseButton: true,
        confirmButtonColor: '#28a745',
      });
      onCloseForm();
    } catch (error) {
      console.error('Error creating order:', error);
      if (error.response && error.response.data) {
        alert(error.response.data.msg || 'حدث خطأ أثناء إنشاء الطلب.');
      } else {
        Swal.fire({
          text: 'تعذر الاتصال بالخادم. الرجاء المحاولة لاحقاً.',
          icon: 'error',
          confirmButtonText: 'حسناً',
          confirmButtonColor: '#d33',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCloseButton: true,
        });
      }
    }
  };

  // دالة تغيير حالة checkbox
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setShowError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* خلفية مودال مع تأثير ضبابي */}
      <div className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
      <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300">
        {/* المحتوى حسب حالة المستخدم */}
        {!isAuthenticated ? (
          <>
            {isReturningUser ? (
              // فورم تسجيل الدخول
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-4 text-center">
                  <h1 className="text-2xl font-bold text-blue-600">
                    تسجيل الدخول
                  </h1>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <PhoneInput
                      country={'iq'}
                      value={phoneNumber}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      enableAreaCodes={true}
                      required
                      containerClass="w-full"
                      inputClass="w-full p-3 border border-gray-300 rounded shadow"
                    />
                    {!isValid && (
                      <p className="text-red-500 text-sm mt-1">
                        رقم الهاتف غير صالح
                      </p>
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
                    <FontAwesomeIcon
                      icon={faLock}
                      className="absolute right-3 top-3 text-gray-500"
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col items-center">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-all"
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    type="button"
                    className="mt-4 w-full bg-gray-300 text-gray-800 p-3 rounded hover:bg-gray-400 transition-all"
                    onClick={() => setIsReturningUser(false)}
                  >
                    العودة للتسجيل
                  </button>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="text-red-600 hover:underline"
                      onClick={onCloseForm}
                    >
                      إغلاق
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              // فورم التسجيل
              <form onSubmit={handleRegisterSubmit}>
                <div className="mb-4 text-center">
                  <h1 className="text-2xl font-bold text-blue-600">
                    معلومات التسجيل الشخصية
                  </h1>
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
                    <FontAwesomeIcon
                      icon={faUser}
                      className="absolute right-3 top-3 text-gray-500"
                    />
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
                    <FontAwesomeIcon
                      icon={faLock}
                      className="absolute right-3 top-3 text-gray-500"
                    />
                  </div>
                  <div className="relative">
                    <PhoneInput
                      country={'iq'}
                      value={phoneNumber}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      enableAreaCodes={true}
                      required
                      containerClass="w-full"
                      inputClass="w-full p-3 border border-gray-300 rounded shadow"
                    />
                    {!isValid && (
                      <p className="text-red-500 text-sm mt-1">
                        رقم الهاتف غير صالح
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex flex-col items-center text-right relative">
                  <p className="mb-8 text-gray-600 text-xl font-medium">
                    بالضغط على "تسجيل "، أؤكد صحة المعلومات وأوافق على اتصال
                    فريق الدعم لتأكيد الحجز.
                  </p>
                  <div className="flex items-center gap-2 justify-end">
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
                    <button
                      type="submit"
                      className="w-1/2 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-all text-base"
                    >
                      تسجيل
                    </button>
                    <button
                      type="button"
                      className="w-1/2 bg-gray-300 text-white p-3 rounded hover:bg-gray-400 transition-all text-base"
                      onClick={() => setIsReturningUser(true)}
                    >
                      اضغط هنا اذا كان لديك حساب مسجل مسبقا
                    </button>
                    <button
                      type="button"
                      className="w-1/2 bg-red-600 text-white p-3 rounded hover:bg-red-700 transition-all text-base"
                      onClick={onCloseForm}
                    >
                      إغلاق
                    </button>
                  </div>
                </div>
              </form>
            )}
          </>
        ) : (
          // إذا كان المستخدم مسجّل، نعرض فورم معلومات المركبة فقط
          <form onSubmit={handleBookingSubmit}>
            <div className="mb-4 text-center">
              <h1 className="text-2xl font-bold text-blue-600">
                معلومات المركبة
              </h1>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <select
                  id="carType"
                  className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                  value={carType}
                  onChange={(e) => setCarType(e.target.value)}
                >
                  <option value="">اختر نوع المركبة</option>
                  <option value="AUDI A3">أودي A3</option>
                  <option value="AUDI A4">AUDI A4</option>
                  <option value="AUDI A6">AUDI A6</option>
                  <option value="AUDI A8">AUDI A8</option>
                  <option value="AUDI Q3">أودي Q3</option>
                  <option value="AUDI Q5">AUDI Q5</option>
                  <option value="AUDI Q7">AUDI Q7</option>
                  <option value="AUDI Q8">AUDI Q8</option>
                  <option value="AUDI TT">أودي TT</option>
                  <option value="AUDI R8">AUDI R8</option>
                </select>
              </div>
              <div className="relative">
                <select
                  id="branch_name"
                  className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                >
                  <option value="">اختر اقرب فرع اليك</option>
                  <option value="فرع الكرادة">فرع الكرادة</option>
                  <option value="فرع الأعظمية">فرع الأعظمية</option>
                  <option value="فرع المنصور">فرع المنصور</option>
                  <option value="فرع شارع فلسطين">فرع شارع فلسطين</option>
                  <option value="الكاظمية">الكاظمية</option>
                  <option value="حي القاهرة">حي القاهرة</option>
                </select>
              </div>
              <div className="relative">
                <select
                  id="carService"
                  className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
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
                  <option value="Electrical System Repair">
                    إصلاح أنظمة الكهرباء
                  </option>
                  <option value="Battery Replacement">
                    فحص وتبديل البطارية
                  </option>
                </select>
              </div>
              {/* خدمة فرعية لكل نوع خدمة */}
              {selectedCarService === 'Oil Change' && (
                <div className="relative">
                  <label className="block mb-1 text-gray-700 text-xl">
                    اختر نوع الزيت
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                    value={subService}
                    onChange={(e) => setSubService(e.target.value)}
                  >
                    <option value="">اختر نوع الزيت</option>
                    <option value="Full Synthetic">
                      زيت تخليقي بالكامل (150$)
                    </option>
                    <option value="Semi Synthetic 140$">
                      زيت شبه تخليقي (140$)
                    </option>
                    <option value="Mineral">زيت صناعي (130$)</option>
                  </select>
                </div>
              )}
              {selectedCarService === 'Car Washing' && (
                <div className="relative">
                  <label className="block mb-1 text-gray-700 text-xl">
                    اختر نوع الغسيل
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                    value={subService}
                    onChange={(e) => setSubService(e.target.value)}
                  >
                    <option value="">اختر نوع الغسيل</option>
                    <option value="Interior">غسيل داخلي (50$)</option>
                    <option value="Exterior">غسيل خارجي (40$)</option>
                    <option value="Full">غسيل شامل (70$)</option>
                  </select>
                </div>
              )}
              {selectedCarService === 'Tire Maintenance' && (
                <div className="relative">
                  <label className="block mb-1 text-gray-700 text-xl">
                    اختر نوع الأطارات
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                    value={subService}
                    onChange={(e) => setSubService(e.target.value)}
                  >
                    <option value="">:الإطارات الصيفية</option>
                    <option value="summer1">
                      (50$) بريجستون بوتنزا RE-71RS
                    </option>
                    <option value="summer2">فايرستون إندي (40$)</option>
                    <option value="summer3">(70$) ميشلان بايلوت سبورتS</option>
                    <option value="">:الإطارات الشتوية</option>
                    <option value="winnter1">
                      بيريلي سكوربيون وينتر (50$)
                    </option>
                    <option value="winnter2">نيوكين هاكابليتا (40$)</option>
                    <option value="winnter3">ميشلان بايلوت ألبين (70$)</option>
                  </select>
                </div>
              )}
              {selectedCarService === 'Brake Maintenance' && (
                <div className="relative">
                  <label className="block mb-1 text-gray-700 text-xl">
                    حدد نوع الخدمة
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                    value={subService}
                    onChange={(e) => setSubService(e.target.value)}
                  >
                    <option value="">اختار خدمة فرعية</option>
                    <option value="Brake Pads">Brake Pads (20$)</option>
                    <option value="Brake Rotors/Discs">
                      Brake Rotors/Discs (40$)
                    </option>
                    <option value="Brake Fluid Flush">
                      Brake Fluid Flush (50$)
                    </option>
                    <option value="ABS">فحص وإصلاح نظام ABS (20$)</option>
                    <option value="all">جميع الخيارات (130$)</option>
                  </select>
                </div>
              )}
              {selectedCarService === 'Electrical System Repair' && (
                <div className="relative">
                  <label className="block mb-1 text-gray-700 text-xl">
                    اختر خدمة أنظمة الكهرباء
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                    value={subService}
                    onChange={(e) => setSubService(e.target.value)}
                  >
                    <option value="">اختر الخدمة</option>
                    <option value="Alternator Repair">
                      إصلاح المولد (120$)
                    </option>
                    <option value="Starter Motor Repair">
                      إصلاح موتور التشغيل (130$)
                    </option>
                    <option value="Wiring Diagnosis">
                      تشخيص الأسلاك (100$)
                    </option>
                    <option value="All Options">جميع الخيارات (320$)</option>
                  </select>
                </div>
              )}
              {selectedCarService === 'Engine Maintenance' && (
                <div className="relative">
                  <label className="block mb-1 text-gray-700 text-xl">
                    اختر خدمة المحرك
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                    value={subService}
                    onChange={(e) => setSubService(e.target.value)}
                  >
                    <option value="">اختر الخدمة</option>
                    <option value="Spark Plugs">
                      استبدال شمعات الإشعال (200$)
                    </option>
                    <option value="Fuel Injector Cleaning">
                      تنظيف بخاخات الوقود (180$)
                    </option>
                    <option value="Timing Belt Replacement">
                      استبدال سير التوقيت (250$)
                    </option>
                    <option value="All Options">جميع الخيارات (500$)</option>
                  </select>
                </div>
              )}
              {selectedCarService === 'Battery Replacement' && (
                <div className="relative">
                  <label className="block mb-1 text-gray-700 text-xl">
                    اختر خدمة البطارية
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                    value={subService}
                    onChange={(e) => setSubService(e.target.value)}
                  >
                    <option value="">اختر الخدمة</option>
                    <option value="Battery Testing">
                      اختبار البطارية (80$)
                    </option>
                    <option value="Battery Replacement">
                      استبدال البطارية (150$)
                    </option>
                    <option value="Battery Charging">شحن البطارية (60$)</option>
                  </select>
                </div>
              )}
              {selectedCarService === 'Piston Change' && (
                <div className="relative">
                  <label className="block mb-1 text-gray-700 text-xl">
                    اختر نوع الخدمة لبستم المحرك
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                    value={subService}
                    onChange={(e) => setSubService(e.target.value)}
                  >
                    <option value="">اختر الخدمة</option>
                    <option value="Basic Piston Service">
                      خدمة أساسية (50$)
                    </option>
                    <option value="Advanced Piston Service">
                      خدمة متقدمة (70$)
                    </option>
                  </select>
                </div>
              )}
            </div>
            <div className="mt-6 flex flex-col items-center relative text-right gap-4">
              <p className="mb-8 text-gray-600 text-xl font-medium">
                بالضغط على "إرسال المعلومات وتأكيد الحجز"، أؤكد صحة المعلومات
                وأوافق على اتصال فريق الدعم لتأكيد الحجز.
              </p>
              <div className="flex items-center gap-2 justify-end">
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
                <button
                  type="submit"
                  className="w-1/2 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-all text-base"
                >
                  إرسال المعلومات وتأكيد الحجز
                </button>
                <button
                  type="button"
                  className="w-1/2 bg-red-600 text-white p-3 rounded hover:bg-red-700 transition-all text-base"
                  onClick={onCloseForm}
                >
                  إغلاق
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Form;
