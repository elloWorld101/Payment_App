
export function Loading(){
    return(
        <div>
            <div className="flex flex-col justify-center h-screen items-center ">
                <h2>Please wait, I did not had the money to buy a fast server</h2>
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
