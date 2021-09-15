import React, { useEffect, useContext, useState } from "react"
import { ReflectionContext } from "./ReflectionProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { DateTime } from "luxon"
import * as BsIcons from "react-icons/bs"


export const Reflection = ({ reflectionObj }) => {
    // returns individual reflections to reflection list
    const { deleteReflection } = useContext(ReflectionContext)
    
    
    return (
        <>
            {
                (reflectionObj.owner)
                ? <>
                    <Card>
                        <Card.Body>
                            <Card.Subtitle><div>{reflectionObj.created_on}</div></Card.Subtitle>
                            <Card.Text><div>{reflectionObj.content}</div></Card.Text>
                            <Card.Link onClick={() => {
                                deleteReflection(reflectionObj.id)
                            }}><BsIcons.BsTrashFill/></Card.Link>
                        </Card.Body>
                    </Card>
                  </>
                : <></>
            }
        </>
    )
}

