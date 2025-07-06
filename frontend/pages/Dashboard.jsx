import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export function Dashboard(){
    const [balance, setBalance] = useState(0);
    const [data, setData] = useState([]);
    const [user, setUser] = useState([])
    const [filter, setFilter] = useState("");
    const token = localStorage.getItem("jwtToken");

    const navigate = useNavigate();

    useEffect(function(){
        axios.get(`${BASE_URL}/account/balance`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then(function(response){
                if(response.data.balance){
                    setBalance(response.data.balance);
                }else{
                    alert(response.data.msg);
                }
            })
    },[])

    useEffect(function(){   
        axios.get(`${BASE_URL}/user/users/`,{
            params:{
                filter:filter
            },
            headers:{
                Authorization: `Bearer ${token}`,
            }, 
        })
            .then(function(response){

                setUser(response.data.accountHolder);
                setData(response.data.Users);
            })
    },[filter])

    function setter(e){
        const value = e.target.value;
        setFilter(value);
    }

    function send(box, firstName, lastName, id){
        const name = firstName +" "+ lastName

        const data = {
            box: box,
            name: name,
            id: id
        }

        navigate("/send", {
            state: data
        });
    }
    
    function update(){
        alert("You are navigated to update page");
        navigate("/update");
    }

    return(
        <div >
            <div class="flex p-4 border-b justify-between border-gray-200 w-full shadow">
                <h2 class="text-2xl font-bold ">Payments App</h2>
                <div class="font-medium">
                    <p>Hello, {user.name} <button onClick={update}
                    
                    class="px-3 ml-2 rounded-full bg-gray-100 p-1">{user.box}</button></p>
                </div>
            </div>

            <h2 class="px-4 text-xl font-bold mt-2">Your Balance ${balance}</h2>

            <div class="p-4">
                <h2 class="font-bold text-xl mb-2">Users</h2>
                <input type="text" placeholder ="Search users..."  onChange={setter}
                class="border w-full mt-2 p-1.5 rounded-md border-gray-300  pl-3 placeholder-gray-400 " 
                />  
            </div>
            {
                data.map(function(data){
                    const box = data.firstName.charAt(0).toUpperCase() + data.lastName.charAt(0).toUpperCase();
                    return(
                        <div class="flex px-4 justify-between p-2">
                            <div class="flex">
                                <button class="px-3 ml-2 rounded-full bg-gray-100 p-1">{box}</button>
                                <h2 class="font-bold text-xl p-2.5">{data.firstName} {data.lastName}</h2>
                            </div>
                            <button onClick={()=>{
                                send(box, data.firstName, data.lastName,data.id)
                            }}
                            class="bg-gray-800 hover:bg-gray-900 text-white rounded-md text-sm p-2.5" 
                            >Send Money</button>
                        </div>
                    )
                })
            }   
            
        </div>
    )
}