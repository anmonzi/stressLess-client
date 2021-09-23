import React, { useEffect, useContext, useState } from "react"
import { ReflectionContext } from "./ReflectionProvider"
import { Reflection } from "./Reflection"
import { ReflectionInput } from "./ReflectionInput"
import { useHistory } from 'react-router'
import * as BsIcons from "react-icons/bs"
import { Container, Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap"


export const ReflectionList = () => {
    const { reflections, getReflections } = useContext(ReflectionContext)

    useEffect(() => {
        getReflections()
    }, [])

    const sortedReflections = reflections.sort((a, b) => {
        return b.created_on.localeCompare(a.created_on)
    })

    return (
        <>
            <Container>
                <Row>
                    <Col>
                    <h4>
                        <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Make quick notes about how you're feeling,
                            small successes, or how you felt when saying "No"
                        </Tooltip>}>
                        <span><BsIcons.BsFillInfoCircleFill /></span> 
                        </OverlayTrigger> Quick Reflections Of Your Day:</h4>
                        {/* user reflection input component */}
                        <ReflectionInput/>
                        {/* list of user reflection below */}
                        {
                            sortedReflections.map(reflection => {
                                return <Reflection reflectionObj={reflection} key={reflection.id} />
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}