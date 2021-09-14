import React, { useContext, useState } from "react"
import { PriorityContext } from "./PriorityProvider"
import { useHistory, useParams } from 'react-router'
import { Form, Container, Row, Col, Button } from "react-bootstrap"
import { DateTime } from "luxon"



export const PriorityForm = () => {
    const { createPriority } = useContext(PriorityContext)
    const history = useHistory()
    const currentUser = localStorage.getItem("stressLess_user_id")
    const now = DateTime.now()
    // const { priorityId } = useParams()

    const [ currentPriority, setCurrentPriority ] = useState({
        appUser: currentUser,
        content: "",
        createdOn: "",
        completed: false
    })

    const handleUserInput = (event) => {
        const newPriorityState = {...currentPriority}
        newPriorityState[event.target.name] = event.target.value
        setCurrentPriority(newPriorityState)
    }

    const handleSavePriority = (event) => {
        event.preventDefault()

        const newPriority = {
            app_user: currentUser,
            content: currentPriority.content,
            createdOn: now.toISODate(),
            completed: false
        }
        createPriority(newPriority)
            .then(() => history.push("/dashboard"))
    }

    return (
      <>
        <Container>
          <Row>
            <Col md={8}>
              <Form>
                <Form.Group>
                  <Form.Label>Create your new priority below</Form.Label>
                  <Form.Control as="textarea" rows={3}
                  name="content" value={currentPriority.content}
                  onChange={handleUserInput} required autoFocus />
                </Form.Group>
                <Button type="submit" onClick={handleSavePriority}>Submit</Button>
                <Button onClick={() => history.goBack()}>Back</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
}