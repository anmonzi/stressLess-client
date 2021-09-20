import React, { useState, createContext } from 'react'

export const NavBarContext = createContext()

export const NavBarProvider = (props) => {
    const [user, setUser] = useState({})

    const checkIfStaff = () => {
        return fetch("http://localhost:8000/users", { 
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
          }
        )
        .then((res) => res.json())
        .then(setUser)
      }

      return (
          <NavBarContext.Provider value={
              {
                  user, checkIfStaff
              }
          }>
              {props.children}
          </NavBarContext.Provider>
      )
}