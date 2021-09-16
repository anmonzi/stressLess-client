import React, { useEffect, useContext, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { DateTime } from "luxon"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"


export const Comment = ({ commentObj, post }) => {
    // returns individual comment to comment list

    return (
        <>
            {
                (commentObj.post_id === post)
                ? <Card>
                    <Card.Body>
                        <Card.Subtitle>{commentObj.app_user?.full_name}</Card.Subtitle>
                        <Card.Subtitle>{commentObj.created_on}</Card.Subtitle>
                        <Card.Text>{commentObj.content}</Card.Text>
                    </Card.Body>
                 </Card>
                : null
            }
        </>
    )
}