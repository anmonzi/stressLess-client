import React, { useState, createContext } from 'react'

export const ProfileContext = createContext()

export const ProfileProvider = (props) => {
    const [userProfile, setUserProfile] = useState({})

    const getUserProfile = () => {
        return fetch("http://localhost:8000/profile", {
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setUserProfile)
    }

    return (
        <ProfileContext.Provider value={
            {
                userProfile, getUserProfile
            }
        }>
            {props.children}
        </ProfileContext.Provider>
    )
}