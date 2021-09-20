import React from "react"
import { Route } from "react-router-dom"
import { Dashboard } from "./dashboard/Dashboard"
import { DashboardProvider } from "./dashboard/DashboardProvider"
import { AdminDashboard } from "./admin/AdminDashboard"
import { PriorityForm } from "./priorities/PriorityForm"
import { AchievementProvider } from "./achievements/AchievementsProvider"
import { AchievementList } from "./achievements/AchievementList"
import { CommunityFeed } from "./community/CommunityFeed"
import { PostProvider } from "./posts/PostProvider"
import { PostForm } from "./posts/PostForm"
import { CommentProvider } from "./comments/CommentProvider"


export const ApplicationViewsTwo = () => {
    return <>
        {/* Render user dashboard upon login */}
        <DashboardProvider>
                    <Route exact path="/admin/dashboard">
                        <AdminDashboard />
                    </Route>
        </DashboardProvider>

        {/* Render completed Priorities as Achievements for user history */}
        <AchievementProvider>
            <Route exact path="/achievements">
                <AchievementList />
            </Route>
        </AchievementProvider>

        {/* Render community feed here (posts & comments) */}
        <PostProvider>
            <CommentProvider>
                <Route exact path="/community">
                    <CommunityFeed />
                </Route>

                <Route exact path="/post/new">
                    <PostForm />
                </Route>

                <Route exact path="/post/:postId(\d+)/edit">
                    <PostForm />
                </Route>
            </CommentProvider>
        </PostProvider>
    </>
}