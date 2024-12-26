import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../home/css/style.css'


const Singleads = () => {
  // Use the useParams hook to get the route parameters
  const { id } = useParams();

  const [adData, setAdData] = useState({
    District: "",
    Amount: "",
    Ads_location: "",
    Image: null,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

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
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAdDetails();
  }, [id]);

  // Handle loading state
  if (loading) {
    return <p>Loading ad details...</p>;
  }

  // Handle error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (


    <div class="hero_area">
      <div class="hero_bg_box">
  <div class="bg_img_box">
    <img src="../home/images/hero-bg.png" alt=""/>
  </div>
</div>
      
      

    <header class="header_section">
      <div class="container-fluid">
        <nav class="navbar navbar-expand-lg custom_nav-container ">
          <a class="navbar-brand" href="index.html">
            <span>
            Ads Finder 

            </span>
          </a>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class=""> </span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav  ">
              <li class="nav-item active">
              <a class="nav-link" href="/"> About</a>
              </li>
              
              <li class="nav-item active">
                <a class="nav-link" href="/viewads">ViewAds</a>
              </li>
             
              <li class="nav-item active">
                <a class="nav-link" href="/"> <i class="fa fa-user" aria-hidden="true"></i> Home</a>
              </li>
              <form class="form-inline">
                <button class="btn  my-2 my-sm-0 nav_search-btn" type="submit">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
            </ul>
          </div>
        </nav>
      </div>
    </header>
    <div class ="container">

      <h1 class="white-text">Advertisement Details</h1>
      <p class="white-text">Ad ID: {id}</p>
      <p class="white-text"><strong>District:</strong> {adData.District}</p>
      <p class="white-text"><strong>Amount:</strong> {adData.Amount}</p>
      <p class="white-text"><strong>Location:</strong> {adData.Ads_location}</p>
      {adData.Image && (
        <div>
          <strong class="white-text">Image:</strong>
          <img src={adData.Image} alt="Ad Visual" style={{ width: "300px", height: "auto" }} />
        </div>
      )}
      </div>
    </div>
  );
};

export default Singleads;
