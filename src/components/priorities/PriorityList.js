import React, { useEffect, useContext, useState } from "react"
import { PriorityContext } from "./PriorityProvider"
import { useHistory } from 'react-router'
import { Priority } from "./Priority"
import { Container, Row, Col, Button } from "react-bootstrap"


export const PriorityList = () => {
    const { priorities, getPriorities } = useContext(PriorityContext)
    const history = useHistory()

    useEffect(() => {
        getPriorities()
    }, [])


    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Button 
                            variant="outline-secondary"
                            onClick={() => {history.push("/priority/new")}}>
                                Make New Priority
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col> 
                        Your Current Priorities:
                        {
                            priorities.map(priority => {
                                return <Priority priorityObject={priority} key={priority.id} />
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}