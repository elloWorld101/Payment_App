import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

//There is no JSX but I have still created the Landing component and not only a js file as I can use the useNavigate hook inside BrowserRouter --> correct me If I am wrong
export function Landing(){
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    
    useEffect(function(){
            axios.get(`${BASE_URL}/user/me`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function(response){
            const data = response.data.msg;
            setLoading(false);
            if(data == "Navigate to signin"){
                navigate("/dashboard");
            }else{
                navigate("/signup");
            }
        })
    
    },[])

    return(
        <>
            {loading ? <Loading/> : null} 
        </>

    )
}