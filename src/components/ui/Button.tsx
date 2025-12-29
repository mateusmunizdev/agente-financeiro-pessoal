interface ButtonProps {
    type:"submit" | "button" | "reset";
    className?:string;
    children: React.ReactNode;
}


const Button = ({type = "button",className = "", children,}:ButtonProps) => {
    return ( 
        <button
        type={type}
        className={`${className}`}
        >
            {children}
        </button>
     );
}
 
export default Button;