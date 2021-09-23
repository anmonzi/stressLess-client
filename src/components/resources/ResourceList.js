import React, { useEffect, useContext, useState } from "react"
import { ResourceContext } from "./ResourceProvider"
import { Resource } from "./Resource"
import { useHistory } from 'react-router'
import * as BsIcons from "react-icons/bs"
import { Container, Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap"


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
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Helpful resources to look into
                            </Tooltip>}>
                            <span><BsIcons.BsFillInfoCircleFill /></span> 
                            </OverlayTrigger>
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