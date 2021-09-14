import React, { useEffect, useContext, useState } from "react"
import { DashboardContext } from "./DashboardProvider"
import { Container, Row, Col } from "react-bootstrap"


export const Dashboard = () => {
    const { dashboard, getDashboard } = useContext(DashboardContext)

    useEffect(() => {
        getDashboard()
    }, [])

    return (
        <>
            <Container>
                <Row>
                    <Col>Welcome to StressLess, {dashboard.app_user?.full_name}</Col>
                </Row>
                <Row>
                    <Col>Priorities - priority component</Col>
                    <Col>Quick Reflections - reflections component</Col>
                </Row>
            </Container>
        </>
    )
}