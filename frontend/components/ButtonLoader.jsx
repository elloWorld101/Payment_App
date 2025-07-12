
export function ButtonLoader(){
    return(
        <div>
            <div className="flex justify-center p-1">
                <div
                    className="animate-spin inline-block w-4 h-4 border-4 border-blue-500 border-t-transparent rounded-full"
                    role="status"
                    aria-label="loading"
                >
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
        </div>
    )
}