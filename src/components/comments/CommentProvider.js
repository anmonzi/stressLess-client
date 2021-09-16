import React, { useState, createContext } from 'react'

export const CommentContext = createContext()

export const CommentProvider = (props) => {
    const [ comments, setComments ] = useState([])

    const getComments = () => {
        return fetch("http://localhost:8000/comments", {
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setComments)
    }


    const createComment = commentObj => {
        return fetch("http://localhost:8000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            },
            body: JSON.stringify(commentObj)
        })
        .then(getComments)
        .then()
    }


    const editComment = comment => {
        return fetch(`http://localhost:8000/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            },
            body: JSON.stringify(comment)
        })
        .then(getComments)
        .then()
    }


    const getCommentById = commentId => {
        return fetch(`http://localhost:8000/comments/${commentId}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(res => res.json())
    }

    const deleteComment = commentId => {
        return fetch(`http://localhost:8000/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(getComments)
    }


    return (
        <CommentContext.Provider value={
            {
                comments, getComments, createComment,
                editComment, getCommentById, deleteComment
            }
        }>
            {props.children}
        </CommentContext.Provider>
    )
}