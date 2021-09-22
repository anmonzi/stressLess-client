import React, { useEffect, useContext, useState } from "react"
import { DashboardContext } from "../dashboard/DashboardProvider"
import { MotivationList } from "../motivation/MotivationList"
import { Container, Row, Col } from "react-bootstrap"
import "../dashboard/Dashboard.css"


export const AdminDashboard = () => {
    const { dashboard, getDashboard } = useContext(DashboardContext)

    useEffect(() => {
        getDashboard()
    }, [])

    return (
        <>
            <Container>
                <Row className="dashboard-container">
                <h1>Admin Dashboard</h1>
                    <Col xs={10} md={8}
                    className="dashboard-welcome">
                        <h2>Welcome to StressLess, {dashboard.app_user?.full_name}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Create a New Motivation</h3>
                        <div>Motivation Input Here</div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Motivation History</h3>
                        <MotivationList/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}