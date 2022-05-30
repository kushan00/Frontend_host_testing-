import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import image from "../images/hotelhome.jpg";
import image2 from "../images/hotelbooking.png";
import Map from './Map';
import "./style.css"

export default function Home() {

  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/Login");
  }

  const handleSignUp = () => {
    navigate("/register");
  }

  return (
    <div>
      <center>
        <div style={{ marginTop: "30px" }}>
          <center><h1 style={{ color: "black" }}><b>Welcome to Avanya Hotel</b></h1></center>
        </div>
        <br />
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/Home">Home</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">

                {/* System Admin pages */}
                <a style={{ display: localStorage.getItem("userRole") == "systemAdmin" ? "flex" : "none" }} className="nav-link active" aria-current="page" href="/AllRooms">All Rooms</a>
                <a style={{ display: localStorage.getItem("userRole") == "systemAdmin" ? "flex" : "none" }} className="nav-link active" href="/AllResevations" aria-current="page">All Resevations</a>
                <a style={{ display: localStorage.getItem("userRole") == "systemAdmin" ? "flex" : "none" }} className="nav-link active" href="/AllCustomers" aria-current="page">All Customers</a>
                <a style={{ display: localStorage.getItem("userRole") == "systemAdmin" ? "flex" : "none" }} className="nav-link active" href="/AllHotelAdmin" aria-current="page">All Hotel Admins</a>

                {/* Hotel admin Pages */}
                <a style={{ display: localStorage.getItem("userRole") == "hotelAdmin" ? "flex" : "none" }} className="nav-link active" href="/AllCustomers" aria-current="page">All Customers</a>
                <a style={{ display: localStorage.getItem("userRole") == "hotelAdmin" ? "flex" : "none" }} className="nav-link active" href="/AllRooms" aria-current="page">All Rooms</a>
                <a style={{ display: localStorage.getItem("userRole") == "hotelAdmin" ? "flex" : "none" }} className="nav-link active" href="/AllResevations" aria-current="page">All Resevations</a>

                {/* Customer Pages */}
                <a style={{ display: localStorage.getItem("userRole") == "customer" ? "flex" : "none" }} className="nav-link active" href="/BookRoom" aria-current="page">Rooms</a>
                <a style={{ display: localStorage.getItem("userRole") == "customer" ? "flex" : "none" }} className="nav-link active" href="/CutomerProfile" aria-current="page">My Profile</a>

              </div>
            </div>
          </div>
          <button onClick={handleSubmit} className="btn btn-primary" type="submit" style={{ float: "right", marginRight: "10px" }}>
            {!localStorage.getItem("userRole") ? "Login" : "Logout"}
          </button>
          <button onClick={handleSignUp} className="btn btn-primary" type="submit" style={{ float: "right", marginRight: "10px", width: "100px", display: localStorage.getItem('userRole') ? "none" : "flex" }}>
            Sign Up
          </button>
        </nav>
      </center>
      <div>
        <br />
        <center>
        <p style={{ marginLeft: "20px", fontFamily: "Times New Roman", fontSize: "20px" }}>
          <b>Avanya is delighted to unveil a stunning new look that perfectly complements the distinctive designs of renowned architect Geoffrey Bawa. Enjoy our new contemporary vibe in the lobby, restaurants, bars and ballroom. Settle into stylish comfort in the sensational Avani Ocean View Pool Suites, Avani Ocean View Suites and Avani Deluxe Ocean View Rooms with tropical views over the Indian Ocean and the Kalu River. Welcome to paradise.

          Wrapped by water on three sides, live the tropical island jungle life, where colonial charm blends with sophisticated style.

          105 rooms and suites
          Geoffrey Bawa-inspired design
          55-minute drive from Bandaranaike International Airport
          Spectacular views of lagoon and ocean
          Access to the Anantara Spa and restaurants at Anantara Kalutara Resort
          State-of-the-art ballroom facilities</b>

        </p>
        </center>
        <center><img src={image} style={{ width: "80%" }} /></center>
        <br></br>
        <center><img src={image2} style={{ width: "80%" }} /></center>

      </div>
      <br />
      <br />
      <div>
        <center><h1 style={{ color: "black" }}>Find Us On Google map</h1></center>
        <center><Map /></center>
      </div>
    </div>
  )
}
