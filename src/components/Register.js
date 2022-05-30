import React , {useState} from 'react';
import { Link , useNavigate } from "react-router-dom";
import {RegisterCustomer} from '../services/AuthServices';

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileno, setMobileno] = useState('');
  const [password, setPassword] = useState('');
 
 

  const handleName = (e) => {
    setName(e.target.value);
  };
 

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
 
  const handlemobileno = (e) => {
    setMobileno(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
        alert("Fill all the data");
    } else {
        let newdata = {
            name:name,
            email:email,
            mobileno:mobileno,
            password:password,
        }
        let cusdata =  await RegisterCustomer(newdata);
        console.log("return data",cusdata);
        localStorage.setItem("token",cusdata.data.token);
        localStorage.setItem("userRole",cusdata.data.userRole);
        navigate('/Home')
    }
  };
 


  return (
    <div >
            <center>
      <div style={{marginTop:"30px"}}>
          <center><h1 style={{color:"purple"}}><b>Welcome to Avanya Hotel</b></h1></center> 
        </div>
        <br/>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid">
                   <a className="navbar-brand" href="/Home">Home</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
               <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                 <div className="navbar-nav">

                   {/* System Admin pages */}
                   <a style={{display:localStorage.getItem("userRole") == "systemAdmin" ?"flex":"none"}} className="nav-link active" aria-current="page" href="/AllRooms">All Rooms</a>
                   <a style={{display:localStorage.getItem("userRole") == "systemAdmin" ?"flex":"none"}} className="nav-link active" href="/AllResevations" aria-current="page">All Resevations</a>
                   <a style={{display:localStorage.getItem("userRole") == "systemAdmin" ?"flex":"none"}} className="nav-link active" href="/AllCustomers" aria-current="page">All Customers</a>    
                   <a style={{display:localStorage.getItem("userRole") == "systemAdmin" ?"flex":"none"}} className="nav-link active" href="/AllHotelAdmin" aria-current="page">All Hotel Admins</a> 

                  {/* Hotel admin Pages */}
                  <a style={{display:localStorage.getItem("userRole") == "hotelAdmin" ?"flex":"none"}} className="nav-link active" href="/AllCustomers" aria-current="page">All Customers</a>  
                  <a style={{display:localStorage.getItem("userRole") == "hotelAdmin" ?"flex":"none"}} className="nav-link active" href="/AllRooms" aria-current="page">All Rooms</a>  
                  <a style={{display:localStorage.getItem("userRole") == "hotelAdmin" ?"flex":"none"}} className="nav-link active" href="/AllResevations" aria-current="page">All Resevations</a>   
                  
                  {/* Customer Pages */}
                  <a style={{display:localStorage.getItem("userRole") == "customer" ?"flex":"none"}} className="nav-link active" href="/BookRoom" aria-current="page">Rooms</a>  
                  <a style={{display:localStorage.getItem("userRole") == "customer" ?"flex":"none"}} className="nav-link active" href="/CutomerProfile" aria-current="page">My Profile</a>  

                 </div>
                </div>
             </div>
          </nav>
        </center>
      <div>
        <br/><br/>
            <center>
              <h1 style={{color:"Green"}}>Register Customer</h1>
              <br/><br/>
              <form>
                  <label className="label">Name</label>&nbsp;&nbsp;
                  <input onChange={handleName} className="input"
                  value={name} type="text" /><br/><br/>
          
                  <label className="label">Mobile no</label>&nbsp;&nbsp;
                  <input onChange={handlemobileno} className="input"
                  value={mobileno} type="text" /><br/><br/>

                  <label className="label">Email</label>&nbsp;&nbsp;
                  <input onChange={handleEmail} className="input"
                  value={email} type="email" /><br/><br/>
          
                  <label className="label">Password</label>&nbsp;&nbsp;
                  <input onChange={handlePassword} className="input"
                  value={password} type="password" /><br/><br/>
          
                  <button onClick={handleSubmit} className="btn btn-primary" type="submit">
                  Register
                  </button>
              </form>        
              <br/>
              <p className="link">
                Already have an account? <Link to="/Login" className="btn btn-warning">Sign Up</Link>
              </p> 
            </center>
      </div>
    </div>
  )
};

export default Register;
