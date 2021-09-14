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


    return (
        <PriorityContext.Provider value={
            {
                priorities, getPriorities, createPriority
            }
        }>
            {props.children}
        </PriorityContext.Provider>
    )
}