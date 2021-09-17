import React, { useEffect, useContext, useState } from "react"
import { PriorityContext } from "./PriorityProvider"
import { useHistory } from "react-router"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"


export const Priority = ({ priorityObject }) => {
    // returns indivdual priorities to priority list
    const { editPriority } = useContext(PriorityContext)
    const currentUser = localStorage.getItem("stressLess_user_id")
    const history = useHistory()

    // making date readable to humans
    // const monthDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    const date = new Date(priorityObject.created_on)
    const monthDate = { weekday: 'long', month: 'short', day: 'numeric'}
    const time = { hour: 'numeric', minute: 'numeric' }
    const humanMonthDate = date.toLocaleDateString('en-US', monthDate)
    const humanTime = date.toLocaleString('en-US', time)

    const handleSuccessButton = (priorityId) => {
        const priority = {
            id: parseInt(priorityId),
            app_user: currentUser,
            content: priorityObject.content,
            createdOn: priorityObject.created_on,
            completed: true
        }
        // send PUT request to API to change completed value
        editPriority(priority)
            .then()
    }


    return (
        <>
        {
            (priorityObject.owner && priorityObject.completed === false)
            ? <>
                <Card>
                    <Card.Body>
                        <Card.Subtitle><div>{humanMonthDate} at {humanTime}</div></Card.Subtitle>
                        <Card.Text><div>{priorityObject.content}</div></Card.Text>
                        <Card.Link onClick={() => {history.push(`/priority/${priorityObject.id}/edit`)}}>
                            <AiIcons.AiFillEdit /></Card.Link>
                        <Button onClick={() => {
                            handleSuccessButton(priorityObject.id)
                        }}>Success</Button>
                    </Card.Body>
                </Card>
              </>
            : <></>
        }
        </>
    )
}