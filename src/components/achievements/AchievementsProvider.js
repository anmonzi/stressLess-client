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

    const deleteAchievement = priorityId => {
        return fetch(`http://localhost:8000/priorities/${priorityId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(getAchievements)
    }


    return (
        <AchievementContext.Provider value={
            {
                achievements, getAchievements,
                deleteAchievement
            }
        }>
            {props.children}
        </AchievementContext.Provider>
    )
}