import React, { useEffect, useContext, useState } from "react"
import { ReflectionContext } from "./ReflectionProvider"
import { Reflection } from "./Reflection"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button } from "react-bootstrap"


export const ReflectionList = () => {
    const { reflections, getReflections } = useContext(ReflectionContext)

    useEffect(() => {
        getReflections()
    }, [])


    return (
        <>
            <Container>
                <Row>
                    <Col>
                        New Reflection Input HERE
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Current Reflections here:
                        {
                            reflections.map(reflection => {
                                return <Reflection reflectionObj={reflection} key={reflection.id} />
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}