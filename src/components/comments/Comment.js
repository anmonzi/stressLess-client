import React, { useEffect, useContext, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { DateTime } from "luxon"
import * as BsIcons from "react-icons/bs"
import * as AiIcons from "react-icons/ai"


export const Comment = () => {
    // returns individual comment to comment list

    return (
        <>
            <div>HEY! I'm a comment rendering!</div>
        </>
    )
}