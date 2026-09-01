import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Question from '../components/Question';
import AddQuestionButton from '../components/AddQuestionButton';
import HomePageButton from '../components/HomePageButton';

export default function TestPage(){
    const navigate = useNavigate();

    const [testStart, setTestStart] = useState(false);

    const [selected, setSelected] = useState(null);
    const [questionId, setQuestionId] = useState(0);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);


    useEffect( ()=>{
        fetch("http://localhost:3001/api/questions")
            .then(res => res.json()) // get the body of response and convert to json
            .then(data => {console.log(data);setQuestions(data)})
            .catch(err => console.error(err));
    }, []);

    if(questions.length === 0){
        return (
            <div className="
            min-h-screen flex justify-center items-center flex-col gap-5
            ">
                <h1> 加载中...</h1>
            </div>
        )
    }
    
    
    
    function handleSelected(selectedId){
        setSelected(selectedId);
        console.log("option selected: ", selectedId);
    }
    function checkAnswer(){
        if(selected === questions[questionId].correct_option_id){
            setScore(score + 1);
            console.log("回答正确");
            return score + 1;
            
        }
        else{
            console.log("回答错误");
            
        }
        console.log("score: ", score);
        return score;
    }
    function handleNext(){
        // if(selected === null){
        //     alert("请选择一个选项!");
        //     return;
        // }
        let newScore = checkAnswer();
        if(questionId === questions.length - 1){
            navigate("/ScorePage", {
                state: {
                    score: newScore,
                    total: questions.length
                }
            });
            return;
        }
        setSelected(null);
        setQuestionId(questionId + 1);
        
    }
    if(testStart === false){
        return(
            <div className="
            flex flex-col gap-5 items-center justify-center
            ">

                <button className="
                bg-green-500 text-white w-30 h-10 rounded-lg
                "
                onClick={ ()=>setTestStart(true)}
                >
                开始测试！
                </button>

                <HomePageButton />
            </div>
        )
    }
    return(
       
        <div>
            <div className = "absolute top-[30%]">
                <AddQuestionButton />
            </div>
            <div className="
        min-h-screen flex justify-center items-center flex-col gap-5
        ">
            <div className = "flex flex-col gap-5 items-center justify-center">
                <Question
                question = {questions[questionId].question_text}
                options = {questions[questionId].options}
                selected = {selected}
                onSelected = {handleSelected}
                />
            </div>

            <button className={`
            text-white w-30 h-10 rounded-lg
            ${selected === null ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500'}
            `}
            disabled = {selected === null}
            onClick={handleNext}
            >
                下一题
            </button>

            <HomePageButton />

        </div>
        </div>
        
    )
    
}