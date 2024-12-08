import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faEnvelope  } from '@fortawesome/free-solid-svg-icons';


const Form = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);

  // التحقق من صحة رقم الهاتف العراقي
  const validatePhoneNumber = (phoneNumber) => {
    const normalizedNumber = phoneNumber.replace(/\D/g, ''); // إزالة أي رموز غير أرقام
    const iraqRegex = /^(9647\d{9}|07\d{9}|7\d{8})$/; // الأنماط المقبولة
    return iraqRegex.test(normalizedNumber);
  };

  // عند تغيير رقم الهاتف
  const handleChange = (value) => {
    setPhoneNumber(value);
    setIsValid(validatePhoneNumber(value));
  };

  // عند التركيز على الحقل
  const handleFocus = () => {
    if (phoneNumber.startsWith('964')) {
      setPhoneNumber(phoneNumber.slice(3)); // إزالة المقدمة الدولية 964
    }
  };

  // عند فقدان التركيز
  const handleBlur = () => {
    if (!phoneNumber.startsWith('964') && !phoneNumber.startsWith('07')) {
      setPhoneNumber(`964${phoneNumber}`); // إعادة المقدمة الدولية إذا لم يبدأ الرقم بـ 07
    }
  };

  // عند إرسال الفورم
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      alert('يرجى تصحيح الأخطاء قبل الإرسال.');
    } else {
      alert(`تم إرسال البيانات بنجاح: ${phoneNumber}`);
    }
  };

  return (
    <section className="form-container">
        
  {/* <form onSubmit={handleSubmit}>
    <div className="form-header">
      <h1>معلومات التسجيل الشخصية</h1>
    </div>

    <div className="form-body">
      <div className="form-group">
        <input type="text" placeholder="الاسم الثلاثي" required />
        <FontAwesomeIcon icon= {faUser } className="icon" /> 


      
      </div>
      <div className="form-group">
        <input type="email" placeholder=" example@gmail.com الايميل " required />
        <FontAwesomeIcon icon= {faEnvelope} className="icon" /> 
      </div>
      <div className="form-group">
        <input type="password" placeholder="كلمة السر" required />
        <FontAwesomeIcon icon= {faLock} className="icon"/> 
        


        
      </div>
      <div className="form-group">
        <PhoneInput
          country={'iq'}
          value={phoneNumber}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          enableAreaCodes={true}
          required
          containerClass="phone-input"
        />
        {!isValid && (
          <p className="error-message">
            رقم الهاتف غير صالح
          </p>
        )}
      </div>
    </div>

    <div className="form-footer">
        <p>سيتم خزن وتشفير جميع البيانات لضمان السرية </p>
      <button type="submit">التالي</button>
    </div>
  </form> */}



 <form >
      {/* form heading */}
  <div className='form-header '>
         <h1> معلومات المركبة </h1>
  </div>
        
        <div className='form-body'>

           {/* input1 */}
          <div className='form-group'>
            <select name="" id="carTyp" required>
              <option value="">اختر نوع المركبة</option>
              <option value="AUDI A3"> أودي A3</option>
              <option value="AUDI A4"> AUDI A4</option>
              <option value="AUDI A6">AUDI A6  </option>
              <option value="AUDI A8">  AUDI A8</option>
              <option value="AUDI Q3"> AUDI Q3  </option>
              <option value="AUDI Q5"> AUDI Q5 </option>
              <option value="AUDI Q7"> AUDI Q7  </option>
              <option value="AUDI Q8"> AUDI Q8  </option>
              <option value="AUDI TT"> AUDI TT </option>
              <option value="AUDI R8"> AUDI R8  </option>
              
          
            </select>

          </div>

          {/* input2 */}
          <div className='form-group'>
          <select name="" id="carServise" required>
              <option value="">اختر نوع الخدمة</option>
              <option value="Oil Change"> تغير زيت السيارة </option>
              <option value="ُEngin Maintance"> صيانة المحرك</option>
              <option value="Bistem ">صيانة بستم المحرك  </option>
              <option value="Car Washing">  غسل وتنضيف المركبة</option>
              <option value="Car Breaks ">  صيانة المكابح  </option>
              <option value="Car Wheel ">  صيانة الاطارات   </option>
            
              
          
            </select>

          </div>
           {/* input3 */}
          <div className='form-group'>

          </div> 
           {/* input4*/}
          <div className='form-group'>

          </div>
          
        </div>
          




 </form>



</section>

  );
};

export default Form;
