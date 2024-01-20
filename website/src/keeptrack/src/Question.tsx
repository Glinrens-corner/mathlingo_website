import {useState} from 'react';
import './Question.css'
import SingleChoiceQuestion from './SingleChoiceQuestion'
import {QuestionT,
	SingleChoiceQuestionT,
	isSingleChoiceQuestionT
       } from './QuestionTypes' 

const questions: QuestionT[]=[{type_:"single_choice",
		text: "Was ist die bedeutung von  $\\mathbb{N}$",
		correctChoice:2, 
		answers:["Alle ganzen Zahlen","$\\{0,1,2...\\}$","$\\{1,2,3,4...\\}$"]}]




function Question(){
    const [iQuestion, setIQuestion] = useState(0)
    const nextQuestion = ()=> setIQuestion(iQuestion+1)
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
	return (<div className="question-frame">{mapQuestion(local_question)}</div>)
    } catch (err) {
	return (<div>Zoinks something went wrong!</div> )
    }
}


export default Question
