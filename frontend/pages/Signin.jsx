import { useState } from "react"
import { InputBox } from "../components/InputBox";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function signin(){
        axios.post(`${BASE_URL}/user/signin`,{
            username: username,
            password: password
        })
            .then(function(response){
                const msg = response.data.msg;
                const token = response.data.token;

                if(msg == "Token successfully generated"){ 
                    localStorage.setItem("jwtToken", token);
                    alert("Sign In successfull");
                    navigate("/dashboard");
                }else{
                    alert(msg);
                }
            })
    }

    return(
        <div class="flex justify-center h-screen bg-slate-400 items-center">
            <div class="bg-white rounded-lg p-5 w-80">
            
                <Header heading={"Sign In"} para={"Enter your credentials to access your account"} />
                <InputBox header={"Email"} placeholder={"johndoe@example.com"} setStateVariable={setUsername}/>
                <InputBox header={"Password"} placeholder={""} setStateVariable={setPassword}/>
                <Footer header={"Sign In"} para={"Don't have an account"} link={"Sign Up"} page={"/signup"} functionName={signin} />
            
            </div>
        </div>
    )
}
