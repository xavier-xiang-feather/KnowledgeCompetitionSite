import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import LoginButton from "../components/LoginButton";
import LoginModal from "../components/LoginModal";
import UsernameButton from "../components/UsernameButton";
import LogoutButton from "../components/LogoutButton";


export default function Home(){
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    
    function handleGoToTest(){
        navigate("/TestPage");
    }

    return(
        <div className="
        min-h-screen flex justify-center items-center flex-col gap-5
        ">
            <div className="fixed top-10 right-10">
                {
                    isLoggedIn ? (
                        <>
                        <UsernameButton name="yuluo"/>
                        <LogoutButton onLogout={() => {
                            localStorage.removeItem("token");
                            setIsLoggedIn(false);
                        }}/>
                        </>
                    ) : (
                        <LoginButton 
                        onLogin={()=>setShowLogin(true)
                        }
                        />
                    )
                }
                {/* <LoginButton 
                onLogin={()=>setShowLogin(true)
                
                }
                /> */}
            </div>
            
            <LoginModal
                isOpen={showLogin}
                onClose={()=>setShowLogin(false)}
                setLogin={() => setIsLoggedIn(true)}
                />


            <h1 className="text-2xl font-bold text-white">
                测试你对泠鸢的了解吧！
            </h1>
            

            <button className="
            bg-green-500 text-white w-30 h-10 rounded-lg
            "
            onClick={handleGoToTest}
            >
                知识问答
            </button>
            <button className="
            bg-green-500 text-white w-30 h-10 rounded-lg
            "
            onClick={()=>navigate("/QuestionBankPage")}
            >
                题库
            </button>
            

            
        </div>
    )
}