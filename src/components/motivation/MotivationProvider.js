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

      const createMotivation = motivationObj => {
        return fetch("http://localhost:8000/motivations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            },
            body: JSON.stringify(motivationObj)
        })
        .then(getAllMotivations)
        .then()
    }
      

      return (
          <MotivationContext.Provider value={
              {
                  motivation, getNewestMotivation,
                  allMotivations, getAllMotivations,
                  createMotivation
              }
          }>
              {props.children}
          </MotivationContext.Provider>
      )
}