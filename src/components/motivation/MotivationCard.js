import React, { useEffect, useContext, useState } from "react"
import { MotivationContext } from "./MotivationProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { DateTime } from "luxon"
import * as BsIcons from "react-icons/bs"


export const MotivationCard = ({ motivationObj }) => {
    // returns individual reflections to reflection list
    

    // making date readable to humans
    // const monthDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    const date = new Date(motivationObj.created_on)
    const monthDate = { weekday: 'long' }
    const time = { hour: 'numeric', minute: 'numeric' }
    const humanMonthDate = date.toLocaleDateString('en-US', monthDate)
    const humanTime = date.toLocaleString('en-US', time)
    
    
    return (
        <>
        <Card>
            <Card.Body>
                <Card.Subtitle className="text-muted card-sub">
                    <div>Created {humanMonthDate} at {humanTime}</div>
                </Card.Subtitle>
                <Card.Text><div>{motivationObj.title}</div></Card.Text>
                <Card.Text><div>{motivationObj.content}</div></Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}

