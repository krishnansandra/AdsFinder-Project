import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../home/css/style.css';

const ViewAds = () => {
  const [clist, setAdsList] = useState([]); // All ads
  const [selectedDistrict, setSelectedDistrict] = useState(''); // Selected district
  const [amount, setAmount] = useState(''); // Entered amount
  const [filteredAds, setFilteredAds] = useState([]); // Filtered ads to display
  const [error, setError] = useState(''); // Validation error message

  // Fetch Ads from Backend
  const getAds = () => {
    fetch('http://localhost/ads_finder/getads.php')
      .then((result) => result.json())
      .then((responds) => {
        setAdsList(responds);
      })
      .catch((error) => console.error('Error fetching ads:', error));
  };

  useEffect(() => {
    getAds();
  }, []);

  // Handle Dropdown Change
  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setError(''); // Clear any existing error
  };

  // Handle Amount Input Change
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setError(''); // Clear any existing error
  };

  // Handle Submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedDistrict && !amount) {
      setError('Please select a district or enter an amount.');
      return;
    }

    const filtered = clist.filter((ad) => {
      const matchesDistrict = selectedDistrict
        ? ad.District === selectedDistrict
        : true;
      const matchesAmount = amount
        ? parseFloat(ad.Amount) <= parseFloat(amount)
        : true;

      return matchesDistrict && matchesAmount;
    });

    setFilteredAds(filtered);

    if (filtered.length > 0) {
      setError('');
    } else {
      setError('No ads found matching the criteria.');
    }
  };

  return (
    <div className="hero_area">
      <div className="hero_bg_box">
        <div className="bg_img_box">
          <img src="../home/images/hero-bg.png" alt="" />
        </div>
      </div>

      <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="index.html">
              <span>Ads Finder</span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className=""> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    About
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    <i className="fa fa-user" aria-hidden="true"></i> Home
                  </a>
                </li>
                <form className="form-inline">
                  <button
                    className="btn my-2 my-sm-0 nav_search-btn"
                    type="submit"
                  >
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </form>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <h1 className="white-text">Ads Detail</h1>
      <div className="container mt-5">
        <div className="row g-0">
          <div className="col-md-12">
            <div className="card-body">
              <form
                className="row g-3 align-items-center"
                onSubmit={handleSubmit}
              >
                <div className="col-md-6">
                  <label htmlFor="districtDropdown" className="white-text">
                    Enter District
                  </label>
                  <select
                    id="districtDropdown"
                    name="district"
                    className="form-select"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                  >
                    <option value="" disabled>
                      Select District
                    </option>
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
                </div>
                <div className="col-md-4">
                  <label htmlFor="amountInput" className="white-text">
                    Enter Amount
                  </label>
                  <input
                    type="number"
                    id="amountInput"
                    className="form-control"
                    placeholder="Enter max amount"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-success mt-4">
                    Submit
                  </button>
                </div>
                {error && <div className="text-danger">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {filteredAds.length > 0 ? (
          <table className="table table-bordered table-stripped">
            <thead>
              <tr>
                <th className="white-text">Image</th>
                <th className="white-text">Map</th>
              </tr>
            </thead>
            <tbody>
              {filteredAds.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/show-ads/${item.Ads_no}`}>
                      <img
                        src={item.Image}
                        alt="Ad"
                        style={{ width: '100px', height: 'auto' }}
                      />
                    </Link>
                  </td>
                  <td>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.Map }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="white-text">No ads found matching the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAds;
