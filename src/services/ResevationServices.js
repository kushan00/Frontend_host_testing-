import axios from 'axios';


let getResevationURL = "http://localhost:8280/resevation/getallresevations";
let AddResevationURL = "http://localhost:8080/resevation/createReservations";
let DeleteResevationURL = "http://localhost:8080/resevation/deleteResevation/";
let getResevationByIdURL = "http://localhost:8080/resevation/getReservationsById/";
let updateResevationByIdURL = "http://localhost:8080/resevation/updateReservationsById/";
let getResevationDatabyUserIDURL = "http://localhost:8080/resevation/getResevationByUserID/";

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