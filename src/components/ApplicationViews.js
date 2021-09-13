import React from "react"
import { Route } from "react-router-dom"
import { Dashboard } from "./dashboard/Dashboard"


export const ApplicationViews = () => {
    return <>
        {/* Render user dashboard upon login */}
        <Route exact path="/dashboard">
            <Dashboard />
        </Route>
    </>
}