import {useNavigate} from 'react-router-dom';

export default function HomePageButton(){
    const navigate = useNavigate();
    return(
        <button className="
            bg-orange-500 text-white w-30 h-10 rounded-lg 
            "
            onClick={ ()=>navigate("/")}
            >
                Home
            </button>
    )
}