import { useState } from "react"
import { InputBox } from "../components/InputBox";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { FooterHeading } from "../components/FooterHeading";
import { useSetRecoilState } from "recoil";
import { disableAtom } from "../store/atoms";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const setIsDisableButton = useSetRecoilState(disableAtom);
    const navigate = useNavigate();

    function signin(){
        setIsDisableButton(true);

        axios.post(`${BASE_URL}/user/signin`,{
            username: username,
            password: password
        })
            .then(function(response){
                const msg = response.data.msg;
                const token = response.data.token;
                setIsDisableButton(false);

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
        <div class="flex justify-center h-screen bg-blue-400 items-center">
            <div class="bg-white rounded-lg p-5 w-95
                w-[75%]">
            
                <Header heading={"Sign In"} para={"Enter your credentials to access your account"} />
                <InputBox placeholder={"Email"} setStateVariable={setUsername}/>
                <InputBox  placeholder={"Password"} setStateVariable={setPassword}/>
                <Footer header={"Sign In"} functionName={signin} />
                <FooterHeading para={"Don't have an account"} link={"Sign Up"} page={"/signup"} />
            
            </div>
        </div>
    )
}
