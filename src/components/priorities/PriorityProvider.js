import React, { useState, createContext } from 'react'

export const PriorityContext = createContext()

export const PriorityProvider = (props) => {
    const [priorities, setPriorities] = useState([])

    const getPriorities = () => {
        return fetch("http://localhost:8000/priorities", {
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setPriorities)
    }

    const createPriority = priorityObj => {
        return fetch("http://localhost:8000/priorities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            },
            body: JSON.stringify(priorityObj)
        })
        .then(getPriorities)
        .then()
    }

    const editPriority = priority => {
        return fetch(`http://localhost:8000/priorities/${priority.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            },
            body: JSON.stringify(priority)
        })
        .then(getPriorities)
        .then()
    }
    
    const getPriorityById = priorityId => {
        return fetch(`http://localhost:8000/priorities/${priorityId}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(res => res.json())
    }


    return (
        <PriorityContext.Provider value={
            {
                priorities, getPriorities,
                createPriority, editPriority,
                getPriorityById
            }
        }>
            {props.children}
        </PriorityContext.Provider>
    )
}