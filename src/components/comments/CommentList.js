import React, { useEffect, useContext, useState } from "react"
import  { CommentContext } from "./CommentProvider"
import { Comment } from "./Comment"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button } from "react-bootstrap"


export const CommentList = ({ postId }) => {
    const { comments, getComments } = useContext(CommentContext)
    const history = useHistory()

    useEffect(() => {
        getComments()
    }, [])

    const sortedComments = comments.sort((a, b) => {
        return a.created_on.localeCompare(b.created_on)
    })

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        {
                            sortedComments.map(comment => {
                                return <Comment commentObj={comment} post={postId} key={comment.id} />
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}