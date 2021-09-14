import React from "react"
import { Route } from "react-router-dom"
import { Dashboard } from "./dashboard/Dashboard"
import { DashboardProvider } from "./dashboard/DashboardProvider"
import { PriorityProvider } from "./priorities/PriorityProvider"
import { PriorityForm } from "./priorities/PriorityForm"
import { AchievementProvider } from "./achievements/AchievementsProvider"
import { AchievementList } from "./achievements/AchievementList"

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

                <Route exact path="/priority/:priorityId(\d+)/edit">
                    <PriorityForm />
                </Route>
            </PriorityProvider>
        </DashboardProvider>

        {/* Render completed Priorities as Achievements for user history */}
        <AchievementProvider>
            <Route exact path="/achievements">
                <AchievementList />
            </Route>
        </AchievementProvider>
    </>
}