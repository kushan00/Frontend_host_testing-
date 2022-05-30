import React from "react";
import {useState ,useEffect }from 'react'
import { Link , useNavigate , useParams } from "react-router-dom";
import { UpdateRoomByID  , GetRoomByID  } from "../services/RoomServices";

const UpdateRoom = () => {

    const navigate = useNavigate();

    const {id} = useParams();

    const handleSubmit= ()=>{
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      navigate("/Login");
    }

	const [RoomNo , setRoomNo] = useState("");
    const [RoomFloor , setRoomFloor] = useState("");
    const [RoomType , setRoomType] = useState("");
    const [RoomPrice , setRoomPrice] = useState("");
  
    

    const handleRoomNo = (e) => {
        setRoomNo(e.target.value);
    };

    const handleRoomFloor = (e) => {
        setRoomFloor(e.target.value);
    };

    const handleRoomType = (e) => {
        setRoomType(e.target.value);
    };

    const handleRoomPrice = (e) => {
        setRoomPrice(e.target.value);
    };
 




	const GetRoomData = async () =>{
        let data = await GetRoomByID(id);
        console.log("Update Rooms",data);
        setRoomNo(data?.data?.RoomNo);
        setRoomFloor(data?.data?.RoomFloor);
        setRoomType(data?.data?.RoomType);
        setRoomPrice(data?.data?.RoomPrice);
    }
  

	useEffect(() => { 
        GetRoomData();
   },[])
  
  const UpdateRoomData = async (e) =>{
    e.preventDefault();
    let newdata = {
        RoomNo:RoomNo,
        RoomFloor:RoomFloor,
        RoomType:RoomType,
        RoomPrice:RoomPrice
    }
    let data = await UpdateRoomByID(id,newdata);
    console.log("Update ",data);
    if(!data?.data?.RoomNo)
    {
        alert("Update failed..");

    }
    else
    {
        alert("Update Successfull..");
        navigate("/AllRooms");
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
                   <a style={{display:localStorage.getItem("userRole") === "systemAdmin" ?"flex":"none"}} className="nav-link active" href="" aria-current="page">All Hotel Admins</a> 

                  {/* Hotel admin Pages */}
                  <a style={{display:localStorage.getItem("userRole") === "hotelAdmin" ?"flex":"none"}} className="nav-link active" href="" aria-current="page">All Customers</a>  
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
                        <b style={{fontSize:"48px" , textDecoration:"underline"}}>-- update Room Details -- </b><br/><br/>
                    </center>
                    <div>
                <center>
                    <br/>
                    <form>
                        <label className="label">Room No</label>
                        <input onChange={handleRoomNo} className="input"
                        value={RoomNo} type="text" /><br/><br/>
                
                        <label className="label">Room Floor</label>
                        <input onChange={handleRoomFloor} className="input"
                        value={RoomFloor} type="email" /><br/><br/>
                
                        <label className="label">Room Type</label>
                        <input onChange={handleRoomType} className="input"
                        value={RoomType} type="text" /><br/><br/>

                        <label className="label">Room Price</label>
                        <input onChange={handleRoomPrice} className="input"
                        value={RoomPrice} type="text" /><br/><br/>
                
                        <button onClick={(e)=>UpdateRoomData(e)} className="btn btn-primary" type="submit">
                        Update
                        </button>
                    </form>         
                </center>
            </div>

                </div>
			</div>
		</div>
	);
};


export default UpdateRoom;
