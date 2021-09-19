import React, { useContext, useState, useEffect } from "react"
import { PostContext } from "./PostProvider"
import { useHistory, useParams } from 'react-router'
import { Form, Container, Row, Col, Button } from "react-bootstrap"
import { DateTime } from "luxon"
import "./Post.css"



export const PostForm = () => {
    const { createPost, editPost, getPostById } = useContext(PostContext)
    const history = useHistory()
    const currentUser = localStorage.getItem("stressLess_user_id")
    const now = DateTime.now()
    const { postId } = useParams()

    const [ currentPost, setCurrentPost ] = useState({
        appUser: currentUser,
        title: "",
        content: "",
        imageURL: "",
        publicationDate: ""
    })

    useEffect(() => {
        if (postId) {
            getPostById(postId).then(post => {
                setCurrentPost({
                appUser: post.app_user,
                title: post.title,
                content: post.content,
                imageURL: post.image_url,
                publicationDate: post.publication_date
              })
          })
        }
    }, [postId])

    const handleUserInput = (event) => {
        const newPostState = {...currentPost}
        newPostState[event.target.name] = event.target.value
        setCurrentPost(newPostState)
    }

    const handleSavePost = (event) => {
        event.preventDefault()

        const newPost = {
            app_user: currentUser,
            title: currentPost.title,
            content: currentPost.content,
            imageURL: currentPost.imageURL,
            publicationDate: now.toISO()
        }
        // send POST request to API
        createPost(newPost)
            .then(() => history.push("/community"))
    }

    const handleEditPost = (event) => {
        event.preventDefault()

        const post = {
            id: parseInt(postId),
            app_user: currentUser,
            title: currentPost.title,
            content: currentPost.content,
            imageURL: currentPost.imageURL,
            publicationDate: now.toISO()
        }
        // send PUT request to API
        editPost(post)
            .then(() => history.push("/community"))

    }

return (
      <>
        <Container>
          <Row className="post-form-container">
            <Col xs={10} md={8}>
              <Form>
                <Form.Group>
                    {
                        (postId)
                        ? <Form.Label className="post-form-label"><h2>Edit Your Post</h2></Form.Label>
                        : <Form.Label className="post-form-label"><h2>Create Post</h2></Form.Label>
                    }
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Your Post Title"
                            name="title" value={currentPost.title} onChange={handleUserInput}
                            required autoFocus
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className="mb-3" as="textarea" rows={3}
                        name="content" value={currentPost.content}
                        onChange={handleUserInput} placeholder="What's on your mind?" required autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Add Image Here"
                            name="imageURL" value={currentPost.imageURL} onChange={handleUserInput}
                        />
                    </Form.Group>
                </Form.Group>
                <Form.Group className="post-form-btn-group">
                    {
                        (postId)
                        ? <>
                            <Button type="submit" className="post-form-btn" onClick={handleEditPost}>Save</Button>
                            <Button className="post-form-btn" onClick={() => history.goBack()}>Back</Button>
                          </>
                        : <>
                            <Button type="submit" className="post-form-btn" onClick={handleSavePost}>Submit</Button>
                            <Button className="post-form-btn" onClick={() => history.goBack()}>Back</Button>
                        </>
                    }
                    
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
}