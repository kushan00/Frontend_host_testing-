import axios from 'axios';


let getRooomsURL = "https://kushanbackend.herokuapp.com/rooms/getallrooms"; 
let AddRoomURL = "https://kushanbackend.herokuapp.com/room/createRoom";
let DeleteRoomURL = "https://kushanbackend.herokuapp.com/room/deleteRoom/";
let getRoomByIdURL = "https://kushanbackend.herokuapp.com/room/getRoomById/";
let updateRoomByIdURL = "https://kushanbackend.herokuapp.com/room/updateRoomById/";


export async function AddNewRoom(data) {
    const alldata = {
        RoomNo:data.RoomNo,
        RoomFloor:data.RoomFloor,
        RoomType:data.RoomType,
        RoomPrice:data.RoomPrice
    };

    return await axios.post(AddRoomURL,alldata);
}


export async function UpdateRoomByID(id,data) {
    const alldata = {
        RoomNo:data.RoomNo,
        RoomFloor:data.RoomFloor,
        RoomType:data.RoomType,
        RoomPrice:data.RoomPrice
    };

    return await axios.patch(updateRoomByIdURL + id,alldata);
}

export async function GetAllRooms() { 
    return await axios.get(getRooomsURL);
}

export async function GetRoomByID(id) { 
    return await axios.get(getRoomByIdURL + id);
}

export async function DeleteRoomByID(id) { 
    return await axios.delete(DeleteRoomURL + id);
}