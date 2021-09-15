import React, { useState, createContext } from 'react'

export const ReflectionContext = createContext()

export const ReflectionProvider = (props) => {
    const [reflections, setReflections] = useState([])

    const getReflections = () => {
        return fetch("http://localhost:8000/reflections", {
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setReflections)
    }

    const deleteReflection = reflectionId => {
        return fetch(`http://localhost:8000/reflections/${reflectionId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(getReflections)
    }


    return (
        <ReflectionContext.Provider value={
            {
                reflections, getReflections,
                deleteReflection
            }
        }>
            {props.children}
        </ReflectionContext.Provider>
    )
}