import React, { useEffect, useContext, useState } from "react"
import { ReactionContext } from "./ReactionProvider"
import { useHistory } from 'react-router'
import * as BsIcons from "react-icons/bs"
import { Container, Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap"



export const ReactionList = () => {
    const { reactions, getReactions } = useContext(ReactionContext)

    useEffect(() => {
        getReactions()
    }, [])


    return (
        <>
            {
                reactions.map(reaction => {
                    return (
                        <div>{reaction.id}</div>
                    )
                })
            }
        </>
    )
}

