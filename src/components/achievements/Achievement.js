import React, { useEffect, useContext, useState } from "react"
import { AchievementContext } from "./AchievementsProvider"
import { useHistory } from "react-router"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"


export const Achievement = ({ achievement }) => {
    // returns indivdual achievements to achievement list
    const { deleteAchievement } = useContext(AchievementContext)
    const history = useHistory()

    // making date readable to humans
    const date = new Date(achievement.created_on)
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'}
    const humanDate = date.toLocaleDateString('en-US', options)

    return (
        <>
        {
            (achievement.owner && achievement.completed === true)
            ? <>
                <Card>
                    <Card.Body>
                        <Card.Subtitle className="text-muted card-sub"><div>{humanDate}</div></Card.Subtitle>
                        <Card.Text><div>{achievement.content}</div></Card.Text>
                        <Card.Body className="post-btn-group">
                            <Button className="button" onClick={() => {
                                deleteAchievement(achievement.id)
                            }}>Delete</Button>
                        </Card.Body>
                    </Card.Body>
                </Card>
              </>
            : <></>
        }
        </>
    )
}