import React, { useEffect, useContext, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"
import { DateTime } from "luxon"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"


export const Comment = ({ commentObj, post }) => {
    // returns individual comment to comment list
    const { editComment, getCommentById } = useContext(CommentContext)
    const currentUser = localStorage.getItem("stressLess_user_id")
    const now = DateTime.now()
    const postId = post

    // making date readable to humans
    // const monthDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    const date = new Date(commentObj.created_on)
    const monthDate = { weekday: 'long', month: 'short', day: 'numeric'}
    const time = { hour: 'numeric', minute: 'numeric' }
    const humanMonthDate = date.toLocaleDateString('en-US', monthDate)
    const humanTime = date.toLocaleString('en-US', time)

    const [ edit, setEdit ] = useState(false)

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
                                                    <Form.Label>Write a comment..</Form.Label>
                                                    <Form.Control as="textarea" rows={1}
                                                    name="content" value={currentComment.content}
                                                    onChange={handleUserInput} required/>
                                                    <Button>Submit</Button>
                                                    <Button onClick={() => setEdit(!edit)}>Cancel</Button>
                                                </Form.Group>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Container>
                              </>
                            : <>
                                <Card.Text>{commentObj.content}</Card.Text>
                              </>
                        }
                        {/* show edit and delete buttons if user is OWNER and edit is FALSE */}
                        {
                            (commentObj.owner && edit === false)
                            ? <>
                                <Button><BsIcons.BsTrashFill/></Button>
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

//TODO: edit through modal? if not figure out how to seed data into comment form
//TODO: add sweetalert modal to delete function for comments and POSTS