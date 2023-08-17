import React, { useContext, useState } from 'react';
import { HandleEContext } from '../Todo';
function TodoItem({job}) {


    const destroyJob = useContext(HandleEContext).destroyJob
    const updateJob = useContext(HandleEContext).updateJob
    const handleDbl = useContext(HandleEContext).handleDbl
    const handleCheckbox = useContext(HandleEContext).handleCheckbox
    const editing = useContext(HandleEContext).editing


    const [newJob, setNewJob] = useState(job.title)
    // console.log(updateJob)

    var liClasses = ``


    return (
        <>
        <li  className={`${job.isCompleted && "completed"} ${editing === job.id && "editing"}`}>
            <div className="view">
                <input 
                className="toggle" 
                type="checkbox" 
                onChange={()=> handleCheckbox(job.id)} 
                checked = {job.isCompleted}
                />
                <label
                onDoubleClick={()=>handleDbl(job.id)}
                >{job.title}</label>
                <button className="destroy" 
                onClick = {()=>destroyJob(job.id)}
                ></button>
            </div>
            <input 
            className="edit" 
            value={newJob} 
            onChange={(e)=> setNewJob(e.target.value)} 
            onKeyDown={(e)=>e.code === 'Enter'  && updateJob(newJob) && setNewJob('')}
            onBlur={()=> updateJob(newJob) && setNewJob('')}
            />
        </li>
        </>
    );
}

export default TodoItem;