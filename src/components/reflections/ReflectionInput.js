import React, { useEffect, useContext, useState } from "react"
import { ReflectionContext } from "./ReflectionProvider"
import { Reflection } from "./Reflection"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { DateTime } from "luxon"



export const ReflectionInput = () => {
    const { createReflection } = useContext(ReflectionContext)
    const currentUser = localStorage.getItem("stressLess_user_id")
    const now = DateTime.now()

    const [ currentReflection, setCurrentReflection ] = useState({
        appUser: currentUser,
        content: "",
        createdOn: ""
    })

    const handleUserInput = (event) => {
        const newReflectionState = {...currentReflection}
        newReflectionState[event.target.name] = event.target.value
        setCurrentReflection(newReflectionState)
    }

    const handleSaveReflection = (event) => {
        event.preventDefault()

        const newReflection = {
            appUser: currentUser,
            content: currentReflection.content,
            createdOn: now.toISO()
        }

        if (currentReflection.content === "") {
            return
        } else {
            // send POST request to API
            createReflection(newReflection)
                .then(() => {
                    setCurrentReflection({
                        appUser: currentUser,
                        content: "",
                        createdOn: ""
                    })
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
                                <Form.Label>What's up?</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                name="content" value={currentReflection.content}
                                onChange={handleUserInput} required/>
                                <Button type="submit" onClick={handleSaveReflection}>Submit</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}