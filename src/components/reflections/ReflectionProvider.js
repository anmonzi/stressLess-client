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

    const createReflection = reflectionObj => {
        return fetch("http://localhost:8000/reflections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            },
            body: JSON.stringify(reflectionObj)
        })
        .then(getReflections)
        .then()
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
                deleteReflection, createReflection
            }
        }>
            {props.children}
        </ReflectionContext.Provider>
    )
}