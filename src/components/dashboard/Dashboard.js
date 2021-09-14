import React, { useEffect, useContext, useState } from "react"
import { DashboardContext } from "./DashboardProvider"
import { PriorityList } from "../priorities/PriorityList"
import { Container, Row, Col } from "react-bootstrap"
import "./Dashboard.css"


export const Dashboard = () => {
    const { dashboard, getDashboard } = useContext(DashboardContext)

    useEffect(() => {
        getDashboard()
    }, [])

    return (
        <>
            <Container className="dashboard-container">
                <Row>
                    <Col>Welcome to StressLess, {dashboard.app_user?.full_name}</Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}> <PriorityList/> </Col>
                    <Col sm={12} md={6}>Quick Reflections - reflections component</Col>
                </Row>
            </Container>
        </>
    )
}