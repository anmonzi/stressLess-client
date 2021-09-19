import React, { useEffect, useContext, useState } from "react"
import { PostContext } from "./PostProvider"
import { CommentList } from "../comments/CommentList"
import { CommentForm } from "../comments/CommentForm"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { DateTime } from "luxon"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"
import Swal from "sweetalert2"


export const Post = ({ postObject }) => {
    // returns individual posts to post list
    const { deletePost, getPosts } = useContext(PostContext)
    const history = useHistory()

    const [ showComments, setShowComments ] = useState(false)
    const [ showCommentInput, setShowCommentInput ] = useState(false)
    const [ showButton, setShowButton ] = useState(true)

    // making date readable to humans
    // const monthDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    const date = new Date(postObject.publication_date)
    const monthDate = { month: 'long', day: 'numeric'}
    const time = { hour: 'numeric', minute: 'numeric' }
    const humanMonthDate = date.toLocaleDateString('en-US', monthDate)
    const humanTime = date.toLocaleString('en-US', time)
    

    const handleDeletePost = (postId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to undo!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Ah, cancel"
          }).then((result) => {
            if (result.isConfirmed) {
              deletePost(postId).then(() => {
                Swal.fire(
                  "Deleted!",
                  "Your comment has been deleted.",
                  "Success!"
                ).then(() => {
                    
                })
              })
            }; 
        })
    }
    

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Subtitle>{postObject.app_user?.full_name}</Card.Subtitle>
                    <Card.Subtitle><div>{humanMonthDate} at {humanTime}</div></Card.Subtitle>
                    <Card.Title>{postObject.title}</Card.Title>
                    <Card.Text><div>{postObject.content}</div></Card.Text>
                    <Card.Img src={postObject.image_url} />
                    {
                        (postObject.owner)
                        ? <>
                            <Card.Link onClick={() => {history.push(`/post/${postObject.id}/edit`)}}>
                                <AiIcons.AiFillEdit /></Card.Link>
                            <Card.Link onClick={() => {
                                handleDeletePost(postObject.id)
                            }}><BsIcons.BsTrashFill/></Card.Link>
                          </>
                        : <></>
                    }
                    <Card.Subtitle>
                        {
                            (postObject.reaction_counter > 0)
                            ? <><div>{postObject.reaction_counter} Reactions</div></>
                            : null
                        }
                    </Card.Subtitle>
                    <Card.Link onClick={() => setShowComments(!showComments)}>
                        {
                            (postObject.comment_count > 0)
                            ? <><div>{postObject.comment_count} Comments</div></>
                            : null
                        }
                    </Card.Link>
                    {
                        (showComments)
                        ? <><CommentList postId={postObject.id}/></>
                        : null
                    }
                </Card.Body>
                <Card.Body>
                    {
                        (showButton)
                        ? <Button onClick={() => {
                            setShowButton(!showButton)
                            setShowCommentInput(!showCommentInput)
                          }}>Comment</Button>
                        : null
                    }
                </Card.Body>
                <Card.Body>
                    {
                        (showCommentInput)
                        ? <>
                            <CommentForm inputCollapse={setShowCommentInput} 
                                buttonHide={setShowButton} post={postObject}
                                commentShow={setShowComments}/>
                          </>
                        : null
                    }
                </Card.Body>
            </Card> 
        </>
    )
}


//TODO: pass setShowCommentInput and setShowButton state to comment form component as props