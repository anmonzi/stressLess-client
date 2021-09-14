import React, { useEffect, useContext, useState } from "react"
import { PriorityContext } from "./PriorityProvider"
import { Container, Row, Col, Card } from "react-bootstrap"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"


export const Priority = ({ priorityObject }) => {
    // returns indivdual priorities to priority list
    return (
        <>
        {priorityObject.owner
        ? <>
            <Card>
                <Card.Body>
                    <Card.Subtitle><div>{priorityObject.created_on}</div></Card.Subtitle>
                    <Card.Text><div>{priorityObject.content}</div></Card.Text>
                    <Card.Link><BsIcons.BsTrashFill /></Card.Link>
                    <Card.Link><AiIcons.AiFillEdit /></Card.Link>
                </Card.Body>
            </Card>
          </>
        : <></>}
        </>
    )
}