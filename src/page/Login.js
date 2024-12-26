import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../login/css/main.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
  });

  const [errors, setErrors] = useState({}); // To track validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '', // Clear the specific error when the user updates the field
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.Username) errors.Username = "Username is required.";
    if (!formData.Password) errors.Password = "Password is required.";
    return errors;
  };

  const check_login = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    data.append("Username", formData.Username);
    data.append("Password", formData.Password);

    fetch('http://localhost/ads_finder/getlogin.php', {
      method: 'POST',
      body: data,
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.Status === "true") {
          navigate(`/adsadd`);
        } else {
          alert(data.Message);
        }
      });
  };

  return (
    <>
      <div className="wrap-login100">
        <form className="login100-form validate-form" onSubmit={check_login}>
          <span className="login100-form-title p-b-26">Welcome</span>
          <span className="login100-form-title p-b-48">
            <i className="zmdi zmdi-font"></i>
          </span>

          {/* Username Field */}
          <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
            <input
              onChange={handleChange}
              className="input100"
              type="text"
              name="Username"
            />
            <span className="focus-input100" data-placeholder="Email"></span>
            {errors.Username && <small className="text-danger">{errors.Username}</small>}
          </div>

          {/* Password Field */}
          <div className="wrap-input100 validate-input" data-validate="Enter password">
            <span className="btn-show-pass">
              <i className="zmdi zmdi-eye"></i>
            </span>
            <input
              onChange={handleChange}
              className="input100"
              type="password"
              name="Password"
            />
            <span className="focus-input100" data-placeholder="Password"></span>
            {errors.Password && <small className="text-danger">{errors.Password}</small>}
          </div>

          {/* Submit Button */}
          <div className="container-login100-form-btn">
            <div className="wrap-login100-form-btn">
              <div className="login100-form-bgbtn"></div>
              <button className="login100-form-btn">Login</button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center p-t-115">
            <span className="txt1">Don’t have an account?</span>
            <a className="txt2" href="#">
              Sign Up
            </a>
          </div>
        </form>
      </div>
      <div id="dropDownSelect1"></div>
    </>
  );
};

export default Login;
