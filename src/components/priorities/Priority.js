import React, { useEffect, useContext, useState } from "react"
import { PriorityContext } from "./PriorityProvider"
import { Container, Row, Col } from "react-bootstrap"


export const Priority = ({ priorityObject }) => {
    // returns indivdual priorities to priority list
    return (
        <>
        {priorityObject.owner
        ? <>
            <div>{priorityObject.created_on}</div>
            <div>{priorityObject.content}</div>
          </>
        : <></>}
        </>
    )
}