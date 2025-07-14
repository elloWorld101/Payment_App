import {useState} from 'react'

export function Loading(){
    const [heading, setHeading] = useState(false);
    
    function setter(){
        setTimeout(()=>{
            setHeading(true);
        },5000)
    }
   
    return(
        <div>
            <div className="flex flex-col justify-center h-screen items-center ">
                {setter()}                
                {heading ? <h2 class="w-[90%] text-center">Bhai rukjao, website dekhke jana</h2> : null }

                <div
                    className="animate-spin m-4 inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                    role="status"
                    aria-label="loading"
                >
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
        </div>
    )
}
