import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 1. Create the Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Start as true
    const [isProfileComplite,setIsProfileComplite]=useState(false)

    // const navigate=useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user", e);
            }
        }else{
            
        }
        setLoading(false);
    }, []);

    const login = (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data); 
    };

      const handleProfileUpload=(boo)=>{
setIsProfileComplite(boo)
if(boo)localStorage.setItem('isProfileUpdated','1')
else localStorage.removeItem('isProfileUpdated')
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        handleProfileUpload(false)
        // navigate('/')
    };
    
  
    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading ,isProfileComplite,handleProfileUpload}}>
            {children}
        </AuthContext.Provider>
    );
};

// 2. Custom Hook for consumption
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};