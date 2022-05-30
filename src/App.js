import React , {useEffect , useState} from 'react'
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';


import AllRooms from './components/AllRooms';
import UpdateRoom from './components/UpdateRoom';
import AddRoom from './components/AddRoom';
import AllResevations from './components/AllResevations';
import BookRoom from './components/customer/BookRoom';
import CusProfile from './components/customer/CusProfile';
import AllCustomers from './components/AllCustomers';
import AllHotelAdmin from './components/sysAdmin/AllHotelAdmin';

function App() {

  const [user , setUser]=useState("");

  useEffect(() => {
    setUser(localStorage.getItem('userRole'));
  }, [])

  return (
    <div>
      
      <Router>
					<Routes>
						<Route exact path="/" element={user ? <Home/> : <Login/>}/>							
            <Route path="/register" element={<Register/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/AllRooms" element={<AllRooms/>}/>
            <Route path="/updateroomByID/:id" element={<UpdateRoom/>}/>
            <Route path="/AddRoom" element={<AddRoom/>}/>
            <Route path="/AllResevations" element={<AllResevations/>}/>
            <Route path="/BookRoom" element={<BookRoom/>}/>
            <Route path="/CutomerProfile" element={<CusProfile/>}/>
            <Route path="/AllCustomers" element={<AllCustomers/>}/>
            <Route path="/AllHotelAdmin" element={<AllHotelAdmin/>}/>
					</Routes>
			</Router>
    </div>
  );
}

export default App;
