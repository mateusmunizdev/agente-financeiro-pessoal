import { LogOut, X } from "lucide-react";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { toast } from "react-toastify";




interface MenuMobileProps {
   isOpen: boolean;
   setOpen: (open: boolean) => void;
}   


const MenuMobile = ({ isOpen, setOpen }: MenuMobileProps) => {

const auth = useContext(AuthContext);

const signOut  = auth?.signOut 


const handleSignOut = async () => {
    try {
         await signOut?.();
    } catch (error) {
        console.error("Erro ao sair:", error);
        toast.error("Erro ao sair da conta.");
    }   
    toast.success("Desconectado com sucesso.");    
    setOpen(false);
}   


    return (
        <>
           <div className={`fixed z-50 ${isOpen ? 'w-[60%] md:w-[20%]' : 'w-0'} top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 overflow-hidden`}>

<div className=" absolute top-0 left-0 p-2 text-sky-500">
    <X size={28} strokeWidth={3} className=" cursor-pointer" onClick={()=>setOpen(false)} />
        <ul className="p-3 w-full mt-5">
            <li onClick={handleSignOut} className="flex justify-center space-x-2"> <LogOut /><span>Sair</span></li>
        </ul>
</div>

    
    </div> 
    {isOpen && <div onClick={()=>setOpen(false)} className={`fixed inset-0 z-40 w-full h-screen bg-black/70`}></div>}
        </>);
        
     
}
 
export default MenuMobile;