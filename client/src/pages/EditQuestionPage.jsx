import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import HomePageButton from '../components/HomePageButton'

export default function EditQuestionPage(){
    const token = localStorage.getItem("token");
    const {state} = useLocation();
    const question = state.question;

    const [questionText, setQuestionText] = useState(question.question_text);
    const [imageURL, setImageURL] = useState(question.image_url);
    const [audioURL, setaudioURL] = useState(question.audio_url);
    const [correctOptionId, setCorrectOptionId] = useState(question.correct_option_id);
    const [options, setOptions] = useState(question.options);
    const [optionText, setOptionText] = useState("");

    function handleAddOption(){
        if(optionText.trim() === "") return;
        const newOption = {
            option_text: optionText
        };
        setOptions(prev => [...prev, newOption]);
        setOptionText("");
    }
    function handleDeleteOption(deleteId){
        if(correctOptionId === deleteId + 1){
            setCorrectOptionId(0);
        }
        else if(correctOptionId > deleteId + 1){
            setCorrectOptionId(prev => prev - 1);
        }
        setOptions(prev => 
            prev.filter((_, index) => index !== deleteId)
        );
        
    }
    async function handleSubmit(){
        console.log("Entered question: " + questionText);
        console.log("Entered correct option id: " + correctOptionId);
        
        try{
            const response = await fetch(`http://localhost:3001/api/questions/${question.id}`,{
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question_text: questionText,
                    image_url: imageURL,
                    audio_url: audioURL,
                    correct_option_id: correctOptionId,
                    options: options,

                }),
            });
            const data = await response.json();
            console.log("Hello" + data.question_text);
            if(!response.ok){
                alert(data.message);
                
                return;
            }
            alert("修改成功");

        }
        catch(err){
            alert("无法连接到服务器");
            console.error(err);
        }
    }

    return(
        <div className="
        flex flex-col gap-5 items-center justify-center
        text-white
        ">
            <h1>修改问题</h1>
            <div className="
            flex flex-col gap-2">
                <span>题目</span>
                <input type="text"
                value={questionText}
                onChange={(e)=>setQuestionText(e.target.value)}
                className="bg-white text-black"/>
            </div>

            <div className="
            flex flex-col gap-2">
                <span>选项:</span>
                <input type="text"
                value={optionText}
                onChange={(e)=> setOptionText(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        handleAddOption()
                    }
                }}
                className="bg-white text-black w-50"/>
                
                <button 
                    onClick={() => handleAddOption()}
                    className="bg-green-500 text-white w-25 h-8 rounded-lg">
                        添加选项
                        </button>
            
            </div>

            <div className="
            flex flex-col gap-2 items-center justify-center">
                <span>正确答案:</span>
                {/* <input type="text"
                value={correctOptionId}
                onChange={(e)=> setCorrectOptionId(e.target.value)}
                className="bg-white text-black w-50"/> */}
                <div className="
                flex flex-wrap gap-2 items-center justify-center">
                    {options.map((option, index)=>(
                        <div
                            key={index + 1}
                            className= "relative">
                            <button
                            
                            className={'min-w-20 px-4 h-10 rounded-lg bg-gray-50 ' + (
                                correctOptionId === index + 1 ? 'bg-green-500' : 'bg-gray-500'
                            )}
                            onClick={() => {
                                setCorrectOptionId(index + 1) 
                                console.log("Selected: ", index + 1)
                            }}
                            >
                                {option.option_text}
                            </button>
                            <button className="
                            absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500
                            text-white text-xs flex items-center justify-center
                            hover:bg-red-600"
                            onClick={()=>{handleDeleteOption(index)}}
                            >x</button>
                        </div>
                    ))}
                    {/* {console.log("correctOptionId: ", correctOptionId)} */}
                </div>
                
            </div>

            <button className="bg-green-500 text-white w-30 h-10 rounded-lg"
            onClick={handleSubmit}>
                提交
            </button>

            <HomePageButton />
            
        
        </div>
    )
}