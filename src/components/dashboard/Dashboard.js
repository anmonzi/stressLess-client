import React, { useEffect, useContext, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"


export const Dashboard = () => {

    return (
        <>
            <Container>
                <Row>
                    <Col>Welcome to StressLess, username</Col>
                </Row>
                <Row>
                    <Col>Priorities - priority component</Col>
                    <Col>Quick Reflections - reflections component</Col>
                </Row>
            </Container>
        </>
    )
}