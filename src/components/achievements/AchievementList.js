import React, { useEffect, useContext, useState } from "react"
import { AchievementContext } from "./AchievementsProvider"
import { useHistory } from 'react-router'
import { Achievement } from "./Achievement"
import { Container, Row, Col, Button } from "react-bootstrap"


export const AchievementList = () => {
    const { achievements, getAchievements } = useContext(AchievementContext)
    const history = useHistory()

    useEffect(() => {
        getAchievements()
    }, [])


    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h2>Your Achievements</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <h4>Hey! You're doing a great job. Check out your achievements!</h4>
                        {
                            achievements.map(achievement => {
                                return <Achievement achievement={achievement} key={achievement.id} />
                            })
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => history.goBack()}>Back</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}