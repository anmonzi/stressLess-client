import React, { useEffect, useContext, useState } from "react"
import  { CommentContext } from "./CommentProvider"
import { Comment } from "./Comment"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button } from "react-bootstrap"


export const CommentList = () => {
    const { comments, getComments } = useContext(CommentContext)
    const history = useHistory()

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        Comments will list here
                    </Col>
                </Row>
            </Container>
        </>
    )
}