import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ListJobs}) {
    return (
        <>
            <section className="main">
				<input id="toggle-all" className="toggle-all" type="checkbox"/>
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul className="todo-list">
                    {ListJobs.map((job)=><TodoItem key={job.id} job={job} />)}
                    
                </ul>
            </section>
        </>
    );
}

export default TodoList;