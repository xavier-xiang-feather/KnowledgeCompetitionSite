import db from "../database/db.js";

export async function getQuestions(){
    const [datas] = await db.query(
        `
        SELECT 
        q.id, q.question_text, q.image_url, q.audio_url, q.correct_option_id, 
        o.option_id, o.option_text
        FROM questions q JOIN options o
        ON q.id = o.question_id
        ORDER BY q.id, o.option_id;
        `
    );
    const questions = [];
    let currentQuestion = null;
    for(const data of datas){
        if(!currentQuestion || currentQuestion.id !== data.id){
            currentQuestion = {
                id: data.id,
                question_text: data.question_text,
                image_url: data.image_url,
                audio_url: data.audio_url,
                correct_option_id: data.correct_option_id,
                options: []
            };
            questions.push(currentQuestion);
        }
        currentQuestion.options.push({
            option_id: data.option_id,
            option_text: data.option_text
        });
    }
    return questions;
}

export async function addQuestion(
    question_text, 
    image_url= null, 
    audio_url= null, 
    correct_option_id, 
    options
){
    /*
    add a new question to the question bank, 
    return question_id of the new question
    */
    const connection = await db.getConnection();
    try{
        await connection.beginTransaction();

        // insert question
        const [result] = await connection.query(
            `
            INSERT INTO questions(question_text, image_url, audio_url, correct_option_id)
            VALUES(?, ?, ?, ?)
            `,
            [question_text, image_url, audio_url, correct_option_id]
        );
        if(result.affectedRows === 0){
            throw new Error("Failed to add a question");
        }

        const next_question_id = result.insertId;
        let current_option_id = 1;

        for (const option of options){
            const [option_result] = await connection.query(
                `
                INSERT INTO options(question_id, option_id, option_text)
                VALUES(?, ?, ?)
                `,
                [next_question_id, current_option_id, option.option_text]
            );
            if(option_result.affectedRows === 0){
                throw new Error("Failed to add an option, option id: " + current_option_id);
            }
            current_option_id++;
        }
        await connection.commit();
        return next_question_id;
    }
    catch(err){

        await connection.rollback(); // if one step fails, rollback
        throw err;
    }
    finally{
        connection.release();
    }
}

export async function editQuestion(
    question_id,
    new_question_text,
    new_img_url,
    new_audio_url,
    new_correct_option_id,
    new_options   
){
    /*
    new_options is an array of objects, where each object has its .option_text
    */
   console.log("Model receives:");
   console.log(new_question_text);
   console.log(new_img_url);
   console.log(new_audio_url);
   console.log(new_correct_option_id);
   console.log(JSON.stringify(new_options));
    const connection = await db.getConnection();
    try{
        await connection.beginTransaction();

        // update in "questions"
        const [result] = await connection.query(
            `
            UPDATE questions
            SET question_text = ?, image_url = ?, audio_url = ?, correct_option_id = ?
            WHERE id = ?;
            `,
            [new_question_text, new_img_url, new_audio_url, new_correct_option_id, question_id]
        );
        if (result.affectedRows === 0){
            throw new Error("Question not found.");
        }

        // update in "options": delete the old options and insert new options
        const [delete_result] = await connection.query(
            `
            DELETE FROM options
            WHERE question_id = ?
            `,
            [question_id]
        );
        // if(delete_result.affectedRows === 0){
        //     throw new Error("Failed to delete old options");
        // }

        let current_option_id = 1;
        for (const option of new_options){
            const [option_result] = await connection.query(
                `
                INSERT INTO options(question_id, option_id, option_text)
                VALUES(?, ?, ?)
                `,
                [question_id, current_option_id, option.option_text]
            );
            if(option_result.affectedRows === 0){
                throw new Error("Failed to add an option, id: " + current_option_id);
            }
            current_option_id++;
        }
        await connection.commit();
        return;

    }
    catch(err){
        await connection.rollback();
        throw err;
    }
    finally{
        connection.release();
    }
}

export async function deleteQuestion(
    question_id
){
    const connection = await db.getConnection();
    try{
        await connection.beginTransaction();

        // delete from "options"
        const [option_result] = await connection.query(`
            DELETE FROM options
            WHERE question_id = ?
            `,
        [question_id]
    )
    // if(option_result.affectedRows === 0){
    //     throw new Error("Not found in options");
    // }

        // delete from "questions"
        const [result] = await connection.query(`
            DELETE FROM questions
            WHERE id = ?
            `,
        [question_id]
    )
    if(result.affectedRows === 0){
        throw new Error("Question not found");
    }
    await connection.commit();
    return;
    }
    catch(err){
        await connection.rollback();
        throw err;
    }
    finally{
        connection.release();
    }
}
// try{
//     const [questions] = await db.query(
//         `
//         SELECT 
//         id, question_text, image_url, audio_url, correct_option_id 
//         FROM questions 
//         `
//     );

//     if (questions.length > 0){
//         console.log("receive questions succesfully");
//     }
//     else{
//         console.log("fail to receive questions from MySQL");
//     }
//     const [options] = await db.query(
//         `
//         SELECT 
//         option_id, option_text 
//         FROM options
//         `
//     );
//     if(options.length > 0){
//         console.log("receive options succesfully");
//     }
//     else console.log("fail to receive options from MySQL");
// }
// catch(err){
//     console.error("MySQL query failed: ", err);
// }