import React, { useEffect, useContext, useState } from "react"
import { PostContext } from "../posts/PostProvider"
import { useHistory } from 'react-router'
import * as BsIcons from "react-icons/bs"
import { Container, Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import "./Reaction.css"



export const Reaction = ({ post }) => {
   const { favoritePost, unfavoritePost } = useContext(PostContext)


    return (
        <>
            {
                (post.favorited)
                ? <BsIcons.BsFillHeartFill className="reaction filled" onClick={() => {
                    unfavoritePost(post.id)
                }}/>
                : <BsIcons.BsHeart className="reaction outline" onClick={() => {
                    favoritePost(post.id)
                }}/>
            }
           
        </>
    )
}

