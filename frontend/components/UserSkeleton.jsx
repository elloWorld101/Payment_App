export function UserSkeleton(){
    return(
        <div>
            <div className="lg:w-40 w-25">
                <div className="flex flex-row items-center  justify-end lg:gap-4 gap-2">
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-300 rounded lg:w-4/4 "></div>
                        </div>
                    <div className="lg:w-12 lg:h-12 rounded-full bg-gray-300
                        w-8 h-8
                    "></div>
                </div>    
            </div>
        </div>
    )
}
