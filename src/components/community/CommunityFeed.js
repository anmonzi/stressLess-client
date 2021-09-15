import React, { useEffect, useContext, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"



export const CommunityFeed = () => {
    
    return (
        <>
            <Container>
                <Row>
                    <Col>Welcome to the StressLess Community Feed!</Col>
                </Row>
                <Row>
                    <Col>Create NEW Post button here</Col>
                </Row>
                <Row>
                    <Col sm={12} md={8}> Posts Go here </Col>
                </Row>
            </Container>
        </>
    )
}