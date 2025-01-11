import React from "react";
import "./AdminLogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const AdminLogin = () => {
  return (
    <div className="container">
      <form className="theFormCountinar">
        {/* Header form */}
        <div className="headerForm">
          <h1>تسجيل دخول خاص بل أدمن</h1>
        </div>
        {/* Mid form */}
        <div className="midForm">
          <div> 
          <input type="email" placeholder="Enter Admin Email" required />
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          </div>
          
           <div> 
          <input type="password" placeholder="Password" required />
          <FontAwesomeIcon icon={faLock} className="icon" />
          </div>
        </div>
        {/* Footer form */}
        <div className="footerForm">
          <button type="button" className="loginBtn">
            تسجيل الدخول
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
