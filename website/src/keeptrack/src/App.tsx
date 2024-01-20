import React,{useState} from 'react';
import './App.css';

import "katex/dist/katex.min.css";
import Question from "./Question"

function App() {
    const [wasPressed, setWasPressed] = useState(false);
    function f(wasPressed:boolean) {
	if (!wasPressed){
	    return (<button onClick={()=>setWasPressed(true)}>Start</button>)
	}else {
	    return (<Question />)
	}
    }
    return (
	<div className="App">
	    {f(wasPressed)}
	</div>
    );
}


export default App;
