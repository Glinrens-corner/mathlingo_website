'use server'

import {QuestionT,
	SingleChoiceQuestionT,
	isSingleChoiceQuestionT
       } from './QuestionTypes' 
import {Client} from 'pg'



const questions: QuestionT[]=[
    {type_:"single_choice",
     text: "Was ist die bedeutung von  $\\mathbb{N}$?",
     correctChoice:2, 
     answers:["Alle ganzen Zahlen","$\\{0,1,2...\\}$","$\\{1,2,3,4...\\}$"]}]

function logError(err){
    console.log("Error:"+err)
    return null;
}
export async function fetchQuestions(){
    console.log(process.env.MATHLINGO_PASSWORD)
    const client = new Client({
	user: 'mathlingo',
	host: 'mathlingo_database',
	database: 'mathlingo',
	password: process.env.MATHLINGO_PASSWORD,
	port:5432
    })
    await client.connect();
    const res = await client.query(
	'SELECT content FROM question;');
    await client.end();
    console.log(res.rows[0]["content"])
    return [res.rows[0]["content"]];
}
