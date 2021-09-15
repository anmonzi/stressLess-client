import React, { useEffect, useContext, useState } from "react"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { DateTime } from "luxon"
import * as BsIcons from "react-icons/bs"


export const Post = ({ postObject }) => {
    // returns individual posts to post list
    
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>{postObject.title}</Card.Title>
                    <Card.Subtitle><div>{postObject.publication_date}</div></Card.Subtitle>
                    <Card.Text><div>{postObject.content}</div></Card.Text>
                </Card.Body>
            </Card> 
        </>
    )
}

// TODO: add ternaries for edit and delete button for (postObject.owner) ONLY