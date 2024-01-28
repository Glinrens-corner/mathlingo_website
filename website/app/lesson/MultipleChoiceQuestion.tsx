import {useState} from 'react';
import './Question.css'
import Latex from 'react-latex-next'


function MultipleChoiceAnswer({answerdata}: {answerdata:{isCorrect:boolean,
							 isSelected:boolean,
							 text:string,
							 toggleAnswer:()=>void}}) {
    const cover_class = answerdata.isSelected ? "answer-selected" : "answer-not-selected";
    return (<div className="answer-container">
	<div className={`answer-cover ${cover_class}`} onClick={answerdata.toggleAnswer}>
	<Latex>{answerdata.text}</Latex>
	    
	    </div>
	    </div>)
}

function MultipleChoiceAnswerSolution({answerdata}: {answerdata:{isCorrect:boolean,
								 isSelected:boolean,
								 text:string,
								 toggleAnswer:()=>void}}) {
    if(answerdata.isSelected === answerdata.isCorrect){
	return (<div className="answer-container">
	    <div className="answer-cover solution-correct" >
	<Latex>{answerdata.text}</Latex>
	    </div>
	    </div>)
    } else {
	return (<div className="answer-container">
	    <div className="answer-cover solution-incorrect">
	<Latex>{answerdata.text}</Latex>
	    </div>
	    </div>)
    }
}

function MultipleChoiceQuestion({question}:{question:{type_:string,text:string,answers:[boolean,string][]}}) {

    const[selectionActive,setSelectionActive]=useState(true);
    const [answersSelected,setSelectedAnswers] =useState(question.answers.map(()=>false))
    const answerdata =question.answers.map((answer,i)=>{return {"isCorrect":answer[0],
								"isSelected":answersSelected[i],
								"text":answer[1],
								"toggleAnswer":()=>{
								    const newSelectedAnswers = answersSelected.slice()
								    newSelectedAnswers[i] = !newSelectedAnswers[i] 
								    setSelectedAnswers(newSelectedAnswers)
								}}

						       })
    if (selectionActive){
	return (<><h1>Multiple Choice Question</h1>
	    <div className="question-container">
	    <Latex>{question.text}</Latex>
	    <div className="answers-container">
	    {question.answers.map((answer,i)=>(
		<MultipleChoiceAnswer key={i} answerdata={answerdata[i]}/>
	    ))}
		</div>
	    </div>
	    <button onClick={()=>setSelectionActive(false)}>submit</button>
	    </>);
    }else {
	return (<><h1>Multiple Choice Question</h1>
	    <div className="question-container">
	    <Latex>{question.text}</Latex>
	    <div className="answers-container">
	    {question.answers.map((answer,i)=>(
		<MultipleChoiceAnswerSolution key={i} answerdata={answerdata[i]}/>
	    ))}
		</div>
	    </div>
	    <button onClick={()=>setSelectionActive(false)}>submit</button>
	    </>);

	
    }
}
