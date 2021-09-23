import React from "react"
import { Link } from "react-router-dom"
import logo from "../../images/StressLessLogo.png"
import "./Auth.css"

export const Register = (props) => {
    const firstName = React.createRef()
    const lastName = React.createRef()
    const email = React.createRef()
    const bio = React.createRef()
    const password = React.createRef()
    const verifyPassword = React.createRef()
    const passwordDialog = React.createRef()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": email.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "bio": bio.current.value,
                "image_url": "",
                "email": email.current.value,
                "password": password.current.value
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("stressLess_user_id", res.token)
                        props.history.push("/dashboard")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <div className="form--login--container">
                <div className="form--flex">
                
                    <form className="form--login" onSubmit={handleRegister}>
                        <div className="app-logo-flex">
                            <img className="app-logo" src={logo} />
                        </div>
                        <h1 className="h3 mb-3 font-weight-normal login-header">Register an account for StressLess</h1>
                        <fieldset>
                            <label htmlFor="firstName"> First Name </label>
                            <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First Name" required autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="lastName"> Last Name </label>
                            <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last Name" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputEmail"> Email address </label>
                            <input ref={email} type="email" name="email" className="form-control" placeholder="Email Address" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputPassword"> Password </label>
                            <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="verifyPassword"> Verify Password </label>
                            <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify Password" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="bio"> Please enter a Bio </label>
                            <textarea ref={bio} name="bio" className="form-control" placeholder="Let other gamers know a little bit about you..." />
                        </fieldset>
                        <fieldset style={{
                            textAlign: "center"
                        }}>
                            <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                        </fieldset>
                    </form>
                </div>
            </div>
            <section className="link--register">
                Already registered? <Link to="/login" className="btn btn-3">Login</Link>
            </section>  
        </main>
    )
}
