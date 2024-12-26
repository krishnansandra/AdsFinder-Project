import React from 'react'
import './home/css/style.css'


const About = () => {
  return (
    <div>




  <link rel="shortcut icon" href="./home/images/favicon.png" type="" / >

  <title> Finexo </title>

  
  <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />

  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet" />

  
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />

  <link href="css/font-awesome.min.css" rel="stylesheet" />


  <link href="css/style.css" rel="stylesheet" />
 
  <link href="css/responsive.css" rel="stylesheet" />


  <div class="hero_area">

    <div class="hero_bg_box">
      <div class="bg_img_box">
        <img src="./home/images/hero-bg.png" alt=""/>
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
              <a class="nav-link" href="/about"> About</a>
              </li>
              
              <li class="nav-item active">
                <a class="nav-link" href="viewads">ViewAds</a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="/"> <i class="fa fa-user" aria-hidden="true"></i> Home</a>
              </li>
             
             
            </ul>
          </div>
        </nav>
      </div>
    </header>

        
  <section class="about_section layout_padding">
    <div class="container  ">
      <div class="heading_container heading_center">
        <h2>
          About <span>Us</span>
        </h2>
        <p>
        An Ads Finder for Flex Boards is a specialized tool or service designed to identify the most effective physical locations for placing outdoor advertisements, such as flex boards or billboards. These tools or methods often focus on maximizing visibility and targeting the right audience. Here's how they work:        </p>
      </div>
      <div class="row">
        <div class="col-md-6 ">
          <div class="img-box">
            <img src="./home/images/about-img.png" alt=""/>
          </div>
        </div>
        <div class="col-md-6">
          <div class="detail-box">
            <h3>
Features            </h3>
            <p>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour, or randomised words which don't look even slightly believable. If you
              are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
              the middle of text. All
            </p>
            <p>
            Features of Flex Board Ads Finder:
Traffic Analysis:

Identifies high-traffic areas, including vehicle and pedestrian zones, where advertisements get maximum exposure.
Demographic Targeting:

Assesses the demographics of specific areas to match the audience with the product or service.
Visibility Studies:

Evaluates visibility angles, lighting, and obstructions to ensure the ad will be clearly seen.
Locality Insights:

Suggests popular hotspots like marketplaces, highways, or public transport hubs for flex board placement.
Cost Optimization:

Compares costs of renting or setting up boards in different locations to find the best value.
            </p>
            
          </div>
        </div>
      </div>
    </div>
  </section>



  

  
  <section class="footer_section">
    <div class="container">
      <p>
        &copy; <span id="displayYear"></span> All Rights Reserved By
        <a href="https://html.design/">Free Html Templates</a>
      </p>
    </div>
  </section>

  
 
    </div>
    </div>
  )
}

export default About