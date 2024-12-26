import React, { useEffect, useState } from 'react'
import '../../home/css/style.css'
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
const ShowAds = () => {

    const navigate = useNavigate(); // To redirect after successful update
  
 const [clist, setAdsList] = useState([]);
  const [formData, setFormData] = useState({ District: '' });

  const getads = () => {
    fetch('http://localhost/ads_finder/getads.php')
      .then((result) => result.json())
      .then((responds) => {
        setAdsList(responds);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  };

  useEffect(() => {
    getads();
  }, []);


  const deleteads = (Ads_no) => {
    const data = new FormData();
    data.append("Ads_no", Ads_no);
    
        fetch('http://localhost/ads_finder/deleteads.php', {
          method: 'POST',
          body:data
      
        })
          .then((result) => result.json())
          .then((data) => {
            if(data.Status){
            getads();
            }
            else{
              alert(data.message)
    
            }
          })
         
      }

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
    <div class="hero_area">

    <div class="hero_bg_box">
      <div class="bg_img_box">
        <img src="../../home/images/hero-bg.png" alt=""/>
      </div>
    </div>
    
    
    <header class="header_section">
      <div class="container-fluid">
        <nav class="navbar navbar-expand-lg custom_nav-container ">
          <a class="navbar-brand" href="index.html">
            <span>
              Ads Finder Admin
            </span>
          </a>
    
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class=""> </span>
          </button>
    
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav  ">
              <li class="nav-item active">
              <a class="nav-link" href="/admin"> Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/adsadd"> Ads</a>
              </li>
             
              <li class="nav-item">
                <a class="nav-link" href="showads">Showads</a>
              </li>
              <li class="nav-item">
              <button onClick={handleLogout} className="btn btn-danger">LOGOUT</button>

          </li>
             
              
            </ul>
          </div>
        </nav>
      </div>
    </header>

    

  <section>

<div class="wrap-table table-bordered table-stripped">
  <table class="table table-bordered table-stripped">
    <thead>
        <th>slno</th>
        <th>District</th>
        <th>Amount</th>
        <th>Location</th>
        <th>image</th>
        <th>edit</th>
        <th>delete</th>
    </thead>
   <tbody>
       {clist.map((item, index) => (
                         <tr key={index}>
                           <td>{index + 1}</td>
                           <td>{item.District}</td>
                           <td>{item.Amount}</td>
                           <td>{item.Ads_location}</td>
                           <td><img src={item.Image} alt="Ad" /></td>
                           <td><Link to={`/editads/${item.Ads_no}`}><button class="btn btn-primary">EDIT</button></Link></td>
                           <td><button onClick={() =>{ deleteads(item.Ads_no) }} class="btn btn-danger">DELETE </button></td>
                           </tr>
                          ))}
    </tbody>
</table>
</div>


</section>

    </div>
    
  )
}

export default ShowAds