import React, { useState, createContext } from 'react'

export const MotivationContext = createContext()

export const MotivationProvider = (props) => {
    const [motivation, setMotivation] = useState({})

    const getMotivation = () => {
        return fetch("http://localhost:8000/motivation", { 
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
          }
        )
        .then((res) => res.json())
        .then(setMotivation)
      }

      return (
          <MotivationContext.Provider value={
              {
                  motivation, getMotivation
              }
          }>
              {props.children}
          </MotivationContext.Provider>
      )
}