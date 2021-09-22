import React, { useEffect, useContext, useState } from "react"
import { MotivationContext } from "./MotivationProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"
import ReactCardFlip from 'react-card-flip'
import { DateTime } from "luxon"
import * as BsIcons from "react-icons/bs"


export const MotivationCard = ({ motivationObj }) => {
    // returns individual reflections to reflection list
    const { deleteMotivation, editMotivation, getMotivationById } = useContext(MotivationContext)
    const currentUser = localStorage.getItem("stressLess_user_id")
    const now = DateTime.now()
    const [isFlipped, setIsFlipped] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [ currentMotivation, setCurrentMotivation ] = useState({
        appUser: currentUser,
        title: "",
        content: "",
        createdOn: ""
    })


    useEffect(() => {
        if (editMode === true) {
            getMotivationById(motivationObj.id).then(m => {
                setCurrentMotivation({
                    appUser: currentUser,
                    title: m.title,
                    content: m.content,
                    createdOn: m.created_on
                })
            })
        }
    }, [editMode])

    // making date readable to humans
    // const monthDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    const date = new Date(motivationObj.created_on)
    const monthDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const time = { hour: 'numeric', minute: 'numeric' }
    const humanMonthDate = date.toLocaleDateString('en-US', monthDate)
    const humanTime = date.toLocaleString('en-US', time)
    
    // function to handle flipping card
    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    const handleUserInput = (event) => {
        const newMotivationState = {...currentMotivation}
        newMotivationState[event.target.name] = event.target.value
        setCurrentMotivation(newMotivationState)
    }

    const handleEditMotivation = (event) => {
        event.preventDefault()
        
        const motivation = {
            id: motivationObj.id,
            appUser: currentUser,
            title: currentMotivation.title,
            content: currentMotivation.content,
            createdOn: now.toISODate()
        }
        // send PUT request to API
        editMotivation(motivation)
            .then((event) => {
                setEditMode(false)
                handleFlip(event)
            })
    }
    
    return (
        <>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Card>
                <Card.Body>
                    <Card.Subtitle className="text-muted card-sub">
                        <div>Created {humanMonthDate}</div>
                    </Card.Subtitle>
                    <Card.Text><div>Question: {motivationObj.title}</div></Card.Text>
                    <Card.Text><div>Notes: {motivationObj.content}</div></Card.Text>
                    <Card.Body className="post-btn-group">
                        <Card.Link className="edit-icon" onClick={() => {
                            deleteMotivation(motivationObj.id)
                        }}><BsIcons.BsTrashFill/></Card.Link>
                        <Button className="button" onClick={() => {
                            setEditMode(true)
                            handleFlip()
                        }}>Edit</Button>
                    </Card.Body>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="input"
                            name="title" value={currentMotivation.title}
                            onChange={handleUserInput} placeholder="Enter question or motivation" required/>
                            <Form.Control as="textarea" row={3}
                            name="content" value={currentMotivation.content}
                            onChange={handleUserInput} placeholder="Any additional notes?" required/>
                            <Form.Group className="post-form-btn-group">
                                <Button type="submit" className="post-form-btn button"
                                onClick={handleEditMotivation}>Submit</Button>
                                <Button type="button" className="post-form-btn button"
                                onClick={() => {
                                    setEditMode(false)
                                    handleFlip()
                                }}>Cancel</Button>
                            </Form.Group>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </ReactCardFlip>
        </>
    )
}

