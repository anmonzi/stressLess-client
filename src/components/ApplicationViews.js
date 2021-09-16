import React from "react"
import { Route } from "react-router-dom"
import { Dashboard } from "./dashboard/Dashboard"
import { DashboardProvider } from "./dashboard/DashboardProvider"
import { PriorityProvider } from "./priorities/PriorityProvider"
import { PriorityForm } from "./priorities/PriorityForm"
import { AchievementProvider } from "./achievements/AchievementsProvider"
import { AchievementList } from "./achievements/AchievementList"
import { ReflectionProvider } from "./reflections/ReflectionProvider"
import { CommunityFeed } from "./community/CommunityFeed"
import { PostProvider } from "./posts/PostProvider"
import { PostForm } from "./posts/PostForm"


export const ApplicationViews = () => {
    return <>
        {/* Render user dashboard upon login */}
        <DashboardProvider>
            <PriorityProvider>
                <ReflectionProvider>
                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>

                    <Route exact path="/priority/new">
                        <PriorityForm />
                    </Route>

                    <Route exact path="/priority/:priorityId(\d+)/edit">
                        <PriorityForm />
                    </Route>
                </ReflectionProvider>
            </PriorityProvider>
        </DashboardProvider>

        {/* Render completed Priorities as Achievements for user history */}
        <AchievementProvider>
            <Route exact path="/achievements">
                <AchievementList />
            </Route>
        </AchievementProvider>

        {/* Render community feed here (posts & comments) */}
        <PostProvider>
            <Route exact path="/community">
                <CommunityFeed />
            </Route>

            <Route exact path="/post/new">
                <PostForm />
            </Route>

            <Route exact path="/post/:postId(\d+)/edit">
                <PostForm />
            </Route>
        </PostProvider>
    </>
}