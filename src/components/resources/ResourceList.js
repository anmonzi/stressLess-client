import React, { useEffect, useContext, useState } from "react"
import { ResourceContext } from "./ResourceProvider"
import { Resource } from "./Resource"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button } from "react-bootstrap"


export const ResourceList = () => {
    const { resources, getResources } = useContext(ResourceContext)
    const history = useHistory()

    useEffect(() => {
        getResources()
    }, [])

    // const sortedReflections = reflections.sort((a, b) => {
    //     return b.created_on.localeCompare(a.created_on)
    // })

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h2>Current StressLess Resources</h2>
                        {
                            resources.map(resource => {
                                return <Resource resourceObj={resource} key={resource.id} />
                            })
                        }
                        <Button className="button" onClick={() => history.goBack()}>Back</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}