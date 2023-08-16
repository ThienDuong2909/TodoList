import React, { useRef, useState } from 'react';

function Header({addJob}) {
    const inputRef = useRef((e)=>{
        e.target.focus()
    })
    const [job, setJob] = useState('')
    const handleAdd = e =>{
        addJob({
            id: Math.floor(Math.random()*1000),
            title: e.target.value,
            isCompleted: false,
        })
        setJob('')
    }
    return (
        <>
            <header className="header">
				<h1>Todos</h1>
				<input 
                ref = {inputRef}
                value={job}
                className="new-todo" 
                placeholder="What needs to be done?" 
                autoFocus
                onChange={(e)=>setJob(e.target.value)}
                onKeyDown={(e)=>e.code === 'Enter' && handleAdd(e)}
                />
			</header>
        </>
    );
}

export default Header;