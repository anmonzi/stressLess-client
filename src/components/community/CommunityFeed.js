import React, { useEffect, useContext, useState } from "react"
import { useHistory } from "react-router"
import { PostList } from "../posts/PostList"
import { Container, Row, Col, Button } from "react-bootstrap"
import "./CommunityFeed.css"



export const CommunityFeed = () => {
    
    const history = useHistory()

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h2>Welcome to the StressLess Community Feed!</h2>
                    </Col>
                </Row>
                <Row>
                    <Col className="post-button-col">
                        <Button 
                            variant="secondary"
                            onClick={() => {history.push("/post/new")}}>
                                What's on your mind?
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PostList/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}