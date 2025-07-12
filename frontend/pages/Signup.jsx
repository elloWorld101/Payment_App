import { useState } from 'react'
import { InputBox } from '../components/InputBox';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Footer } from '../components/Footer';
import { FooterHeading } from '../components/FooterHeading';
import { useSetRecoilState } from 'recoil';
import { disableAtom, loadAtom } from '../store/atoms';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function Signup(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setIsDisableButton = useSetRecoilState(disableAtom);
 
    const navigate = useNavigate();

    function signup(){
        setIsDisableButton(true);
 

        console.log("Inside button");
        for(let i=0; i<1000000; i++){
            
        }
        axios.post(`${BASE_URL}/user/signup`,{
            username: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        })
            .then(function(response){
                const data = response.data.msg;
                const token = response.data.token;

                setIsDisableButton(false); //reverted back and now I can use this atom in alag alag jagah
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

        <div class="flex justify-center h-screen bg-blue-400 items-center">
            <div class=" bg-white rounded-lg p-5 w-90">

                <Header heading={"Sign Up"} para={"Enter your information to create an account"} />
            
                <InputBox  placeholder={"First Name"} setStateVariable={setFirstName}/>
                <InputBox  placeholder={"Last Name"} setStateVariable={setLastName}/>
                <InputBox placeholder={"Email"} setStateVariable={setEmail} />
                <InputBox  placeholder={"Password"}  setStateVariable={setPassword}/>
            
                <Footer header={"Sign Up"}  functionName={signup}  />
                <FooterHeading para={"Already have an account?"} link={"Log in"} page={"/signin"}/>
            
            </div>
        </div>
    )
}