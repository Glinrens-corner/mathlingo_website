'use server'

import {QuestionT,
	SingleChoiceQuestionT,
	isSingleChoiceQuestionT
       } from './QuestionTypes' 

const questions: QuestionT[]=[
    {type_:"single_choice",
     text: "Was ist die bedeutung von  $\\mathbb{N}$?",
     correctChoice:2, 
     answers:["Alle ganzen Zahlen","$\\{0,1,2...\\}$","$\\{1,2,3,4...\\}$"]}]


export async function fetchQuestions(){
    return questions;
}
