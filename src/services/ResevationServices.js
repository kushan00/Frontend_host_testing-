import axios from 'axios';


let getResevationURL = "https://kushanbackend.herokuapp.com/resevation/getallresevations";
let AddResevationURL = "https://kushanbackend.herokuapp.com/resevation/createReservations";
let DeleteResevationURL = "https://kushanbackend.herokuapp.com/resevation/deleteResevation/";
let getResevationByIdURL = "https://kushanbackend.herokuapp.com/resevation/getReservationsById/";
let updateResevationByIdURL = "https://kushanbackend.herokuapp.com/resevation/updateReservationsById/";
let getResevationDatabyUserIDURL = "https://kushanbackend.herokuapp.com/resevation/getResevationByUserID/";

export async function AddResevation(data) {
    const alldata = {
        ResevationNo:data?.ResevationNo,
        ReservedRoomID:data?.ReservedRoomID,
        RoomReservedCustomer:data?.RoomReservedCustomer,
        RoomReservedDays:data?.RoomReservedDays,
        RoomReservedStartDate:data?.RoomReservedStartDate,
        RoomReservedENdDate:data?.RoomReservedENdDate
    }

    return await axios.post(AddResevationURL,alldata);
}


export async function UpdateResevationByID(id,data) {
    const alldata = {
        ResevationNo:data?.ResevationNo,
        ReservedRoomID:data?.ReservedRoomID,
        RoomReservedCustomer:data?.RoomReservedCustomer,
        RoomReservedDays:data?.RoomReservedDays,
        RoomReservedStartDate:data?.RoomReservedStartDate,
        RoomReservedENdDate:data?.RoomReservedENdDate
    }

    return await axios.patch(updateResevationByIdURL + id,alldata);
}

export async function GetAllResevations() { 
    return await axios.get(getResevationURL);
}

export async function GetResevationByID(id) { 
    return await axios.get(getResevationByIdURL + id);
}

export async function DeleteResevationByID(id) { 
    return await axios.delete(DeleteResevationURL + id);
}

export async function getResevationsbyUserID(id) { 
    return await axios.get(getResevationDatabyUserIDURL + id);
}