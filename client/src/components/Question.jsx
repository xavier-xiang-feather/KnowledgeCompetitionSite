import {useState} from "react";

export default function Question({question, options, selected, onSelected}){
    // const [selected, setSelected] = useState(null);
    
    // function handleOptionClick(optionId){
    //     setSelected(optionId);
    //     onSelected(optionId);
    // }

    return(
        <div className="
        flex flex-col gap-5 text-2xl text-white items-center justify-center
        ">
            <h1 className="font-bold items-center ">{question}</h1>
            <div className="flex gap-2 flex flex-col">
                {options.map((option, index)=>(
                    <button
                    key={option.option_id}
                    className={'w-30 h-10 rounded-lg' + (
                        selected === option.option_id ? ' bg-green-500' : 'bg-gray-500'
                    )}
                    onClick={()=> onSelected(option.option_id)}
                    >
                        {option.option_text}
                    </button>
                ))}
            </div>
        </div>
    )
}