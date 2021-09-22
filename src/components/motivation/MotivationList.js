import React, { useEffect, useContext, useState } from "react"
import { MotivationContext } from "./MotivationProvider"
import { MotivationCard } from "./MotivationCard"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button } from "react-bootstrap"

export const MotivationList = () => {
    const { allMotivations, getAllMotivations } = useContext(MotivationContext)
    const history = useHistory()

    useEffect(() => {
        getAllMotivations()
    }, [])

    const sortedMotivations = allMotivations.sort((a, b) => {
        return b.id - a.id
    })


    return (
        <>
            <Container className="post-container">
                <Row>
                    <Col> 
                        {
                            sortedMotivations.map(motivation => {
                                return <MotivationCard motivationObj={motivation} key={motivation.id} />
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}