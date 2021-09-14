import React from "react"
import { Route } from "react-router-dom"
import { Dashboard } from "./dashboard/Dashboard"
import { DashboardProvider } from "./dashboard/DashboardProvider"
import { PriorityProvider } from "./priorities/PriorityProvider"
import { PriorityForm } from "./priorities/PriorityForm"

export const ApplicationViews = () => {
    return <>
        {/* Render user dashboard upon login */}
        <DashboardProvider>
            <PriorityProvider>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>

                <Route exact path="/priority/new">
                    <PriorityForm />
                </Route>
            </PriorityProvider>
        </DashboardProvider>
    </>
}