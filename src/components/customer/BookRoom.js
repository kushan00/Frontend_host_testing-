import React from "react";
import {useState ,useEffect }from 'react'
import { Link , useNavigate } from "react-router-dom";
import {GetAllRooms} from "../../services/RoomServices";
import { AuthCustomer } from "../../services/AuthServices";
import { AddResevation } from "../../services/ResevationServices";
import { MakePayment } from "../../services/paymentServices";
import { bookTaxiForCustomer } from "../../services/TaxiServices";
import emailjs from '@emailjs/browser';


const BookRoom = () => {

    const navigate = useNavigate();

    const handleSubmit= ()=>{
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      navigate("/Login");
    }

	const [rooms , setrooms] = useState([])
    const [currentUserID,setcurrentUserID]=useState("");
    const [ReservedRoomID,setReservedRoomID]=useState("");

	const GetRooms = async () =>{
        let data = await GetAllRooms();
        console.log("All Rooms",data);
        setrooms(data?.data);
    }
  
    const CusDetails = async ()  =>{
        let token = localStorage.getItem('token');
        let data = await AuthCustomer(token);
        console.log("current User",data?.data);
        setcurrentUserID(data?.data?._id);
    }

	useEffect(() => { 
        GetRooms();
        CusDetails();
   },[]);


   const [Username,setUsername]=useState("");
   const [Useremail,setUseremail]=useState("");
   const [Usermobileno,setUsermobileno]=useState("");
   const [amount,setamount]=useState("");
   const [BankName,setBankName]=useState("");
   const [CardNo,setCardNo]=useState("");
   const [CVV,setCVV]=useState("");

    const handleUserName = (e) => {
       setUsername(e.target.value);
    }

    const handleUseremail = (e) => {
        setUseremail(e.target.value);
    }

    const handleUsermobileno = (e) => {
        setUsermobileno(e.target.value);
    }

    const handleamount = (e) => {
        setamount(e.target.value);
    }

    const handleBankName = (e) => {
        setBankName(e.target.value);
    }

    const handleCardNo = (e) => {
        setCardNo(e.target.value);
    }

    const handleCVV = (e) => {
        setCVV(e.target.value);
    }


   const PayFortheBill = async ()  =>{
    let newdata = {
        Username:Username,
        Useremail:Useremail,
        Usermobileno:Usermobileno,
        amount:amount,
        BankName:BankName,
        CardNo:CardNo,
        CVV:CVV
    }
    let data = await MakePayment(newdata);
    console.log("Payment success",data?.data);
    if(data?.data?._id != "")
    {
        alert("payment successFull");
        setshowAddForm(false);
        setshowTable(false);
        setshowPayment(false);
        setShowSelection(false);
        setShowTaxiSelection(true);
        setShowTaxiForm(false);
        
    }
    else
    {
        alert("Payment Failed..!");

    }

}

   const sendEmail =  (e) => {
    e.preventDefault();
    emailjs.sendForm('service_cjbxevj', 'template_wj16ebn', e.target, 'RHxy3gAoDYBvssyTu')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    PayFortheBill();
  };

   const [ResevationNo , setResevationNo] = useState("");
   const [RoomReservedDays , setRoomReservedDays] = useState("");
   const [RoomReservedStartDate , setRoomReservedStartDate] = useState("");
   const [RoomReservedENdDate , setRoomReservedENdDate] = useState("");
 
   const [showAddForm , setshowAddForm] = useState(false);
   const [showTable , setshowTable] = useState(true);
   const [showPayment , setshowPayment] = useState(false);
   const [ShowSelection , setShowSelection] = useState(false);
   const [ShowTaxiSelection , setShowTaxiSelection] = useState(false);
   const [ShowTaxiForm , setShowTaxiForm] = useState(false);

   const handleResevationNo = (e) => {
       setResevationNo(e.target.value);
   };

   const handleRoomReservedDays = (e) => {
       setRoomReservedDays(e.target.value);
   };

   const handleRoomReservedStartDate = (e) => {
       setRoomReservedStartDate(e.target.value);
   };

   const handleRoomReservedENdDate = (e) => {
       setRoomReservedENdDate(e.target.value);
   };
    

   const ChangeAddForm = (roomid) => {
    setshowAddForm(true);
    setshowTable(false);
    setshowPayment(false);
    setShowSelection(false);
    setShowTaxiSelection(false);
    setShowTaxiForm(false);
    setReservedRoomID(roomid);
   }

   const Selection = (e,num) => {
        e.preventDefault();
        if(num === 1)
        {
            setshowAddForm(false);
            setshowTable(false);
            setshowPayment(true);
            setShowSelection(false);
            setShowTaxiSelection(false);
            setShowTaxiForm(false);
        }
        if(num === 0)
        {
            setshowAddForm(false);
            setshowTable(false);
            setshowPayment(false);
            setShowSelection(false);
            setShowTaxiSelection(true);
            setShowTaxiForm(false);

        }
   }

   const TaxiSelection = (e,num) => {
    e.preventDefault();
    if(num === 1)
    {
        setshowAddForm(false);
        setshowTable(false);
        setshowPayment(false);
        setShowSelection(false);
        setShowTaxiSelection(false);
        setShowTaxiForm(true);
    }
    if(num === 0)
    {
        window.location.reload();
    }
}

   const ReserveRoom = async (e) =>{
       e.preventDefault();
       console.log("reseved Room ID",ReservedRoomID);
       let alldata ={
        ResevationNo:ResevationNo,
        ReservedRoomID:ReservedRoomID,
        RoomReservedCustomer:currentUserID,
        RoomReservedDays:RoomReservedDays,
        RoomReservedStartDate:RoomReservedStartDate,
        RoomReservedENdDate:RoomReservedENdDate
    };

    let data = await AddResevation(alldata);
    console.log("Resevation",data);
    if(data?.data?._id === "")
    {
        alert("Resevation Failed");
    }
    else
    {
        alert("Resevation successfull");
        setshowAddForm(false);
        setshowTable(false);
        setshowPayment(false);
        setShowSelection(true);
        setShowTaxiSelection(false);

    }
   }

   const [Name,setName]=useState("");
   const [Address,setAddress]=useState("");
   const [email,setemail]=useState("");
   const [mobileno,setmobileno]=useState("");


   const handleName = (e) => {
    setName(e.target.value);
   }

    const handleAddress = (e) => {
        setAddress(e.target.value);
    }
    
    const handleemail= (e) => {
        setemail(e.target.value);
    }

    const handlemobileno = (e) => {
        setmobileno(e.target.value);
    }

   const BookTaxi = async ()=>{
       const alldata = {
        Name:Name,
        Address:Address,
        email : email,
        mobileno:mobileno
       }
       let data = await bookTaxiForCustomer(alldata);
       console.log("taxi Booked",data);
       if(data?.data?._id != "")
       {
            alert("Taxi booked successfully");
            window.location.reload();
       }
       else
       {
           alert("Taxi booked Not Successfull");

       }

   }

   const sendTaxiEmail =  (e) => {
    e.preventDefault();
    emailjs.sendForm('service_cjbxevj', 'template_w52m3iw', e.target, 'RHxy3gAoDYBvssyTu')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      BookTaxi();
  };

	return (
		<div>
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
			<div style={{display:showTable?"fixed":"none"}}>    
                <div >
                    <center >
                        <b style={{fontSize:"48px" , textDecoration:"underline"}}>--- Our Rooms --- </b><br/><br/>
                    </center>
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
                                    <button  type="button"  className="btn btn-primary" style={{marginTop:'10px'}} onClick={()=>ChangeAddForm(rooms?._id)} > Reserve </button>                                    
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
			</div>


            <div style={{display:showAddForm?"flex":"none" , 
            marginLeft:"50px"
            }}>
                    <div>
                        <b style={{fontSize:"30px" , color:"blue"}}>Room Resevation Form</b>
                        <br/>
                        <br/>
                        <br/>
                        <form>
                            <label className="label">Resevation No</label>
                            <input onChange={handleResevationNo} className="form-control"
                            value={ResevationNo} type="text" /><br/><br/>
                     
                            <label className="label">Resevation days</label>
                            <input onChange={handleRoomReservedDays} className="form-control"
                            value={RoomReservedDays} type="text" /><br/><br/>
                    
                            <label className="label">Resevation Start date</label>
                            <input onChange={handleRoomReservedStartDate} className="form-control"
                            value={RoomReservedStartDate} type="date" /><br/><br/>

                            <label className="label">Resevation End Date</label>
                            <input onChange={handleRoomReservedENdDate} className="form-control"
                            value={RoomReservedENdDate} type="date" /><br/><br/>
                    
                            <button onClick={(e)=>ReserveRoom(e)} className="btn btn-warning" type="submit">
                            Confirm Resevation
                            </button>
                        </form>         
                   
                    </div>
            </div >
            <div style={{display:ShowSelection?"flex":"none" , marginLeft:"50px"}}>
                <div>
                    <label style={{color:"purple" , fontSize:"20px"}}>Are you want to pay the Resevation Price?</label><br/><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-success" onClick={(e)=>Selection(e,1)}>Yes</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-danger" onClick={(e)=>Selection(e,0)}>No</button>
                </div>
            </div>

            <div style={{display:ShowTaxiSelection?"flex":"none" , marginLeft:"50px"}}>
                <div>
                    <label style={{color:"purple" , fontSize:"20px"}}>Are you want Book a Taxi?</label><br/><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-success" onClick={(e)=>TaxiSelection(e,1)}>Yes</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-danger" onClick={(e)=>TaxiSelection(e,0)}>No</button>
                </div>
            </div>


  
            <div style={{display:showPayment?"flex":"none" , marginLeft:"50px"}}>
                        <div >
                        <b style={{fontSize:"30px" , color:"blue"}}>Confirm Resevation and Payment</b>
                        <br/><br/>
                        <form onSubmit={sendEmail}>

                            <label className="label">Hotel Name</label>
                            <input className="form-control" type="text" value="Hotel resevation" readOnly name="hotel_name"/><br/><br/>                    

                            <label className="label">Full name</label>
                            <input className="form-control" type="text" name="to_name" 
                            onChange={handleUserName} value={Username}/><br/><br/>
                    
                            <label className="label">Email</label>
                            <input  className="form-control" type="email" name="recieve_email" 
                            onChange={handleUseremail} value={Useremail}/><br/><br/>

                            <label className="label">Mobile Number</label>
                            <input  className="form-control" type="text" name="mobileno" 
                            onChange={handleUsermobileno} value={Usermobileno}/><br/><br/>
                    
                            <label className="label">Payment amount</label>
                            <input className="form-control" type="text" name="amount" 
                            onChange={handleamount} value={amount}/><br/><br/>
                        
                            <label className="label">Card Number</label>
                            <input className="form-control" type="text" name="CardNo" 
                            onChange={handleCardNo} value={CardNo}/><br/><br/>

                            <label className="label">Bank Name</label>
                            <input className="form-control" type="text" name="CardBank" 
                            onChange={handleBankName} value={BankName}/><br/><br/>

                            <label className="label">CVV</label>
                            <input className="form-control" type="text" name="cardCVV" 
                            onChange={handleCVV} value={CVV}/><br/><br/>


                            <button className="btn btn-warning" type="submit">
                            Confirm Payment
                            </button>
                        </form>    
                    </div>
            </div >



            <div style={{display:ShowTaxiForm?"flex":"none" , marginLeft:"50px"}}>
                        <div >
                        <b style={{fontSize:"30px" , color:"blue"}}>Taxi Service</b>
                        <br/><br/>
                        <form onSubmit={sendTaxiEmail}>

                             <label className="label">Full Name</label>
                            <input className="form-control" type="text" name="to_name" 
                            onChange={handleName} value={Name}/><br/><br/>

                            <label className="label">Current Address</label>
                            <input className="form-control" type="text" name="to_address" 
                            onChange={handleAddress} value={Address}/><br/><br/>
                    
                            <label className="label">Email</label>
                            <input  className="form-control" type="email" name="recieve_email" 
                            onChange={handleemail} value={email}/><br/><br/>

                            <label className="label">Mobile Number</label>
                            <input  className="form-control" type="text" name="to_mobileno" 
                            onChange={handlemobileno} value={mobileno}/><br/><br/>                                       
            
                            <button className="btn btn-warning" type="submit" >
                            Confirm Taxi
                            </button>
                        </form>    
                    </div>
            </div >



<br/><br/><br/><br/><br/><br/><br/><br/>
		</div>
	);
};


export default BookRoom;
