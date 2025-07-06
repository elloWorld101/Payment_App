import { useState } from "react"
import { InputBox } from "../components/InputBox"
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export function Update(){
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();
    function callUpdate(){
        axios.put(`${BASE_URL}/user/update`,{
            firstName: firstName,
            lastName: lastName,
            password: password
        },{
            headers: {
                Authorization: "Bearer " + localStorage.getItem('jwtToken')
            }
        })
            .then(function(response){
                const data = response.data.msg;
                if(data == "Updated successfully"){
                    alert(data);
                    navigate("/dashboard");
                }else{
                    alert(data);
                }
            })
    }

    return(
        <div class="flex h-screen justify-center items-center bg-slate-300">
            <div class="bg-white rounded-md p-5 w-90">
                <Header heading={"Update Details"} para={"Please enter only the details you want to update"} />
                <InputBox header={"First Name"} placeholder={"John"} setStateVariable={setFirstName} />
                <InputBox header={"Last Name"} placeholder={"Doe"} setStateVariable={setLastName} />
                <InputBox header={"Password"} placeholder={""} setStateVariable={setPassword} />
                <button onClick={callUpdate}
                class = "border w-full mt-4 p-1.5 text-white border-black rounded-md bg-gray-800 hover:bg-gray-900 font-semibold">
                Update</button>
            </div>
        </div>
    )
}