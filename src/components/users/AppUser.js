import React, { useEffect, useContext, useState } from "react"
import { AppUserContext } from "./AppUserProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { DateTime } from "luxon"
import * as BsIcons from "react-icons/bs"


export const AppUser = ({ userObj }) => {
    // returns individual reflections to reflection list
    const { changeUserStatus } = useContext(AppUserContext)
    // making date readable to humans
    // const monthDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    const date = new Date(userObj.user?.date_joined)
    const monthDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const time = { hour: 'numeric', minute: 'numeric' }
    const humanMonthDate = date.toLocaleDateString('en-US', monthDate)
    const humanTime = date.toLocaleString('en-US', time)
    
    
    return (
        <>
            {
                (userObj.user?.is_active)
                ?   <Card>
                        <Card.Body>
                            <Card.Text><div>{userObj.full_name}</div></Card.Text>
                            <Card.Subtitle className="text-muted card-sub">
                                <div>Date Joined: {humanMonthDate} at {humanTime}</div>
                            </Card.Subtitle>
                            <Card.Text><div>Username: {userObj.user?.username}</div></Card.Text>
                            <Card.Text>
                                <div>Is Staff?</div>
                                {
                                    (userObj.user?.is_staff)
                                    ? <>True</>
                                    : <>False</>
                                }
                            </Card.Text>
                            {
                                (userObj.user?.is_active)
                                ? <><Button type="submit" onClick={() => 
                                    changeUserStatus(userObj.user?.id)}
                                    className="button">Active</Button></>
                                : <><Button variant="secondary">Inactive</Button></>
                            }
                            
                        </Card.Body>
                    </Card>
                : <Card bg="light" border="dark">
                    <Card.Body>
                        <Card.Text><div>{userObj.full_name}</div></Card.Text>
                        <Card.Subtitle className="text-muted card-sub">
                            <div>Date Joined: {humanMonthDate} at {humanTime}</div>
                        </Card.Subtitle>
                        <Card.Text><div>Username: {userObj.user?.username}</div></Card.Text>
                        <Card.Text>
                            <div>Is Staff?</div>
                            {
                                (userObj.user?.is_staff)
                                ? <>True</>
                                : <>False</>
                            }
                        </Card.Text>
                        {
                            (userObj.user?.is_active)
                            ? <><Button type="submit" onClick={() => 
                                changeUserStatus(userObj.user?.id)}
                                className="button">Active</Button></>
                            : <><Button variant="secondary">Inactive</Button></>
                        }
                        
                    </Card.Body>
                </Card>
            }
        </>
    )
}

// <Card.Body className="post-btn-group">
//                         <Card.Link className="edit-icon" onClick={() => {
//                             deleteReflection(reflectionObj.id)
//                         }}><BsIcons.BsTrashFill/></Card.Link>
//                     </Card.Body>