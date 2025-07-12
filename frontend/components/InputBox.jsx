export function InputBox({placeholder, setStateVariable}){
    
    function setter(value){
        setStateVariable(value);
    }

    function debounce(fn, delay){
        let timer;
        return function(e){
            const value = e.target.value;
            clearTimeout(timer);
            timer = setTimeout(()=>{
                fn(value)
            },delay)
        }
    }

    const debouncedValue = debounce(setter, 1000)

    return(
            <div class="mt-2">
                <input type="text" placeholder = {placeholder} onChange={debouncedValue}
                class="border w-full mt-2 p-1.5 rounded-md border-gray-300 pl-3 placeholder-gray-700" 
                />  
            </div>    
    )
}