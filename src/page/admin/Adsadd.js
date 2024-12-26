import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Adsadd = () => {
  const navigate = useNavigate();

  const [clist, setAddList] = useState([]);
  const [formData, setFormData] = useState({
    District: '',
    Amount: '',
    Ads_location: '',
    Image: '',
    Map: ''
  });

  const handle_change = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '' // Clear specific field error
    });
  };
  const [errors, setErrors] = useState({}); // To track validation errors

  const getads = () => {
    fetch('http://localhost/ads_finder/getads.php')
      .then(result => result.json())
      .then(responds => setAddList(responds));
  };

  useEffect(() => {
    getads();
  }, []);

  const validate = () => {
    const errors = {};
    if (!formData.District) errors.District = "District is required.";
    if (!formData.Amount) errors.Amount = "Amount is required.";
    else if (isNaN(formData.Amount)) errors.Amount = "Amount must be a number.";
    if (!formData.Ads_location) errors.Ads_location = "Ads location is required.";
    if (!formData.Image) errors.Image = "Image is required.";
    if (!formData.Map) errors.Map = "Map is required.";
    return errors;
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, Image: e.target.files[0] });
      setErrors({ ...errors, Image: '' }); // Clear file-specific error
    } else {
      setErrors({ ...errors, Image: "No file selected!" });
    }
  };

  const saveads = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const data = new FormData();
    data.append("District", formData.District);
    data.append("Amount", formData.Amount);
    data.append("Ads_location", formData.Ads_location);
    data.append("Image", formData.Image);
    data.append("Map", formData.Map);
  
    fetch('http://localhost/ads_finder/saveads.php', {
      method: 'POST',
      body: data,
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.Status === "true") {
          alert("Ad created successfully");
          setFormData({
            District: '',
            Amount: '',
            Ads_location: '',
            Image: '',
            Map: '',
          });
          setErrors({});
          window.location.reload(); // Refresh the page
        } else {
          alert(data.Message);
        }
      });
  };
  
  

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      // Clear authentication data from localStorage or sessionStorage
      localStorage.removeItem('authToken');
      sessionStorage.clear();
  
      // Replace the current history stack
      navigate('/admin', { replace: true });
  
      // Prevent going back using browser navigation
      window.history.pushState(null, document.title, window.location.href);
window.addEventListener('popstate', function () {
  window.history.pushState(null, document.title, window.location.href);
});
    }
  };
  

  

  return (
    <div className="hero_area">
      <div className="hero_bg_box">
        <div className="bg_img_box">
          <img src="../../home/images/hero-bg.png" alt="" />
        </div>
      </div>

      <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="index.html">
              <span>Ads Finder Admin</span>
            </a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="/admin">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="showads">Editads</a>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger">LOGOUT</button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-head p-3">
                <h5>ADS DETAILS</h5>
              </div>
              <div className="card-body">
                <form onSubmit={saveads} className="row g-3">
                  <div className="col-md-4">
                    <select onChange={handle_change} id="districtDropdown" name="District" className="form-select">
                      <option value="" disabled selected>Select District</option>
                      <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                      <option value="Kollam">Kollam</option>
                      <option value="Pathanamthitta">Pathanamthitta</option>
                      <option value="Alappuzha">Alappuzha</option>
                      <option value="Kottayam">Kottayam</option>
                      <option value="Idukki">Idukki</option>
                      <option value="Ernakulam">Ernakulam</option>
                      <option value="Thrissur">Thrissur</option>
                      <option value="Palakkad">Palakkad</option>
                      <option value="Malappuram">Malappuram</option>
                      <option value="Kozhikode">Kozhikode</option>
                      <option value="Wayanad">Wayanad</option>
                      <option value="Kannur">Kannur</option>
                      <option value="Kasaragod">Kasaragod</option>
                    </select>
                    {errors.District && <small className="text-danger">{errors.District}</small>}
                  </div>
                  <div>
                    <label htmlFor="Amount" className="form-label">Amount</label>
                    <input onChange={handle_change}
                      name="Amount"
                      type="text"
                      className="form-control"
                      id="Amount"
                    />
                    {errors.Amount && <small className="text-danger">{errors.Amount}</small>}
                  </div>
                  <div>
                    <label htmlFor="Ads_location" className="form-label">Ads Location</label>
                    <input onChange={handle_change}
                      name="Ads_location"
                      type="text"
                      className="form-control"
                      id="Ads_location"
                    />
                    {errors.Ads_location && <small className="text-danger">{errors.Ads_location}</small>}
                  </div>
                  <div>
                    <label htmlFor="Image" className="form-label">Image</label>
                    <input onChange={handleFileChange}
                      name="Image"
                      type="file"
                      className="form-control"
                      id="Image"
                    />
                    {errors.Image && <small className="text-danger">{errors.Image}</small>}
                  </div>
                  <div>
                    <label htmlFor="Map" className="form-label">Map</label>
                    <input onChange={handle_change}
                      name="Map"
                      type="text"
                      className="form-control"
                      id="Map"
                    />
                    {errors.Map && <small className="text-danger">{errors.Map}</small>}
                  </div>
                  <div className="col-md-12 text-end">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adsadd;
