import React, { useState, createContext } from 'react'

export const MotivationContext = createContext()

export const MotivationProvider = (props) => {
    const [motivation, setMotivation] = useState({})
    const [allMotivations, setAllMotivations] = useState([])

    const getNewestMotivation = () => {
        return fetch("http://localhost:8000/motivations?sortBy=date", { 
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
          }
        )
        .then((res) => res.json())
        .then(setMotivation)
      }

      const getAllMotivations = () => {
        return fetch("http://localhost:8000/motivations", { 
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
          }
        )
        .then((res) => res.json())
        .then(setAllMotivations)
      }

      return (
          <MotivationContext.Provider value={
              {
                  motivation, getNewestMotivation,
                  allMotivations, getAllMotivations
              }
          }>
              {props.children}
          </MotivationContext.Provider>
      )
}