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
        return b.created_on.localeCompare(a.created_on)
    })

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        Comments will list here:
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