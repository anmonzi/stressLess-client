import React, { useEffect, useContext, useState } from "react"
import { useHistory } from "react-router"
import { PostList } from "../posts/PostList"
import { Container, Row, Col, Button } from "react-bootstrap"
import Swal from "sweetalert2"



export const CommunityFeed = () => {
    
    const history = useHistory()

    return (
        <>
            <Container>
                <Row>
                    <Col>Welcome to the StressLess Community Feed!</Col>
                </Row>
                <Row>
                    <Col>
                        <Button 
                            variant="secondary"
                            onClick={() => {history.push("/post/new")}}>
                                What's on your mind?
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={8}><PostList/></Col>
                </Row>
            </Container>
        </>
    )
}