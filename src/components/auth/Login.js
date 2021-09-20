import React from "react"
import { Link } from "react-router-dom"
import "./Auth.css"


export const Login = props => {
    const email = React.createRef()
    const password = React.createRef()
    const invalidDialog = React.createRef()

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
                    props.history.push("/admin/dashboard")
                } else if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem( "stressLess_user_id", res.token )
                    props.history.push("/dashboard")
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
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Welcome to StressLess</h1>
                    <h2>Please sign in</h2>
                    <div className="form--login--flex">
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
