import React, { useEffect, useContext, useState } from "react"
import { ResourceContext } from "./ResourceProvider"
import { useHistory } from "react-router"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"
import "./Resource.css"


export const Resource = ({ resourceObj }) => {
    // returns indivdual achievements to achievement list

    // making date readable to humans
    const date = new Date(resourceObj.created_on)
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'}
    const humanDate = date.toLocaleDateString('en-US', options)

    return (
        <>
        <Card>
            <Card.Body>
                <Card.Title className="res-card-title"><div>{resourceObj.title}</div></Card.Title>
                <Card.Subtitle className="text-muted card-sub"><div>{humanDate}</div></Card.Subtitle>
                <Card.Text><div>{resourceObj.content}</div></Card.Text>
                <Card.Link className="res-link" href={resourceObj.source_link} target="_blank">View Article</Card.Link>
            </Card.Body>
        </Card>
        </>
    )
}