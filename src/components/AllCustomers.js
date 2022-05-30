import React from "react";
import {useState ,useEffect }from 'react'
import { Link , useNavigate } from "react-router-dom";
import { GetallUsers } from "../services/AuthServices";

const AllCustomers = () => {

    const navigate = useNavigate();

    const handleSubmit= ()=>{
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      navigate("/Login");
    }

	const [Customers , setCustomers] = useState([])
  
	const GetRooms = async () =>{
        let data = await GetallUsers();
        let cusdata =[];
        console.log("All Users",data?.data);
         data?.data.map((users)=>{
            if(users?.userRole == "customer")
            {
                cusdata.push(users);
            }
        });
        setCustomers(cusdata);
    }
  

	useEffect(() => { 
        GetRooms();
   },[])
  
  const deletecustomer = async (id) =>{
    // let data = await DeleteRoomByID(id);
    // console.log("Delete ",data);
    // if(!data?.data?.message)
    // {
    //     alert("delete failed..");
    // }
    // else
    // {
    //     alert(data?.data?.message);
    //     window.location.reload();
    // }
  }

   
   

	return (
		<div style={{ textAlign: "center" }}>
             <div style={{marginTop:"30px"}}>
                    <center><h1 style={{color:"purple"}}><b>Welcome to Avanya Hotel</b></h1></center> 
                    <img src=''/>
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
             <button onClick={handleSubmit} className="btn btn-primary" type="submit" style={{float:"right"}}>
                      Logout
                  </button>
          </nav>
			<br/>
			<br/>
			<div>
               
                <div >
                    <center >
                        <b style={{fontSize:"48px" , textDecoration:"underline"}}>-- All Customer Details -- </b><br/><br/>
                    </center>
                    {/* <div style={{float:"left"}}>
                        <a className="btn btn-success" href="/AddRoom">Add New Customer</a>
                    </div> */}
                    <br/><br/><br/>
                    <table className="table table-striped table-success">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Customer Mobile No</th>
                            <th>Date</th>
                            {/* <th>Actions</th> */}
                            </tr>
                        </thead>  
                        <tbody>
                            {Customers.map((customer,index)=>(
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{customer?.name}</td>
                                    <td>{customer?.email}</td>
                                    <td>{customer?.mobileno}</td>
                                    <td>{customer?.date}</td>
                                    {/* <td>
                                    <Link to ={{pathname:`/updateCustomerByID/${customer?._id}`}}>
                                    <button  type="button"  className="btn btn-primary" style={{marginTop:'10px'}} > Update </button>
                                    </Link>&nbsp;
                                    <button  type="button" onClick={()=>deletecustomer(customer?._id)} className="btn btn-danger" style={{marginTop:'10px'}} >Delete </button>
                                    </td> */}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
			</div>
		</div>
	);
};


export default AllCustomers;
