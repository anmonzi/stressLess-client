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
import { CommentProvider } from "./comments/CommentProvider"
import { ResourceProvider } from "./resources/ResourceProvider"
import { ResourceList } from "./resources/ResourceList"
import { ProfileProvider } from "./profile/ProfileProvider"
import { Profile } from "./profile/Profile"
import { MotivationProvider } from "./motivation/MotivationProvider"


export const ApplicationViews = () => {
    return <>
        {/* Render user dashboard upon login */}
        <DashboardProvider>
            <PriorityProvider>
                <ReflectionProvider>
                    <MotivationProvider>
                        <Route exact path="/dashboard">
                            <Dashboard />
                        </Route>

                        <Route exact path="/priority/new">
                            <PriorityForm />
                        </Route>

                        <Route exact path="/priority/:priorityId(\d+)/edit">
                            <PriorityForm />
                        </Route>
                    </MotivationProvider>
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

        {/* Render resources for users here */}
        <ResourceProvider>
            <Route exact path="/resources">
                <ResourceList />
            </Route>
        </ResourceProvider>

        {/* Render user profile here */}
        <ProfileProvider>
            <Route exact path="/profile">
                <Profile/>
            </Route>
        </ProfileProvider>
    </>
}