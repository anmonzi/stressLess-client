import React, { useEffect, useContext, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { PostContext } from "../posts/PostProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"
import Swal from "sweetalert2"


export const Comment = ({ commentObj, post }) => {
    // returns individual comment to comment list
    const { editComment, getCommentById, deleteComment } = useContext(CommentContext)
    const { getPosts } = useContext(PostContext)
    const currentUser = localStorage.getItem("stressLess_user_id")
    const postId = post

    // making date readable to humans
    // const monthDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    const date = new Date(commentObj.created_on)
    const monthDate = { weekday: 'long', month: 'short', day: 'numeric'}
    const time = { hour: 'numeric', minute: 'numeric' }
    const humanMonthDate = date.toLocaleDateString('en-US', monthDate)
    const humanTime = date.toLocaleString('en-US', time)
    // setting edit comment state
    const [ edit, setEdit ] = useState(false)
    // setting initial comment state
    const [ currentComment, setCurrentComment ] = useState({
        postId: postId,
        appUser: currentUser,
        content: "",
        createdOn: ""
    })


    useEffect(() => {
        if (edit === true) {
            getCommentById(commentObj.id).then(comment => {
                setCurrentComment({
                    postId: comment.post_id,
                    appUser: comment.app_user,
                    content: comment.content,
                    createdOn: comment.created_on
                })
            })
        }
    }, [edit])


    const handleUserInput = (event) => {
        const newCommentState = {...currentComment}
        newCommentState[event.target.name] = event.target.value
        setCurrentComment(newCommentState)
    }

    const handleEditComment = (event) => {
        event.preventDefault()

        const comment = {
            id: commentObj.id,
            postId: postId,
            appUser: currentUser,
            content: currentComment.content,
            createdOn: currentComment.createdOn
        }
        // send PUT request to API
        editComment(comment)
            .then(() => {
                setEdit(false)
            })
    }

    const handleDeleteComment = (commentId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to undo!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Ah, cancel"
          }).then((result) => {
            if (result.isConfirmed) {
              deleteComment(commentId).then(() => {
                Swal.fire(
                  "Deleted!",
                  "Your comment has been deleted.",
                  "Success!"
                ).then(() => {
                    getPosts()
                })
              })
            }; 
        })
    }

    

    return (
        <>
            {
                (commentObj.post_id === post)
                ? <Card>
                    <Card.Body>
                        <Card.Subtitle>{commentObj.app_user?.full_name}</Card.Subtitle>
                        <Card.Subtitle>{humanMonthDate} at {humanTime}</Card.Subtitle>
                        {/* ternary to show comment OR if EDIT is TRUE, show comment input form to edit comment */}
                        {
                            (edit)
                            ? <>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Form>
                                                <Form.Group>
                                                    <Form.Control as="textarea" rows={4}
                                                    name="content" value={currentComment.content}
                                                    onChange={handleUserInput} required/>
                                                    <Button onClick={handleEditComment}>Save</Button>
                                                    <Button onClick={() => 
                                                        setEdit(!edit)}>Cancel</Button>
                                                </Form.Group>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Container>
                                {console.log(commentObj.id)}
                              </>
                            : <>
                                <Card.Text>{commentObj.content}</Card.Text>
                              </>
                        }
                        {/* show edit and delete buttons if user is OWNER and edit is FALSE */}
                        {
                            (commentObj.owner && edit === false)
                            ? <>
                                <Button onClick={() => {
                                    handleDeleteComment(commentObj.id)
                                }}><BsIcons.BsTrashFill/></Button>
                                <Button onClick={() => 
                                    setEdit(!edit)
                                }><AiIcons.AiFillEdit/></Button>
                              </>
                            : null
                        } 
                    </Card.Body>
                 </Card>
                : null
            }
        </>
    )
}