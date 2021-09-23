import React, { useState, createContext } from 'react'

export const AppUserContext = createContext()

export const AppUserProvider = (props) => {
    const [appUsers, setAppUsers] = useState([])

    const getAppUsers = () => {
        return fetch("http://localhost:8000/appusers", {
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setAppUsers)
    }


    const changeUserStatus = userId => {
        return fetch(`http://localhost:8000/admin/${ userId }/deactivate`, {
            method: "PUT",
            headers:{
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(getAppUsers)
    }

    return (
        <AppUserContext.Provider value={
            {
                appUsers, getAppUsers,
                changeUserStatus
            }
        }>
            {props.children}
        </AppUserContext.Provider>
    )
}