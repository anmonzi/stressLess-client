import React, { useEffect, useContext, useState } from "react"
import { PostContext } from "./PostProvider"
import { Post } from "./Post"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button } from "react-bootstrap"
import "./Post.css"

export const PostList = () => {
    const { posts, getPosts } = useContext(PostContext)
    const history = useHistory()

    useEffect(() => {
        getPosts()
    }, [])

    const sortedPosts = posts.sort((a, b) => {
        return b.publication_date.localeCompare(a.publication_date)
    })


    return (
        <>
            <Container >
                <Row className="post-container">
                    <Col md={8}> 
                        {
                            sortedPosts.map(post => {
                                return <Post postObject={post} key={post.id} />
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}