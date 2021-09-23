import React, { useEffect, useContext, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { PostContext } from "../posts/PostProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { DateTime } from "luxon"
import "./Comment.css"


export const CommentForm = ({ inputCollapse, buttonHide, post, commentShow }) => {
    const { createComment } = useContext(CommentContext)
    const { getPosts } = useContext(PostContext)
    const history = useHistory()
    const currentUser = localStorage.getItem("stressLess_user_id")
    const now = DateTime.now()
    const postId = post.id

    const [ currentComment, setCurrentComment ] = useState({
        postId: postId,
        appUser: currentUser,
        content: "",
        createdOn: ""
    })

    const handleUserInput = (event) => {
        const newCommentState = {...currentComment}
        newCommentState[event.target.name] = event.target.value
        setCurrentComment(newCommentState)
    }

    const handleSaveComment = (event) => {
        event.preventDefault()

        const newComment = {
            postId: postId,
            appUser: currentUser,
            content: currentComment.content,
            createdOn: now.toISO()
        }

        if (currentComment.content === "") {
            return
        } else {
            // send POST request to API
            createComment(newComment)
                .then(() => {
                    setCurrentComment({
                        postId: postId,
                        appUser: currentUser,
                        content: "",
                        createdOn: ""
                    })
                }).then(() => {
                    buttonHide(true)
                    inputCollapse(!inputCollapse)
                }).then(() => {
                    getPosts()
                    commentShow(true)
                })
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label>Write a comment..</Form.Label>
                                <Form.Control as="textarea" rows={1}
                                name="content" value={currentComment.content}
                                onChange={handleUserInput} required/>
                                <Form.Group className="post-btn-group">
                                    <Button className="post-form-btn com-button" onClick={handleSaveComment}>Submit</Button>
                                    <Button className="post-form-btn can-button" onClick={() => {
                                        buttonHide(true)
                                        inputCollapse(!inputCollapse)
                                    }}>Cancel</Button>
                                </Form.Group>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )    
}