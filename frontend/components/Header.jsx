export function Header({heading, para}){
    return(
        <div>
            <h1 class=" text-center text-3xl font-bold ">{heading}</h1>
            <p class="text-gray-600 px-5 mt-3 text-lg text-center">{para}</p>
        </div>
    )
}