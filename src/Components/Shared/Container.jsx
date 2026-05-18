const  Container=({children,className})=>{
return(
    <div className={`${className} max-w-360 mx-auto px-4 sm:px-6 md:px-8`}>
{children}
    </div>
)
}

export default Container;