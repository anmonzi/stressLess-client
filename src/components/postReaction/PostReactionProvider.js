import React, { useState, createContext } from 'react'

export const PostReactionContext = createContext()

export const PostReactionProvider = (props) => {
    const [postReactions, setPostReactions] = useState([])

    const getPostReactions = () => {
        return fetch("http://localhost:8000/post_reactions", { 
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
          }
        )
        .then((res) => res.json())
        .then(setPostReactions)
      }

      return (
          <PostReactionContext.Provider value={
              {
                  postReactions, getPostReactions
              }
          }>
              {props.children}
          </PostReactionContext.Provider>
      )
}