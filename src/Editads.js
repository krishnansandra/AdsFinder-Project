import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './home/css/style.css'


const Editads = () => {
  const { id } = useParams(); // Get the ad ID from the URL
  const navigate = useNavigate(); // To redirect after successful update
  const [adData, setAdData] = useState({
    District: "",
    Amount: "",
    Ads_location: "",
    Image: null,
  });

  const [error, setError] = useState(null);

  // Fetch existing ad details
  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await fetch(`http://localhost/ads_finder/getadsbyid.php?ads_id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch ad details");
        }
        const data = await response.json();
        setAdData({
          District: data.District,
          Amount: data.Amount,
          Ads_location: data.Ads_location,
          Image: data.Image,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAdDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdData({ ...adData, [name]: value });
  };

  const handleFileChange = (e) => {
    setAdData({ ...adData, Image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Ads_no", id);
    formData.append("District", adData.District);
    formData.append("Amount", adData.Amount);
    formData.append("Ads_location", adData.Ads_location);
 

    try {
      const response = await fetch("http://localhost/ads_finder/updateads.php", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.Status) {
        alert("Ad updated successfully");
        navigate("/showads"); // Redirect to the ads list
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Error updating the ad: " + error.message);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (

    <div class="hero_area">

    <div class="hero_bg_box">
      <div class="bg_img_box">
        <img src="../../home/images/hero-bg.png" alt=""/>
      </div>
    </div>
    <div class="container">
      <h1 class="white-text">Edit Ad</h1>
      <form onSubmit={handleSubmit}>
        
      <div>
          <label class="white-text">Ditrict:</label>
          <input class="form-control"

            type="text"
            name="Ditrict"
            value={adData.District}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label class="white-text">Amount:</label>
          <input class="form-control"

            type="number"
            name="Amount"
            value={adData.Amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label class="white-text">Location:</label>
          <input class="form-control"

            type="text"
            name="Ads_location"
            value={adData.Ads_location}
            onChange={handleInputChange}
            required
          />
        </div>
        <br/>
          
        <button  class="btn btn-success"type="submit">Update Ad</button>
      </form>
    
    </div>
  </div>
  );
};

export default Editads;
