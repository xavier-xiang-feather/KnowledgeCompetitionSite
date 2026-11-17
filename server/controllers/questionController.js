import * as questionModel from "../models/questionModel.js";

export async function getQuestions(req, res){
    try{
        const questions = await questionModel.getQuestions();
        return res.json(questions);
        
    }
    catch(err){
        return res.status(500).json({
            error: err.message
        });
    }
}

export async function addQuestion(req, res){
    const {question_text, image_url, audio_url, correct_option_id, options} = req.body;

    if( !question_text || !correct_option_id || !Array.isArray(options) || options.length < 2 
        || correct_option_id < 1 || correct_option_id > options.length
    ){
        return res.status(400).json({
            message: "Invalid request body. Missing required fields"
        });
    }

    if(options.length > 6){
        return res.status(400).json({
            message: "Too many options! Maximum is 6"
        });
    }
    if( options.some(option => !option.option_text || option.option_text.trim() === "")){
        return res.status(400).json({
            message:"Can't have empty option"
        })
    }
    try{
        
        const question_id = await questionModel.addQuestion(
            question_text,
            image_url,
            audio_url,
            correct_option_id,
            options
        );
        return res.status(201).json({
            id: question_id,
            message: "Question added successfully"
        });
    }
    catch(err){
        return res.status(500).json({
            message: "Failed to add a question",
            error: err.message
        });
    }
}

export async function editQuestion(req, res){
    const {question_text, image_url, audio_url, correct_option_id, options} = req.body;
    const question_id = Number(req.params.id);
    console.log(req.body);


    if(!Number.isInteger(question_id) || question_id <= 0 || !question_text || question_text.trim() === "" || 
    correct_option_id <= 0 || !Array.isArray(options) || correct_option_id > options.length
    ){
        return res.status(400).json({
            message:"Invalid inputs. Check question ID, question text, options.",
            question_text,
            correct_option_id,
            options
            
        });
    }
    if(options.length < 2 || options.length > 6){
        return res.status(400).json({
            message: "Invalid options length. 1 < options length < 7"
        });
    }
    if( options.some(option => !option.option_text || option.option_text.trim() === "")){
        return res.status(400).json({
            message:"Can't have empty option"
        })
    }


    try {
        await questionModel.editQuestion(question_id, question_text, image_url, audio_url, correct_option_id, options);
        return res.status(200).json({
            message: "Successfully updated question"
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Failed to update a question",
            error: err.message
        });
    }
}

export async function deleteQuestion(req, res){
    const question_id = Number(req.params.id);
    if(!Number.isInteger(question_id) || question_id <= 0){
        
        return res.status(400).json({
            message: "Invalid question id"
        });

    }
    try{
        await questionModel.deleteQuestion(question_id);
        return res.status(200).json({
            message: "Question is deleted successfully"
        });
    }
    catch(err){
        return res.status(500).json({
            message:"Failed to delete a question",
            error: err.message
        });
    }
}