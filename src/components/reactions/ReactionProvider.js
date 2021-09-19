import React, { useState, createContext } from 'react'

export const ReactionContext = createContext()

export const ReactionProvider = (props) => {
    const [reactions, setReactions] = useState([])

    const getReactions = () => {
        return fetch("http://localhost:8000/reactions", {
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setReactions)
    }

    return (
        <ReactionContext.Provider value={
            {
                reactions, getReactions
            }
        }>
            {props.children}
        </ReactionContext.Provider>
    )
}