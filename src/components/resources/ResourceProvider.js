import React, { useState, createContext } from 'react'

export const ResourceContext = createContext()

export const ResourceProvider = (props) => {
    const [resources, setResources] = useState([])

    const getResources = () => {
        return fetch("http://localhost:8000/resources", {
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setResources)
    }

    return (
        <ResourceContext.Provider value={
            {
                resources, getResources
            }
        }>
            {props.children}
        </ResourceContext.Provider>
    )
}