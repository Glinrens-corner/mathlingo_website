'use client'
import {getVar} from './actions.js'
import {useState, useTransition} from 'react'

export default function Home() {
    const [name, setName] = useState('First Post')
    const [isPending, startTransition] = useTransition()
    return (<>
	<h1>{name}</h1>
	<button onClick={()=>startTransition(
	    ()=> setName(getVar())
	)} >get the variable
	</button >
	</>
  );
}
