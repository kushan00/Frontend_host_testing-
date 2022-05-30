import React from "react";
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { getResevationsbyUserID, DeleteResevationByID } from "../../services/ResevationServices";
import { AuthCustomer } from "../../services/AuthServices";


const CusProfile = () => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        navigate("/Login");
    }

    const [resevations, setresevations] = useState([])
    const [currentUserID, setcurrentUserID] = useState("");



    const [UserName, setUserName] = useState("");
    const [UserEmail, setUserEmail] = useState("");
    const [UserMobileno, setUserMobileno] = useState("");

    const handleUserName = (e) => {
        setUserName(e.target.value);
    };

    const handleUserMobileno = (e) => {
        setUserMobileno(e.target.value);
    };

    const handleUserEmail = (e) => {
        setUserEmail(e.target.value);
    };

    const Getresevations = async () => {
        let data = await getResevationsbyUserID(currentUserID);
        console.log("All resevations", data);
        setresevations(data?.data);
    }

    const CusDetails = async () => {
        let token = localStorage.getItem('token');
        let data = await AuthCustomer(token);
        console.log("current User", data?.data);
        setcurrentUserID(data?.data?._id);
        setUserName(data?.data?.name);
        setUserEmail(data?.data?.email);
        setUserMobileno(data?.data?.mobileno);
    }


    useEffect(() => {
        CusDetails();
    }, [])

    useEffect(() => {
        Getresevations();
    }, [currentUserID])


    const deleteresevations = async (id) => {
        let data = await DeleteResevationByID(id);
        console.log("Delete ", data);
        if (!data?.data?.message) {
            alert("delete failed..");
        }
        else {
            alert(data?.data?.message);
            window.location.reload();
        }
    }




    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ marginTop: "30px" }}>
                <center><h1 style={{ color: "purple" }}><b>Welcome to Avanya Hotel</b></h1></center>
                <img src='' />
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
                            <a style={{ display: localStorage.getItem("userRole") === "systemAdmin" ? "flex" : "none" }} className="nav-link active" aria-current="page" href="/AllRooms">All Rooms</a>
                            <a style={{ display: localStorage.getItem("userRole") === "systemAdmin" ? "flex" : "none" }} className="nav-link active" href="/AllResevations" aria-current="page">All Resevations</a>
                            <a style={{ display: localStorage.getItem("userRole") === "systemAdmin" ? "flex" : "none" }} className="nav-link active" href="/AllCustomers" aria-current="page">All Customers</a>
                            <a style={{ display: localStorage.getItem("userRole") === "systemAdmin" ? "flex" : "none" }} className="nav-link active" href="/AllHotelAdmin" aria-current="page">All Hotel Admins</a>

                            {/* Hotel admin Pages */}
                            <a style={{ display: localStorage.getItem("userRole") === "hotelAdmin" ? "flex" : "none" }} className="nav-link active" href="/AllCustomers" aria-current="page">All Customers</a>
                            <a style={{ display: localStorage.getItem("userRole") === "hotelAdmin" ? "flex" : "none" }} className="nav-link active" href="/AllRooms" aria-current="page">All Rooms</a>
                            <a style={{ display: localStorage.getItem("userRole") === "hotelAdmin" ? "flex" : "none" }} className="nav-link active" href="/AllResevations" aria-current="page">All Resevations</a>

                            {/* Customer Pages */}
                            <a style={{ display: localStorage.getItem("userRole") === "customer" ? "flex" : "none" }} className="nav-link active" href="/BookRoom" aria-current="page">Rooms</a>
                            <a style={{ display: localStorage.getItem("userRole") === "customer" ? "flex" : "none" }} className="nav-link active" href="/CutomerProfile" aria-current="page">My Profile</a>

                        </div>
                    </div>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary" type="submit" style={{ float: "right" }}>
                    Logout
                </button>
            </nav>
            <br />
            <br />

            <div>
                <center>
                    <div>
                        <div className="card" style={{
                            width: '800px',
                            border: '3px solid black',
                            marginRight: '10px',
                            marginLeft: '-10px',
                            // marginBottom:'50px'

                        }}>
                            <b style={{ fontSize: "30px", color: "blue" }}>User Profile</b>
                            <br />
                            <br />
                            <br />
                            <form>
                                <label className="label">User Name</label>&nbsp;&nbsp;
                                <input onChange={handleUserName} className="input"
                                    value={UserName} type="text" readOnly={true} /><br /><br />

                                <label className="label">User Email</label>&nbsp;&nbsp;
                                <input onChange={handleUserEmail} className="input"
                                    value={UserEmail} type="email" readOnly /><br /><br />

                                <label className="label">User Mobile No</label>&nbsp;&nbsp;
                                <input onChange={handleUserMobileno} className="input"
                                    value={UserMobileno} type="email" readOnly /><br /><br />


                                {/* <button onClick={()=>ReserveRoom()} className="btn btn-warning" type="submit">
                            Confirm Resevation
                            </button> */}
                            </form>

                        </div>
                    </div >
                </center>
                <br />
                <br />
                <div  >
                    <center >
                        <b style={{ fontSize: "48px", textDecoration: "underline" }}>-- {UserName} Resevation Details-- </b><br /><br />
                    </center>
                    <table className="table table-striped table-primary">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Resevation No</th>
                                <th>Reserved Room Details</th>
                                <th>Room Reserved Customer Details</th>
                                <th>Room Reserved Days</th>
                                <th>Reservation Start Date</th>
                                <th>Reservation End Date</th>
                                <th>Resevation Created Date</th>
                                <th>Total Cost </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resevations.map((resevations, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{resevations?.res?.ResevationNo}</td>
                                    <td>{
                                        <div>
                                            Room No : {resevations?.room?.RoomNo}<br />
                                            Room Floor : {resevations?.room?.RoomFloor}<br />
                                            Room Type : {resevations?.room?.RoomType}<br />
                                            Room Price : {resevations?.room?.RoomPrice}<br />
                                        </div>
                                    }</td>
                                    <td>{
                                        <div>
                                            Customer Name : {resevations?.User?.name}<br />
                                            Customer Email : {resevations?.User?.email}<br />
                                            Customer Mobile : {resevations?.User?.mobileno}<br />
                                        </div>
                                    }</td>
                                    <td>{resevations?.res?.RoomReservedDays}</td>
                                    <td>{resevations?.res?.RoomReservedStartDate}</td>
                                    <td>{resevations?.res?.RoomReservedENdDate}</td>
                                    <td>{resevations?.res?.date}</td>
                                    <td>{resevations?.room?.RoomPrice * resevations?.res?.RoomReservedDays}</td>
                                    <td>
                                        {/* <Link to ={{pathname:`/updateResevationByID/${resevations?.res?._id}`}}>
                                    <button  type="button"  className="btn btn-primary" style={{marginTop:'10px'}} > Update </button>
                                    </Link>&nbsp; */}
                                        <button type="button" onClick={() => deleteresevations(resevations?.res?._id)} className="btn btn-danger" style={{ marginTop: '10px' }} >Cancel resevation </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    );
};


export default CusProfile;
