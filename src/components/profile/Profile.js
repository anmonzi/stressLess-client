import React, { useEffect, useContext, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
import { useHistory } from "react-router"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"



export const Profile = () => {
    // returns user profile
    const {userProfile, getUserProfile} = useContext(ProfileContext)

    useEffect(() => {
        getUserProfile()
    }, [])

    // making date readable to humans
    const date = new Date(userProfile.app_user?.user.date_joined)
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'}
    const humanDate = date.toLocaleDateString('en-US', options)

    return (
        <>
        <Container>
            <Row className="dashboard-container">
            <Row>
                    <Col>
                        <h2>Welcome to the StressLess Community Feed!</h2>
                    </Col>
                </Row>
           
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title><div>{userProfile.app_user?.full_name}</div></Card.Title>
                            <Card.Subtitle className="text-muted card-sub">
                                <div>Account created on: {humanDate}</div>
                            </Card.Subtitle>
                            <Card.Text className="text-muted">Email on file: {userProfile.app_user?.user.email}</Card.Text>
                            <Card.Text>
                                <div className="text-muted">Personal Bio:</div>
                                <div>{userProfile.app_user?.bio}</div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container> 
        </>
    )
}