import axios from 'axios';



let taxiBookURL = "http://localhost:8080/taxi/BookTaxi";



export async function bookTaxiForCustomer(data) {
    const alldata = {
        Name:data?.Name,
        Address:data?.Address,
        email :data?.email,
        mobileno:data?.mobileno
    };

    return await axios.post(taxiBookURL,alldata);
}


