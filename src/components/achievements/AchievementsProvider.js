import React, { useState, createContext } from 'react'

export const AchievementContext = createContext()

export const AchievementProvider = (props) => {
    const [achievements, setAchievement] = useState([])

    const getAchievements = () => {
        return fetch("http://localhost:8000/priorities", {
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setAchievement)
    }

    // TODO: create deleteAchievement for deleting a priority to complete CRUD


    return (
        <AchievementContext.Provider value={
            {
                achievements, getAchievements
            }
        }>
            {props.children}
        </AchievementContext.Provider>
    )
}