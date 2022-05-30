import axios from 'axios';


let RegisterURL = "https://kushanbackend.herokuapp.com/user/signup";
let LoginURL = "https://kushanbackend.herokuapp.com/user/signin";
let AuthURL = "https://kushanbackend.herokuapp.com/user/auth";
let getAllUsers = "https://kushanbackend.herokuapp.com/users/getallusers";
let CreateHotelAdmin = "https://kushanbackend.herokuapp.com/user/createUser";
let UpdateHotelAdmin = "https://kushanbackend.herokuapp.com/user/updateUserById/";
let DeleteHotelAdmin = "https://kushanbackend.herokuapp.com/user/deleteUser/";

export async function RegisterCustomer(data) {
    const alldata = {
        name:data.name,
        mobileno:data.mobileno,
        email:data.email,
        password:data.password,
        userRole:"customer"
    };

    return await axios.post(RegisterURL,alldata);
}


export async function LoginCustomer(data) {
    const alldata = {
        email:data.email,
        password:data.password,
    };
  
    return await axios.post(LoginURL,alldata);
}

export async function AuthCustomer(token) { 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    return await axios.get(AuthURL,config);
}

export async function GetallUsers(){
  return axios.get(getAllUsers);
}

export async function CreateAdmin(data) {
  const alldata = {
      name:data.name,
      mobileno:data.mobileno,
      email:data.email,
      password:data.password,
      userRole:"hotelAdmin"
  };

  return await axios.post(CreateHotelAdmin,alldata);
}


export async function UpdateAdmin(id,data) {
  const alldata = {
      name:data.name,
      mobileno:data.mobileno,
      email:data.email,
      password:data.password,
      userRole:"hotelAdmin"
  };

  return await axios.patch(UpdateHotelAdmin + id,alldata);
}

export async function DeleteAdmin(id) {
  return await axios.delete(DeleteHotelAdmin + id);
}