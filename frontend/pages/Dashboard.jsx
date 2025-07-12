import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../components/Skeleton";
import { UserSkeleton } from "../components/UserSkeleton";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export function Dashboard(){
    const [balance, setBalance] = useState(0);
    const [data, setData] = useState([]);
    const [user, setUser] = useState([])
    const [filter, setFilter] = useState("");
    const token = localStorage.getItem("jwtToken");
    const [debouncedInputValue, setDebouncedInputValue] = useState("");
    const [skeleton, setSkeleton] = useState(true);
    const [userSkeleton, setUserSkeleton] = useState(true);

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
                filter: debouncedInputValue
            },
            headers:{
                Authorization: `Bearer ${token}`,
            }, 
        })
            .then(function(response){
                setUser(response.data.accountHolder);
                setData(response.data.Users);
                setSkeleton(false);
                setUserSkeleton(false);                
            })
    },[debouncedInputValue])

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
        // alert("You are navigated to update page");
        navigate("/update");
    }


    function  useDebounce(value, delay){
        let timer;
        
        useEffect(()=>{
            timer = setTimeout(()=>{
                setDebouncedInputValue(value);
                setDebouncedInputValue((prev) => 
                prev.charAt(0).toUpperCase() + prev.slice(1)
            );
            },delay);
        
            return ()=>{
                clearTimeout(timer);
            }
        },[value])
    }

    const debouncedValue = useDebounce(filter, 500)

    return(
        <div class="h-screen bg-blue-400">
        <div class=" bg-blue-400 flex flex-col items-center justify-center"> 
            <div class="flex p-5 justify-between border-gray-200 lg:w-1/2
                w-[90%]
            ">


                <h2 class="lg:text-2xl font-semibold lg:p-0 text-lg">Payments App</h2>

                {userSkeleton? <UserSkeleton/> : <div 
                class="font-medium pl-3 lg:p-0 text-base">
                    <p>Hello, {user.name} <button //onClick={update}
                    class="lg:px-3 lg:ml-2 lg:text-lg lg:rounded-full lg:bg-teal-800 lg:text-white lg:font-semibold lg:p-1 
                            text-md rounded-full bg-teal-800 text-white px-2.5 p-1">
                        {user.box}
                        <div class="absolute top-full text-black right-3 bg-white rounded-md p-3 mt-1 shadow-md scale-y-0 group-focus:scale-y-100 origin-top duration-200">
                            <a class="active" onClick={update}>Update</a>
                        </div>
                        </button></p>
                </div>}
                
            </div>

            
            <div class="bg-white lg:w-1/2  rounded-lg lg:m-3 lg:p-5
                        p-2 w-[90%]
                        ">
                <h2 class="px-4 text-xl text-gray-400">Your Balance</h2>
                <h2 class="px-4 text-4xl font-bold pt-2">${balance}</h2>
            </div>

            <div class="relative lg:w-1/2 mb-2 w-[90%]">
              <div className="absolute inset-y-7 left-6 flex items-center pl-2 pointer-events-none">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-600"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                    </svg>
                </div>
                
            <input type="text" placeholder ="Search users..."  onChange={setter}
            class="border border-white outline-0 mt-3 p-1.5 rounded-md outline-white w-full pl-14 placeholder-gray-700 font-semibold bg-white" 
            />

            </div>
            
            {skeleton ? <Skeleton/> : null}
            {
                data.map(function(data){
                    const box = data.firstName.charAt(0).toUpperCase() + data.lastName.charAt(0).toUpperCase();
                    return(
                    
                        <div class="flex justify-between my-3 bg-blue-400 lg:w-1/2 lg:items-center flex-col
                        w-[90%]">
                            <div class="bg-white  rounded-lg flex lg:w-[90%] justify-between p-2">
                                <div class="flex">
                                    <button class="lg:px-4 lg:ml-2 lg:rounded-full lg:bg-purple-300 lg:p-1 
                                            px-3 ml-2 rounded-full bg-purple-300 p-0.5">
                                                {box}</button>
                                    <h2 class="font-semibold lg:text-xl p-2.5
                                            text-sm 
                                    ">{data.firstName} {data.lastName}</h2>
                                </div>
                                <button onClick={()=>{
                                    send(box, data.firstName, data.lastName,data.id)
                                }}
                                class="bg-blue-500 hover:bg-blue-800 text-white rounded-lg lg:text-md lg:px-5 font-semibold
                                        text-sm px-3
                                " 
                                >Send Money</button>
                            </div>
                        </div>

                        
                    )
                })
            }   
            
        </div>
        </div>

    )
}
