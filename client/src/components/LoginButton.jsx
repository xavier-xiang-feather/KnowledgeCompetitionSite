import {useNavigate} from 'react-router-dom';

export default function LoginButton({onLogin}){

    return(
        <button className="
        bg-orange-500 text-white w-30 h-10 rounded-lg
        "
        onClick={ ()=>onLogin()}>
            登录
        </button>
    )
}