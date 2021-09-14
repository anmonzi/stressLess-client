import React, { useEffect, useContext, useState } from "react"
import { PriorityContext } from "./PriorityProvider"
import { Priority } from "./Priority"
import { Container, Row, Col } from "react-bootstrap"


export const PriorityList = () => {
    const { priorities, getPriorities } = useContext(PriorityContext)

    useEffect(() => {
        getPriorities()
    }, [])


    return (
        <>
            <Container>
                <Row>
                    <Col>Priority Form will go here</Col>
                </Row>
                <Row>
                    <Col> List of CURRENT USER priorities below
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