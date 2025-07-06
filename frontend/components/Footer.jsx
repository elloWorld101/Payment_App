export function Footer({header, para,link ,functionName, page}){
    
    return(
        <div>
            <button onClick={functionName} 
            class = "border w-full mt-4 p-1.5 text-white border-black rounded-md bg-gray-800 hover:bg-gray-900 font-semibold"
            >{header}</button>
            <p class="text-center mt-3">{para} <a class="underline font-semibold" href={page}>{link}</a></p>
        </div>
    )
}