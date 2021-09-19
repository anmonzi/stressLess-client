import React, { useEffect, useContext, useState } from "react"
import { ReflectionContext } from "./ReflectionProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { DateTime } from "luxon"
import * as BsIcons from "react-icons/bs"


export const Reflection = ({ reflectionObj }) => {
    // returns individual reflections to reflection list
    const { deleteReflection } = useContext(ReflectionContext)

    // making date readable to humans
    // const monthDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    const date = new Date(reflectionObj.created_on)
    const monthDate = { weekday: 'long' }
    const time = { hour: 'numeric', minute: 'numeric' }
    const humanMonthDate = date.toLocaleDateString('en-US', monthDate)
    const humanTime = date.toLocaleString('en-US', time)
    
    
    return (
        <>
            {
                (reflectionObj.owner)
                ? <>
                    <Card>
                        <Card.Body>
                            <Card.Subtitle className="text-muted card-sub"><div>{humanMonthDate} at {humanTime}</div></Card.Subtitle>
                            <Card.Text><div>{reflectionObj.content}</div></Card.Text>
                            <Card.Body className="post-btn-group">
                                <Card.Link className="edit-icon" onClick={() => {
                                    deleteReflection(reflectionObj.id)
                                }}><BsIcons.BsTrashFill/></Card.Link>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                  </>
                : <></>
            }
        </>
    )
}

