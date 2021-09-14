import React, { useState, createContext } from 'react'

export const DashboardContext = createContext()


export const DashboardProvider = (props) => {
    const [dashboard, setDashboard] = useState({})

    const getDashboard = () => {
        return fetch("http://localhost:8000/profile", {
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setDashboard)
    }


    return (
        <DashboardContext.Provider value={
            {
                dashboard, getDashboard
            }
        }>
            {props.children}
        </DashboardContext.Provider>
    )
}