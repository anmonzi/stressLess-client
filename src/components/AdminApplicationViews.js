import React from "react"
import { Route } from "react-router-dom"
import { DashboardProvider } from "./dashboard/DashboardProvider"
import { AdminDashboard } from "./admin/AdminDashboard"
import { AppUserProvider } from "./users/AppUserProvider"
import { AppUserList } from "./users/AppUserList"
import { CommunityFeed } from "./community/CommunityFeed"
import { PostProvider } from "./posts/PostProvider"
import { PostForm } from "./posts/PostForm"
import { CommentProvider } from "./comments/CommentProvider"
import { MotivationProvider } from "./motivation/MotivationProvider"


export const ApplicationViewsTwo = () => {
    return <>
        {/* Render user dashboard upon login */}
        <DashboardProvider>
            <MotivationProvider>
                <Route exact path="/admin/dashboard">
                    <AdminDashboard />
                </Route>
            </MotivationProvider>
        </DashboardProvider>

        {/* Render complete list of current application users */}
       <AppUserProvider>
            <Route exact path="/admin/users">
                <AppUserList />
            </Route>
        </AppUserProvider>

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