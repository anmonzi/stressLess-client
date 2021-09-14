import React, { useEffect, useContext, useState } from "react"
import { PriorityContext } from "./PriorityProvider"
import { useHistory } from "react-router"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"


export const Priority = ({ priorityObject }) => {
    // returns indivdual priorities to priority list
    const history = useHistory()

    return (
        <>
        {priorityObject.owner
        ? <>
            <Card>
                <Card.Body>
                    <Card.Subtitle><div>{priorityObject.created_on}</div></Card.Subtitle>
                    <Card.Text><div>{priorityObject.content}</div></Card.Text>
                    <Card.Link onClick={() => {history.push(`/priority/${priorityObject.id}/edit`)}}>
                        <AiIcons.AiFillEdit /></Card.Link>
                    <Button>Success</Button>
                </Card.Body>
            </Card>
          </>
        : <></>}
        </>
    )
}