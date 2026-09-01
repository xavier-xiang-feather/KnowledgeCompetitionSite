import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({ children }){
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect( ()=>{
        async function checkLogin(){
            const token = localStorage.getItem("token");
            if(!token){
                setIsAuthenticated(false);
                alert("请先登录");
                return;
            }
            try{
                const response = await fetch("http://localhost:3001/api/users/me",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                if (response.ok){
                    setIsAuthenticated(true);
                }
                else{
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                    
                }
            }
            catch(error){
                console.error("验证登录失败: ", error);
                setIsAuthenticated(false);
            }
        }
        checkLogin();
    }, []);
    if(isAuthenticated === null){
        return <div>加载中...</div>
    }
    if(!isAuthenticated){
        return <Navigate to="/" replace />;
    }
    return children;
}
    