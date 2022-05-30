import axios from 'axios';


let getpaymnets = "http://localhost:8080/payment/getPayments";
let doPayment = "http://localhost:8080/payment/makePayment";



export async function MakePayment(data) {
    const alldata = {
        Username:data.Username,
        Useremail:data.Useremail,
        Usermobileno:data.Usermobileno,
        amount:data.amount,
        BankName:data.BankName,
        CardNo:data.CardNo,
        CVV:data.CVV

    };

    return await axios.post(doPayment,alldata);
}


export async function GetAllRooms() { 
    return await axios.get(getpaymnets);
}
