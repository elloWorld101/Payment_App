
export function Loading(){
    return(
        <div>
            <div className="flex justify-center  h-screen items-center">
                <div
                    className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                    role="status"
                    aria-label="loading"
                >
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
            
        
        </div>
    )
}