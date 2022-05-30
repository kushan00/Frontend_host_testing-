import axios from 'axios';


let getRooomsURL = "http://localhost:8280/rooms/getallrooms"; 
let AddRoomURL = "http://localhost:8080/room/createRoom";
let DeleteRoomURL = "http://localhost:8080/room/deleteRoom/";
let getRoomByIdURL = "http://localhost:8080/room/getRoomById/";
let updateRoomByIdURL = "http://localhost:8080/room/updateRoomById/";


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