import React, {useState} from "react"
import { Link } from "react-router-dom"
import ReactCardFlip from 'react-card-flip'
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"
import { Login } from "./Login"
import logo from "../../images/StressLessIcon.png"
import "./Auth.css"


export const LandingPage = () => {
    const [isFlipped, setIsFlipped] = useState(false)

    // function to handle flipping card
    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Container onClick={handleFlip} className="app-icon icon-container">
                <Row>
                <Col>
                <img src={logo} />
                </Col>
                </Row>
            </Container>
            <Container>
                <Login />
            </Container> 
        </ReactCardFlip>
        </>
    )
}