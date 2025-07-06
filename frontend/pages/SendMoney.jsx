import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function SendMoney(){
    const [amount, setAmount] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    
    const token = localStorage.getItem("jwtToken");
    
    function callApi(){
        axios.post(`${BASE_URL}/account/transfer`,{
            to: data.id,
            amount: amount
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function(response){
                    const msg = response.data.msg;
                    alert(msg);
                    navigate("/dashboard")
                })
    }

    function setter(e){
        const value = e.target.value;
        setAmount(value);
    }
    return(
        
        <div class="flex h-screen items-center justify-center bg-slate-400"> 
            <div class="bg-white rounded-md p-5">
                <h2 class="text-3xl font-bold mb-15 text-center">Send Money</h2>   

                <div class="flex ">
                    <button class="px-3 ml-2 rounded-full bg-green-400 p-2">{data.box}</button>     
                    <h2 class=" px-4 text-xl font-bold p-2">{data.name}</h2>
                </div>

                <p class="text-sm font-semibold px-2">Amount (in Rs)</p>
                <input type="number" placeholder="Enter amount" onChange={setter}
                class="w-full p-1 mt-2 rounded-md border border-gray-300 pl-2 "/>

                <button onClick={callApi}
                class="bg-green-400 mt-2 w-full rounded-md p-1.5 text-white font-medium text-sm">Initiate Transfer</button>
            </div>
        </div>
    )
}