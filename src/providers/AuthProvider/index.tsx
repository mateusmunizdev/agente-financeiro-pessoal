import { useAuth } from "../../services/useAuth";
import { AuthContext } from "../../context/authContext";



const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();
    return ( <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider> );
}
 
export default AuthProvider;