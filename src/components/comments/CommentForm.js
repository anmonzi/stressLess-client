import React, { useEffect, useContext, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { DateTime } from "luxon"



export const CommentForm = ({ inputCollapse, buttonHide }) => {
    const { createComment, editComment, getCommentById } = useContext(CommentContext)

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label>Write a comment</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                name="content"
                                required/>
                                <Button onClick={() => {
                                    inputCollapse(!inputCollapse)
                                    buttonHide(true)
                                }}>Submit</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )    
}