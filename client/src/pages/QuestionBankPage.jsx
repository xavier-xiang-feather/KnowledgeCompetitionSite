import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import HomePageButton from '../components/HomePageButton';
import AddQuestionButton from '../components/AddQuestionButton';

export default function QuestionBankPage(){
    const token = localStorage.getItem("token");
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect( ()=>{
        loadQuestions()
    },[]);
    if(loading){
        return(
            <div className="
            min-h-screen flex justify-center items-center flex-col gap-5
            ">
                <h1> 加载中...</h1>
            </div>
        )
    }
    function loadQuestions(){
        fetch("http://localhost:3001/api/questions")
            .then(res => res.json())
            .then(data => {setLoading(false); setQuestions(data)})
            .catch(err => {setLoading(false); console.error(err)});
    }

    function handleEditQuestion(question){
        navigate("/EditQuestionPage", {
            state: {
                question: question
            }
        });
    }
    async function handleDeleteQuestion(questionId){
        try{
            const response = await fetch(`http://localhost:3001/api/questions/${questionId}`,{
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question_id: questionId
                })
            });
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }

            
            loadQuestions();
        }
        catch(err){
            alert("无法连接到服务器");
            console.error(err);
        }
    }

    return(
        <div className="
        flex flex-col items-center justify-center gap-5
        text-white
        ">
            <h1>题库</h1>
            <table>
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">题目</th>
                        <th className="border p-2">选项</th>
                        <th className="border p-2">答案</th>
                        <th className="border w-25"></th>
                        <th className="border w-25"></th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question, index) => (
                        <tr key={question.id} className="">
                            <td className="border p-2 text-center">
                                {index+1}
                            </td>
                            <td className="border p-2">
                                {question.question_text}
                            </td>
                            <td className="border p-2">
                                {question.options.map(option => option.option_text).join("; ")}
                            </td>
                            <td className="border p-2">
                                {
                                    question.options.find(
                                        option => option.option_id === question.correct_option_id
                                    )?.option_text
                                }
                            </td>
                            <td className="border p-2">
                                <button className="
                                bg-orange-500 text-white w-20 rounded-lg
                                "
                                onClick={()=>handleEditQuestion(question)}
                                >
                                    修改
                                </button>
                            </td>
                            <td className="border p-2">
                                <button className="
                                bg-red-500 text-white w-20 rounded-lg
                                "
                                onClick={()=>handleDeleteQuestion(question.id)}
                                >
                                    删除
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddQuestionButton />
            <HomePageButton />
        </div>
        
    )
}