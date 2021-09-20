import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { ApplicationViewsTwo } from "./AdminApplicationViews"
import { NavBar } from "./nav/NavBar.js"
import { Login } from "./auth/Login.js"
import { Register } from "./auth/Register.js"
import { NavBarProvider } from "./nav/NavBarProvider"


export const StressLess = () => {
    
      return (
        <>
        <Route render={() => {
            if (localStorage.getItem("stressLess_user_id") && localStorage.getItem("stressLess_staff") === 'true') {
                return (
                    <>
                        <NavBarProvider>
                            <NavBar />
                            <ApplicationViewsTwo/>
                        </NavBarProvider>
                    </>
                );   
            } else if (localStorage.getItem("stressLess_user_id")) {
                return (
                        <>
                        <NavBarProvider>
                            <NavBar />
                            <ApplicationViews/>
                        </NavBarProvider>
                       </>
                );
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={Login} />
        <Route path="/register" render={Register} />
        </>

      )
}

// export const StressLess = () => (
//     <>
//         <Route render={() => {
//             if (localStorage.getItem("stressLess_user_id")) {
//                 return <>
//                         <NavBarProvider>
//                             <NavBar />
//                             <Route render={props => <ApplicationViews {...props} />} />
//                         </NavBarProvider>
//                        </>
//             } else {
//                 return <Redirect to="/login" />
//             }
//         }} />

//         <Route path="/login" render={Login} />
//         <Route path="/register" render={Register} />
//     </>
// )