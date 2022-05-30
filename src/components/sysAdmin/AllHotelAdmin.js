import React from "react";
import {useState ,useEffect }from 'react'
import { Link , useNavigate } from "react-router-dom";
import { GetallUsers ,CreateAdmin , UpdateAdmin , DeleteAdmin } from "../../services/AuthServices";

const AllHotelAdmin = () => {

    const navigate = useNavigate();

    const handleSubmit= ()=>{
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      navigate("/Login");
    }

	const [HotelAdmin , setHotelAdmin] = useState([])
  
	const GetRooms = async () =>{
        let data = await GetallUsers();
        let cusdata =[];
        console.log("All Users",data?.data);
         data?.data.map((users)=>{
            if(users?.userRole === "hotelAdmin")
            {
                cusdata.push(users);
            }
        });
        setHotelAdmin(cusdata);
    }
  

	useEffect(() => { 
        GetRooms();
   },[])
  
  const deleteHotelAdmin = async (id) =>{
    let data = await DeleteAdmin(id);
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


  const [HotelAdminName , setHotelAdminName ] = useState("");
  const [HotelAdminEmail , setHotelAdminEmail] = useState("");
  const [HotelAdminMobileNo , setHotelAdminMobileNo] = useState("");
  const [HotelAdminPassword , setHotelAdminPassword] = useState("");
  const [HotelAdminPasswordUpdate , setHotelAdminPasswordUpdate] = useState("");

  const [showAddForm , setshowAddForm] = useState(false);
  const [showEditForm , setshowEditForm] = useState(false);
  const [showTable , setshowTable] = useState(true);
  const [AdminID , setAdminID] = useState("");
  
  const handleHotelAdminName = (e) => {
      setHotelAdminName(e.target.value);
  };

  const handleHotelAdminEmail = (e) => {
      setHotelAdminEmail(e.target.value);
  };

  const handleHotelAdminMobileNo = (e) => {
      setHotelAdminMobileNo(e.target.value);
  };

  const handleHotelAdminPassword = (e) => {
    setHotelAdminPassword(e.target.value);
};

  const ChangeAddForm = () => {
    setshowAddForm(true);
    setshowTable(false);
   }

   const ChangeEditForm = (data) => {
       console.log("data",data);
        setHotelAdminName(data?.name);
        setHotelAdminEmail(data?.email);
        setHotelAdminMobileNo(data?.mobileno);
        setHotelAdminPasswordUpdate(data?.password);
        setAdminID(data?._id);
        setshowEditForm(true);
        setshowTable(false);
   }
   
   const EditHotelAdmin = async () => {

    let alldata ={
        name:HotelAdminName,
        mobileno:HotelAdminMobileNo,
        email:HotelAdminEmail,
        password:HotelAdminPassword != "" ? HotelAdminPassword : HotelAdminPasswordUpdate,
    };

        let data = await UpdateAdmin(AdminID,alldata);
        console.log("Update Hotel Admin",data);
        window.location.reload();
   }
   

   const AddNewHotelAdmin = async () => {

    let alldata ={
        name:HotelAdminName,
        mobileno:HotelAdminMobileNo,
        email:HotelAdminEmail,
        password:HotelAdminPassword 
    };

        let data = await CreateAdmin(alldata);
        console.log("Hotel Admin",data);
        window.location.reload();
   }
   

	return (
		<div style={{ textAlign: "center" }}>
             <div style={{marginTop:"30px"}}>
                    <center><h1 style={{color:"purple"}}>Welcome to Hotel Room Resevation System</h1></center> 
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
                <div style={{display:showTable?"fixed":"none"}}>
                    <center >
                        <b style={{fontSize:"48px" , textDecoration:"underline"}}>-- All Hotel Admin Details -- </b><br/><br/>
                    </center>
                    <div style={{float:"left"}}>
                        <button className="btn btn-success" onClick={()=>ChangeAddForm()} >Add New Hotel Admin</button>
                    </div>
                    <br/><br/><br/>
                    <table className="table table-striped table-success" >
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Hotel Admin Name</th>
                            <th>Hotel Admin Email</th>
                            <th>Hotel Admin Mobile No</th>
                            <th>Date</th>
                            <th>Actions</th>
                            </tr>
                        </thead>  
                        <tbody>
                            {HotelAdmin.map((HotelAdmin,index)=>(
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{HotelAdmin?.name}</td>
                                    <td>{HotelAdmin?.email}</td>
                                    <td>{HotelAdmin?.mobileno}</td>
                                    <td>{HotelAdmin?.date}</td>
                                    <td>
                                   
                                    <button  type="button"  className="btn btn-primary" style={{marginTop:'10px'}} onClick={()=>ChangeEditForm(HotelAdmin)}> Update </button>
                                    &nbsp;
                                    <button  type="button" onClick={()=>deleteHotelAdmin(HotelAdmin?._id)} className="btn btn-danger" style={{marginTop:'10px'}} >Delete </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                <center>
            <div style={{display:showAddForm?"flex":"none"}}>
                    <div>
                        <b style={{fontSize:"30px" , color:"blue"}}>Add Hotel Admin Form</b>
                        <br/>
                        <br/>
                        <br/>
                        <form>
                            <label className="label">Hotel Admin Name</label>&nbsp;&nbsp;
                            <input onChange={handleHotelAdminName} className="input"
                            value={HotelAdminName} type="text" /><br/><br/>
                    
                            <label className="label">Hotel Admin Email</label>&nbsp;&nbsp;
                            <input onChange={handleHotelAdminEmail} className="input"
                            value={HotelAdminEmail} type="email" /><br/><br/>
                    
                            <label className="label">Hotel Admin Mobile No</label>&nbsp;&nbsp;
                            <input onChange={handleHotelAdminMobileNo} className="input"
                            value={HotelAdminMobileNo} type="text" /><br/><br/>

                            <label className="label">Hotel Admin Password</label>&nbsp;&nbsp;
                            <input onChange={handleHotelAdminPassword} className="input"
                            value={HotelAdminPassword} type="text" /><br/><br/>

                         
                         
                            <button onClick={()=>AddNewHotelAdmin()} className="btn btn-warning" type="submit">
                            Insert Details
                            </button>
                        </form>         
                   
                    </div>
            </div >
            </center>
                </div>
                <div>
                <center>
            <div style={{display:showEditForm?"flex":"none"}}>
                    <div>
                        <b style={{fontSize:"30px" , color:"blue"}}>Hotel Admin Update Form</b>
                        <br/>
                        <br/>
                        <br/>
                        <form>
                            <label className="label">Hotel Admin Name</label>&nbsp;&nbsp;
                            <input onChange={handleHotelAdminName} className="input"
                            value={HotelAdminName} type="text" /><br/><br/>
                    
                            <label className="label">Hotel Admin Email</label>&nbsp;&nbsp;
                            <input onChange={handleHotelAdminEmail} className="input"
                            value={HotelAdminEmail} type="email" /><br/><br/>
                    
                            <label className="label">Hotel Admin Mobile No</label>&nbsp;&nbsp;
                            <input onChange={handleHotelAdminMobileNo} className="input"
                            value={HotelAdminMobileNo} type="text" /><br/><br/>

                            <label className="label">Hotel Admin Password</label>&nbsp;&nbsp;
                            <input onChange={handleHotelAdminPassword} className="input"
                            value={HotelAdminPassword} type="text" /><br/><br/>

                         
                         
                            <button onClick={()=>EditHotelAdmin()} className="btn btn-warning" type="submit">
                            Confirm and Update Details
                            </button>
                        </form>         
                   
                    </div>
            </div >
            </center>
                </div>
			</div>
		</div>
	);
};


export default AllHotelAdmin;
