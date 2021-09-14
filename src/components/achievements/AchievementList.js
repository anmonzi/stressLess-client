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
                        Hey! You're doing a great job. Check out your achievements!
                    </Col>
                </Row>
                <Row>
                    <Col> 
                        {
                            achievements.map(achievement => {
                                return <Achievement achievement={achievement} key={achievement.id} />
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}