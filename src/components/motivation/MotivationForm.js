import React, { useEffect, useContext, useState } from "react"
import { MotivationContext } from "./MotivationProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { DateTime } from "luxon"



export const MotivationForm = () => {
    const {createMotivation} = useContext(MotivationContext)
    const currentUser = localStorage.getItem("stressLess_user_id")
    const now = DateTime.now()

    const [ currentMotivation, setCurrentMotivation ] = useState({
        appUser: currentUser,
        title: "",
        content: "",
        createdOn: ""
    })

    const handleUserInput = (event) => {
        const newMotivationState = {...currentMotivation}
        newMotivationState[event.target.name] = event.target.value
        setCurrentMotivation(newMotivationState)
    }

    const handleSaveMotivation = (event) => {
        event.preventDefault()

        const newMotivation = {
            appUser: currentUser,
            title: currentMotivation.title,
            content: currentMotivation.content,
            createdOn: now.toISODate()
        }

        if (currentMotivation.title === "") {
            return
        } else {
            // send POST request to API
            createMotivation(newMotivation)
                .then(() => {
                    setCurrentMotivation({
                        appUser: currentUser,
                        title: "",
                        content: "",
                        createdOn: ""
                    })
                })
        }
    }

    return (
        <>
            <Container >
                <Row className="post-container">
                    <Col className="form-input" md={6}>
                        <Form>
                            <Form.Group>
                                <Form.Control as="input"
                                name="title" value={currentMotivation.title}
                                onChange={handleUserInput} placeholder="Enter question or motivation" required/>
                                <Form.Control as="textarea" row={3}
                                name="content" value={currentMotivation.content}
                                onChange={handleUserInput} placeholder="Any additional notes?" required/>
                                <Form.Group className="post-form-btn-group">
                                    <Button type="submit" className="post-form-btn button"
                                    onClick={handleSaveMotivation}>Submit</Button>
                                </Form.Group>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}