import React, { useState, createContext } from 'react'

export const MotivationContext = createContext()

export const MotivationProvider = (props) => {
    const [motivations, setMotivations] = useState([])

    const getMotivations = () => {
        return fetch("http://localhost:8000/motivation", { 
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
          }
        )
        .then((res) => res.json())
        .then(setMotivations)
      }

      return (
          <MotivationContext.Provider value={
              {
                  motivations, getMotivations
              }
          }>
              {props.children}
          </MotivationContext.Provider>
      )
}