import { useState } from 'react'
import { InputBox } from '../components/InputBox';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Footer } from '../components/Footer';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function Signup(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    function signup(){
        axios.post(`${BASE_URL}/user/signup`,{
            username: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        })
            .then(function(response){
                const data = response.data.msg;
                const token = response.data.token;

                if(data == "User created successfully"){
                    localStorage.setItem('jwtToken', token);
                    alert(data);
                    navigate("/dashboard"); 
                }else{
                    alert(data);
                }
            })
    }
    

    return(

        <div class="flex justify-center h-screen bg-slate-400 items-center">
            <div class=" bg-white rounded-lg p-5 w-90">

                <Header heading={"Sign Up"} para={"Enter your information to create an account"} />
            
                <InputBox header={"First Name"} placeholder={"John"} setStateVariable={setFirstName}/>
                <InputBox header={"Last Name"} placeholder={"Doe"} setStateVariable={setLastName}/>
                <InputBox header={"Email"} placeholder={"johndoe@example.com"} setStateVariable={setEmail} />
                <InputBox header={"Password"} placeholder={""}  setStateVariable={setPassword}/>
            
                <Footer header={"Sign Up"} para={"Already have an account?"} link={"Login"} functionName={signup} page={"/signin"} />
            
            </div>
        </div>
    )
}