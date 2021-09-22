import React, { useEffect, useContext, useState } from "react"
import { AppUserContext } from "./AppUserProvider"
import { AppUser } from "./AppUser"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button } from "react-bootstrap"


export const AppUserList = () => {
    const { appUsers, getAppUsers } = useContext(AppUserContext)

    useEffect(() => {
        getAppUsers()
    }, [])

    // const sortedReflections = reflections.sort((a, b) => {
    //     return b.created_on.localeCompare(a.created_on)
    // })

    return (
        <>
            <Container>
                <Row>
                    <Col>
                    <h4>Current StressLess Users</h4>
                        {
                            appUsers.map(user => {
                                return <AppUser userObj={user} key={user.id} />
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}