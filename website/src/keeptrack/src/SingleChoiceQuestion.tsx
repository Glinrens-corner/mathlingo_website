import {useState} from 'react';
import './SingleChoiceQuestion.css'
import './Question.css'
import Latex from 'react-latex-next'
import {SingleChoiceQuestionT,
	} from './QuestionTypes' 


function QuestionText({question}:{question:SingleChoiceQuestionT}){
    return (<div className="question-text"><Latex>{question.text}</Latex></div>)

}


function AnswerOption({iOption,text,setThisOption,isSelected}:
		      {iOption:number,
		       text:string,
		       setThisOption:()=>void,
		       isSelected:boolean}){
    const coverClass = "answer-cover "+ (isSelected? "answer-selected":"answer-not-selected") 
    return (<div className="single-choice-answer-container"><div className={coverClass} onClick={setThisOption}>
	<Latex>{text}</Latex>
	</div>
	</div>)
}

function AnswerOptions({question, setSelectedAnswer,selectedAnswer}:
		       {question:SingleChoiceQuestionT,
			setSelectedAnswer:(arg0:"none"|number)=>void,
			selectedAnswer:"none"|number
		       }){
    return (<div className="single-choice-answers-container">
	{question.answers.map((text,i) =>
	    (<AnswerOption key={i} iOption={i} text={text} setThisOption={()=>setSelectedAnswer(i)} isSelected={i===selectedAnswer}/>))}
	</div>)
}

export default function ({question}:{question:SingleChoiceQuestionT}){
    
    const [selectedAnswer, setSelectedAnswer] = useState<"none"|number>("none")


    return (<>
	<QuestionText question={question} />
	<AnswerOptions question={question} setSelectedAnswer={setSelectedAnswer } selectedAnswer={selectedAnswer} />
	</>)
}
