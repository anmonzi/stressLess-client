import React, { useEffect, useContext, useState } from "react"
import { PostContext } from "./PostProvider"
import { CommentList } from "../comments/CommentList"
import { CommentForm } from "../comments/CommentForm"
import { NavBarContext } from "../nav/NavBarProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"
import Swal from "sweetalert2"
import "./Post.css"


export const Post = ({ postObject }) => {
    // returns individual posts to post list
    const { deletePost, getPosts } = useContext(PostContext)
    const { user, checkIfStaff } = useContext(NavBarContext)
    const history = useHistory()

    const [ showComments, setShowComments ] = useState(false)
    const [ showCommentInput, setShowCommentInput ] = useState(false)
    const [ showButton, setShowButton ] = useState(true)

    useEffect(() => {
        checkIfStaff()
    }, [])

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
                    {/* Admin remove button for app user posts */}
                    {
                        (user.is_staff && !postObject.owner)
                        ? <div className="admin-button"><Button variant="danger" onClick={() => {
                            handleDeletePost(postObject.id)
                            }}>Remove</Button></div>
                        : null
                    }
                    <Card.Subtitle>{postObject.app_user?.full_name}</Card.Subtitle>
                    <Card.Subtitle className="text-muted"><div>{humanMonthDate} at {humanTime}</div></Card.Subtitle>
                    <Card.Title className="card-title">{postObject.title}</Card.Title>
                    <Card.Text><div>{postObject.content}</div></Card.Text>
                    {/* Is there an image attached to the post? */}
                    {
                        (postObject.image_url !== "")
                        ? <Card.Img src={postObject.image_url} />
                        : null
                    }
                    {/* Check if user is owner of post to view edit/delete */}
                    {
                        (postObject.owner)
                        // if owner of post show edit and delete buttons
                        ? <>
                            <Card.Body className="post-btn-group">
                                <Card.Link onClick={() => {history.push(`/post/${postObject.id}/edit`)}}>
                                    <AiIcons.AiFillEdit className="edit-icon" /></Card.Link>
                                <Card.Link onClick={() => {
                                    handleDeletePost(postObject.id)
                                }}><BsIcons.BsTrashFill className="edit-icon"/></Card.Link>
                            </Card.Body>
                          </>
                        : null
                    }
                    {/* Show comments is false at page load, if comment count make clickable to show comments */}
                    <Card.Link onClick={() => setShowComments(!showComments)}>
                        {
                            (postObject.comment_count > 0)
                            // if there are comments, show comment count under post
                            ? <><Card.Link className="comment-count">
                                {postObject.comment_count} Comments</Card.Link></>
                            : null
                        }
                    </Card.Link>
                    {
                        (showComments)
                        // if user clicks above comment count link, showComments state becomes TRUE
                        // Show list of comments
                        ? <><CommentList postId={postObject.id}/></>
                        : null
                    }
                </Card.Body>
                {/* Comment button hide/show and comment input hide/show */}
                <Card.Body>
                    {
                        // Showbutton (comment button) is true at page load, onclick set it to false
                        (showButton)
                        ? <Button onClick={() => {
                            setShowButton(!showButton)
                            // show comment input is false at page load, set it to true
                            setShowCommentInput(!showCommentInput)
                          }}>Comment</Button>
                        : null
                    }
                    {/* Show comment form is true, so pass props to comment form component */}
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