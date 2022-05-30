import React from "react";
import {useState ,useEffect }from 'react'
import { Link , useNavigate } from "react-router-dom";
import {GetAllRooms  , DeleteRoomByID } from "../services/RoomServices";

const AllRooms = () => {

    const navigate = useNavigate();

    const handleSubmit= ()=>{
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      navigate("/Login");
    }

	const [rooms , setrooms] = useState([])
  
	const GetRooms = async () =>{
        let data = await GetAllRooms();
        console.log("All Rooms",data);
        setrooms(data?.data);
    }
  

	useEffect(() => { 
        GetRooms();
   },[])
  
  const deleteRooms = async (id) =>{
    let data = await DeleteRoomByID(id);
    console.log("Delete ",data);
    if(!data?.data?.message)
    {
        alert("delete failed..");
    }
    else
    {
        alert(data?.data?.message);
        window.location.reload();
    }
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
                   <a style={{display:localStorage.getItem("userRole") === "systemAdmin" ?"flex":"none"}} className="nav-link active" aria-current="page" href="/AllRooms">All Rooms</a>
                   <a style={{display:localStorage.getItem("userRole") === "systemAdmin" ?"flex":"none"}} className="nav-link active" href="/AllResevations" aria-current="page">All Resevations</a>
                   <a style={{display:localStorage.getItem("userRole") === "systemAdmin" ?"flex":"none"}} className="nav-link active" href="/AllCustomers" aria-current="page">All Customers</a>    
                   <a style={{display:localStorage.getItem("userRole") === "systemAdmin" ?"flex":"none"}} className="nav-link active" href="/AllHotelAdmin" aria-current="page">All Hotel Admins</a> 

                  {/* Hotel admin Pages */}
                  <a style={{display:localStorage.getItem("userRole") === "hotelAdmin" ?"flex":"none"}} className="nav-link active" href="/AllCustomers" aria-current="page">All Customers</a>  
                  <a style={{display:localStorage.getItem("userRole") === "hotelAdmin" ?"flex":"none"}} className="nav-link active" href="/AllRooms" aria-current="page">All Rooms</a>  
                  <a style={{display:localStorage.getItem("userRole") === "hotelAdmin" ?"flex":"none"}} className="nav-link active" href="/AllResevations" aria-current="page">All Resevations</a>   
                  
                  {/* Customer Pages */}
                  <a style={{display:localStorage.getItem("userRole") === "customer" ?"flex":"none"}} className="nav-link active" href="/BookRoom" aria-current="page">Rooms</a>  
                  <a style={{display:localStorage.getItem("userRole") === "customer" ?"flex":"none"}} className="nav-link active" href="/CutomerProfile" aria-current="page">My Profile</a>  

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
                        <b style={{fontSize:"48px" , textDecoration:"underline"}}>-- All Room Details -- </b><br/><br/>
                    </center>
                    <div style={{float:"left"}}>
                        <a className="btn btn-success" href="/AddRoom">Add Room</a>
                    </div>
                    <br/><br/><br/>
                    <table className="table table-striped table-success">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Room No</th>
                            <th>Room Floor</th>
                            <th>Room Type</th>
                            <th>Room Price</th>
                            <th>Date</th>
                            <th>Actions</th>
                            </tr>
                        </thead>  
                        <tbody>
                            {rooms.map((rooms,index)=>(
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{rooms?.RoomNo}</td>
                                    <td>{rooms?.RoomFloor}</td>
                                    <td>{rooms?.RoomType}</td>
                                    <td>{rooms?.RoomPrice}</td>
                                    <td>{rooms?.date}</td>
                                    <td>
                                    <Link to ={{pathname:`/updateroomByID/${rooms?._id}`}}>
                                    <button  type="button"  className="btn btn-primary" style={{marginTop:'10px'}} > Update </button>
                                    </Link>&nbsp;
                                    <button  type="button" onClick={()=>deleteRooms(rooms?._id)} className="btn btn-danger" style={{marginTop:'10px'}} >Delete </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
			</div>
		</div>
	);
};


export default AllRooms;
