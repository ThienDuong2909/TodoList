import React, { createContext, useEffect, useState } from 'react';
import './css/base.css'
import './css/comon.css'
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

const KEY_JOBS = "JOBS"

export const HandleEContext = createContext()

const Todo = () => {
    const [data, setData] = useState(()=> JSON.parse(localStorage.getItem(KEY_JOBS)) ?? [])
    const [jobs, setJobs] = useState(()=> JSON.parse(localStorage.getItem(KEY_JOBS)) ?? [])
    const [editing, setEditing] = useState()
    const [filter, setFilter] = useState('all')

    const storeLocal = jobs =>{
        localStorage.setItem(KEY_JOBS, JSON.stringify(jobs))
    }
    const getLocal = ()=>{
        const newData = JSON.parse(localStorage.getItem(KEY_JOBS))
        setData(newData)
    }
    const filters = {
        all: (data)=>{
            return data
        },
        active: (data)=>{
            return data.filter(x => !x.isCompleted)
        },
        completed: (data)=>{
            return data.filter(x => x.isCompleted)
        }
    }
    

    useEffect(()=>{
        setJobs(filters[filter](data))
    }, [filter])

    useEffect(()=>{
        getLocal()
    }, [jobs])

    const addJob = job =>{
        const jobsAfter = [job, ...jobs]
        storeLocal(jobsAfter)
        setJobs(jobsAfter)
    }

    const updateJob = newTitle =>{
        const updateJobs = [...jobs]
        updateJobs.forEach(job => {
            if(job.id === editing){
                job.title = newTitle
                job.isCompleted = false;
                return
            }
        });
        console.log(updateJobs)
        storeLocal(updateJobs)
        setJobs(updateJobs)
        setEditing('')
    }

    const destroyJob = id =>{
        const newJobs = jobs.filter(job => job.id !== id);
        storeLocal(newJobs)
        setJobs(newJobs)
    }
    
    
    const handleCheckbox = id =>{
        const newJobs = [...jobs]
        newJobs.forEach(job => {
            if(job.id === id){
                job.isCompleted = !job.isCompleted
            }
        });
        storeLocal(newJobs)
        setJobs(newJobs)
    }

    const handleDbl = id =>{
        setEditing(id)
    }
    console.log(data)
    const destroyCompleted = ()=>{
        const newData = filters.active(data)
        
        storeLocal(newData)
        console.log(data)
        setJobs(newData)
    }
    const objH = {
        destroyJob,
        updateJob,
        handleDbl,
        handleCheckbox,
        editing
    }   

    return (
        <HandleEContext.Provider value = {objH}>
            <div className='Todo'>
                <section className = "todoapp">
                    <Header addJob = {addJob} /> 
                    <TodoList 
                    ListJobs = {jobs} 
                    handleCheckbox = {handleCheckbox} 
                    />
                    {data && data.length > 0 && 
                        <Footer 
                        ListJobs = {jobs} 
                        setFilter = {setFilter} 
                        filters = {filters} 
                        filter={filter} 
                        destroyCompleted = {destroyCompleted}
                        />
                    }
                </section>
            </div>
        </HandleEContext.Provider>
    );
}

export default Todo;
