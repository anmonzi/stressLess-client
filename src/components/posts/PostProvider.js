import React, { useState, createContext } from 'react'

export const PostContext = createContext()

export const PostProvider = (props) => {
    const [ posts, setPosts ] = useState([])

    const getPosts = () => {
        return fetch("http://localhost:8000/posts", {
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setPosts)
    }

    const createPost = postObj => {
        return fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            },
            body: JSON.stringify(postObj)
        })
        .then(getPosts)
        .then()
    }

    const editPost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            },
            body: JSON.stringify(post)
        })
        .then(getPosts)
        .then()
    }
    
    const getPostById = postId => {
        return fetch(`http://localhost:8000/posts/${postId}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(res => res.json())
    }

    const deletePost = postId => {
        return fetch(`http://localhost:8000/posts/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(getPosts)
    }

    const favoritePost = postId => {
        return fetch(`http://localhost:8000/posts/${postId}/favorite_post`, {
            method: "POST",
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(getPosts)
    }

    const unfavoritePost = postId => {
        return fetch(`http://localhost:8000/posts/${postId}/favorite_post`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("stressLess_user_id")}`
            }
        })
        .then(getPosts)
    }


    return (
        <PostContext.Provider value={
            {
                posts, getPosts, createPost,
                editPost, getPostById, deletePost,
                favoritePost, unfavoritePost
            }
        }>
            {props.children}
        </PostContext.Provider>
    )
}