import React from 'react';

function Footer ({ListJobs, filter, setFilter, filters, destroyCompleted}){

    return (
        <>
            <footer className="footer">
				<span className="todo-count"><strong>{ListJobs.length}</strong> item left</span>
				<ul className="filters">
					{Object.keys(filters).map(type =>(
						<li key={type}>
							<a className={type == filter ? "selected" : undefined } 
							onClick={()=> setFilter(type)}
							>{type[0].toUpperCase() + type.slice(1)}</a>
						</li>
					)
					)}
				</ul>
				{filter === "all" && 
					<button 
					className="clear-completed"
					onClick={destroyCompleted}
					>Clear completed</button>
					}
			</footer>
        </>
    );
}

export default Footer;
