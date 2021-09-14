import React, { useState, createContext } from 'react'

export const PriorityContext = createContext()

export const PriorityProvider = (props) => {
    const [priorities, setPriorities] = useState({})

    const getPriorities = () => {
        return fetch("http://localhost:8000/priorities", {
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setPriorities)
    }


    return (
        <PriorityContext.Provider value={
            {
                priorities, getPriorities
            }
        }>
            {props.children}
        </PriorityContext.Provider>
    )
}