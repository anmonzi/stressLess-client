import React, { useEffect, useContext, useState } from "react"
import { ReflectionContext } from "./ReflectionProvider"
import { Reflection } from "./Reflection"
import { ReflectionInput } from "./ReflectionInput"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button } from "react-bootstrap"


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
                    <h4>Quick Reflections Of Your Day:</h4>
                        <ReflectionInput/>
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