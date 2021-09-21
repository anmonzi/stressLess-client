import React, { useEffect, useContext, useState } from "react"
import { MotivationContext } from "./MotivationProvider"
import { useHistory } from "react-router"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"


export const Motivation = () => {
    // returns indivdual achievements to achievement list
    const { motivation, getMotivation } = useContext(MotivationContext)
    const history = useHistory()

    useEffect(() => {
        getMotivation()
    }, [])
    
    
    // making date readable to humans
    // const date = new Date(motivations.created_on)
    // const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'}
    // const humanDate = date.toLocaleDateString('en-US', options)

    return (
        <>
            {motivation.title}
        </>
    )
}