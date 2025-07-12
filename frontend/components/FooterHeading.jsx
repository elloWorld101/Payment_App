export function FooterHeading({para, page, link}){
    return(
        <div>
            <p class="text-center mt-3">{para} <a class="font-semibold text-blue-500" href={page}>{link}</a></p>
        </div>
    )
}