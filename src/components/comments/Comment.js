import React, { useEffect, useContext, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { DateTime } from "luxon"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"


export const Comment = ({ commentObj, post }) => {
    // returns individual comment to comment list

    // making date readable to humans
    // const monthDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    const date = new Date(commentObj.created_on)
    const monthDate = { weekday: 'long', month: 'short', day: 'numeric'}
    const time = { hour: 'numeric', minute: 'numeric' }
    const humanMonthDate = date.toLocaleDateString('en-US', monthDate)
    const humanTime = date.toLocaleString('en-US', time)

    return (
        <>
            {
                (commentObj.post_id === post)
                ? <Card>
                    <Card.Body>
                        <Card.Subtitle>{commentObj.app_user?.full_name}</Card.Subtitle>
                        <Card.Subtitle>{humanMonthDate} at {humanTime}</Card.Subtitle>
                        <Card.Text>{commentObj.content}</Card.Text>
                    </Card.Body>
                 </Card>
                : null
            }
        </>
    )
}