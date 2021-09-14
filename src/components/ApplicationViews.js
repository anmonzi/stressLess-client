import React from "react"
import { Route } from "react-router-dom"
import { Dashboard } from "./dashboard/Dashboard"
import { DashboardProvider } from "./dashboard/DashboardProvider"


export const ApplicationViews = () => {
    return <>
        {/* Render user dashboard upon login */}
        <DashboardProvider>
            <Route exact path="/dashboard">
                <Dashboard />
            </Route>
        </DashboardProvider>
    </>
}