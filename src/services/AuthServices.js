import axios from 'axios';


let RegisterURL = "http://localhost:8080/user/signup";
let LoginURL = "http://localhost:8080/user/signin";
let AuthURL = "http://localhost:8080/user/auth";
let getAllUsers = "http://localhost:8280/users/getallusers";
let CreateHotelAdmin = "http://localhost:8080/user/createUser";
let UpdateHotelAdmin = "http://localhost:8080/user/updateUserById/";
let DeleteHotelAdmin = "http://localhost:8080/user/deleteUser/";

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