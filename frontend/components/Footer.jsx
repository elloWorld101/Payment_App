import { useRecoilState, useRecoilValue } from "recoil"
import { disableAtom, loadAtom } from "../store/atoms"
import { ButtonLoader } from "./ButtonLoader";

export function Footer({header, functionName}){
    // const [loading, setLoading] = useRecoilState(loadAtom);
    const isDisabled = useRecoilValue(disableAtom);
    console.log(isDisabled);


    // function setter(){
    //     setLoading(true);
    // }

    // function setter2(){
    //     console.log("Inside setter2");
    // }

    return(
        <div>
            <button onClick={functionName} disabled={isDisabled}  
            class = "border w-full mt-4 p-1.5 text-white border-black rounded-md bg-gray-800 hover:bg-gray-900 font-semibold"
            >{isDisabled? <ButtonLoader/> : header}</button>
            
        </div>
    )
}