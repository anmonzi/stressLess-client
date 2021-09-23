import React from "react"
import { useHistory } from "react-router"
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import logo from "../../images/StressLessLogo.png"
import "./Auth.css"


export const Login = (props) => {
    const email = React.createRef()
    const password = React.createRef()
    const invalidDialog = React.createRef()
    const inactiveDialog = React.createRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: email.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res && "is_staff" in res && res.is_staff) {
                    localStorage.setItem( "stressLess_user_id", res.token )
                    localStorage.setItem( "stressLess_staff", res.is_staff )
                    history.push("/admin/dashboard")
                } else if ("valid" in res && res.valid === false) {
                    inactiveDialog.current.showModal()
                } else if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem( "stressLess_user_id", res.token )
                    history.push("/dashboard")
                } else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Email or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
        
            <dialog className="dialog dialog--auth" ref={inactiveDialog}>
                <div>Your account has been suspended.</div>
                <button className="button--close" onClick={e => inactiveDialog.current.close()}>Close</button>
            </dialog>
            
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <div className="form--login--flex">
                    <img className="app-logo" src={logo} />
                    <h2 className="login-header">Please sign in</h2>
                        <div>
                            <fieldset>
                                <label htmlFor="inputEmail"> Email address </label>
                                <input ref={email} type="email" id="email" className="form-control"  placeholder="Email address" required autoFocus />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="inputPassword"> Password </label>
                                <input ref={password} type="password" id="password" className="form-control"  placeholder="Password" required />
                            </fieldset>
                        </div>
                    </div>
                    <fieldset style={{
                        textAlign:"center"
                    }}>
                        <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
