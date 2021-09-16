import React, { useContext, useState, useEffect } from "react"
import { PostContext } from "./PostProvider"
import { useHistory, useParams } from 'react-router'
import { Form, Container, Row, Col, Button } from "react-bootstrap"
import { DateTime } from "luxon"



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
          <Row>
            <Col md={8}>
              <Form>
                <Form.Group>
                    {
                        (postId)
                        ? <Form.Label>Edit Your Post</Form.Label>
                        : <Form.Label>Create Post</Form.Label>
                    }
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Your Post Title"
                            name="title" value={currentPost.title} onChange={handleUserInput}
                            required autoFocus
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" rows={3}
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
                {
                    (postId)
                    ? <Button type="submit" onClick={handleEditPost}>Save</Button>
                    : <Button type="submit" onClick={handleSavePost}>Submit</Button>
                }
                <Button onClick={() => history.goBack()}>Back</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
}