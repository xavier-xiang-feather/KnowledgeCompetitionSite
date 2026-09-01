import {useState} from "react";

export default function LoginModal({isOpen, onClose, setLogin}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    if(!isOpen) return null;
    async function handleLogin(){
        // console.log("输入账号: ", username);
        // console.log("输入密码: ", password);
        try{
            const response = await fetch("http://localhost:3001/api/users/login",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
            const data = await response.json();
            if(!response.ok){
                const message = data.message;
                console.log("got message:", message);
                alert("登录失败");
                return;
            }
            localStorage.setItem("token", data.token);
            alert("登录成功");
            console.log("token set: ", data.token);
            setUsername("");
            setPassword("");
            setLogin();
            onClose();
        }
        catch(err){
            alert("无法连接到服务器");
            console.error(err);
        }
    }
    async function handleRegister(){
        try{
            const response = await fetch("http://localhost:3001/api/users/register",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    username:username,
                    password: password
                }),
            });
            if(!response.ok){
                const message = await response.json();
                console.log("got message: ", message);
                alert("注册失败");
            }

        }
        catch(err){
            alert("无法连接到服务器");
            console.error(err);
        }
        setUsername("");
        setPassword("");
    }
    return(
        <div className="fixed flex justify-center items-center gap-">
            <div className="bg-white rounded-xl p-6 w-96">
                <h2 className="text-2xl font-bold mb-5">
                    登录
                </h2>

                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    className="w-full border p-2 mb-5"
                    />
                <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key === "Enter"){
                            handleLogin();
                        }
                    }}
                    className="w-full border p-2 mb-5"
                    />
                <div className="flex justify-end gap-3">
                    <button 
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={()=>handleRegister()}
                        >
                            注册
                        </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-orange-500 rounded"
                        >
                            取消
                        </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick = {()=>handleLogin()}
                        
                        >
                            登录
                        </button>
                </div>

            </div>
        </div>
    )
}