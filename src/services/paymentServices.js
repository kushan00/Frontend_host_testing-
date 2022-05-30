import axios from 'axios';


let getpaymnets = "https://kushanbackend.herokuapp.com/payment/getPayments";
let doPayment = "https://kushanbackend.herokuapp.com/payment/makePayment";



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
