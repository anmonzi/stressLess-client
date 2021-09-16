import React, { useEffect, useContext, useState } from "react"
import { PostContext } from "./PostProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { DateTime } from "luxon"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"


export const Post = ({ postObject }) => {
    // returns individual posts to post list
    const { deletePost } = useContext(PostContext)
    const history = useHistory()

    const [ showMe, setShowMe ] = useState(false)
    
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Subtitle><div>{postObject.publication_date}</div></Card.Subtitle>
                    <Card.Title>{postObject.title}</Card.Title>
                    <Card.Text><div>{postObject.content}</div></Card.Text>
                    <Card.Img src={postObject.image_url} />
                    {
                        (postObject.owner)
                        ? <>
                            <Card.Link onClick={() => {history.push(`/post/${postObject.id}/edit`)}}>
                                <AiIcons.AiFillEdit /></Card.Link>
                            <Card.Link onClick={() => {
                                deletePost(postObject.id)
                            }}><BsIcons.BsTrashFill/></Card.Link>
                          </>
                        : <></>
                    }
                    <Card.Link onClick={() => setShowMe(!showMe)}>Comments</Card.Link>
                    {
                        (showMe)
                        ? <><div>Comment Component HERE</div></>
                        : null
                    }
                </Card.Body>
            </Card> 
        </>
    )
}


