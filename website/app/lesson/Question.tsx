'use client'

import {useState, useTransition, useEffect} from 'react';
import './Question.css'
import SingleChoiceQuestion from './SingleChoiceQuestion'
import {fetchQuestions} from './actions'
import {QuestionT,
	SingleChoiceQuestionT,
	isSingleChoiceQuestionT
       } from './QuestionTypes' 





function Question(){
    const [iQuestion, setIQuestion] = useState(null) // index of current question
    // is null if no current questions are  
    const [questions, setQuestions] = useState([])
    const [isPending, startFetch] = useTransition();
    
    const nextQuestion = ()=> setIQuestion(iQuestion+1)

    useEffect(
	()=>{
	    fetchQuestions().then((res)=>{
		setQuestions(res);
		setIQuestion(0)
	    });
	}
	,[])

    
    function mapQuestion(question:QuestionT){
	if(isSingleChoiceQuestionT(question)){
 	    return (
		    <SingleChoiceQuestion question={question} />
	    )
	} else{
	    throw {what:"Unknown Question Type", where:"Question"}
	}
    }
    
    const local_question = questions[iQuestion];
    try{
	if (isPending || iQuestion===null){
	    return (<div> Question pending</div>)
	} else {
	    return (<div className="question-frame">{mapQuestion(local_question)}</div>)
	}
    } catch (err) {
	return (<div>Zoinks something went wrong!</div> )
    }
}


export default Question
