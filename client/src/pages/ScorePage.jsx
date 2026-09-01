import {useNavigate, useLocation} from 'react-router-dom';

export default function ScorePage(){
    const navigate = useNavigate();
    const {score, total} = useLocation().state;
    // console.log("In scorePage: score = ", score);
    return(
        <div className="
        flex flex-col gap-5 items-center justify-center
        text-white
        ">
            <h1>你的成绩是: {score}/{total}</h1>
            <button onClick={ ()=> navigate("/")}
                className="bg-orange-500 text-white w-30 h-10 rounded-lg "> Home </button>
        </div>
    )
}