import React, { useEffect, useContext, useState } from "react"
import { AchievementContext } from "./AchievementsProvider"
import { useHistory } from "react-router"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"


export const Achievement = ({ achievement }) => {
    // returns indivdual achievements to achievement list
    const history = useHistory()

    return (
        <>
        {
            (achievement.owner && achievement.completed === true)
            ? <>
                <Card>
                    <Card.Body>
                        <Card.Subtitle><div>{achievement.created_on}</div></Card.Subtitle>
                        <Card.Text><div>{achievement.content}</div></Card.Text>
                        <Button>Delete</Button>
                    </Card.Body>
                </Card>
              </>
            : <></>
        }
        </>
    )
}