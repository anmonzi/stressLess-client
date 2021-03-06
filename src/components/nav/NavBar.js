import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { NavBarContext } from "./NavBarProvider"
import { Button, Offcanvas } from "react-bootstrap"
import { useHistory } from "react-router"
import * as FaIcons from "react-icons/fa"
import * as FiIcons from "react-icons/fi"
import * as BsIcons from "react-icons/bs"
import logo from "../../images/StressLessLogo.png"
import "./NavBar.css"

export const NavBar = () => {
    const { user, checkIfStaff } = useContext(NavBarContext)
    const [show, setShow] = useState(false);
    const history = useHistory()
  
    const handleShow = () => setShow(!show);

    useEffect(() => {
      checkIfStaff()
    }, [])
  
    return (
      <>
        <Button className="menu-bars" onClick={handleShow}>
          <FaIcons.FaBars />
        </Button>
  
        <Offcanvas show={show} onHide={handleShow}>
          <Offcanvas.Header closeButton className="navbar-header">
            <Offcanvas.Title><img src={logo} className="nav-logo" /></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="navbar-body">
            <ul className="navbar">
              {/* Dashboard link ternary */}
              
              {
                (user.is_staff)
                ? <>
                    <li className="navbar__item">
                      <Link className="nav-link" to="/admin/dashboard"
                        onClick={handleShow}><BsIcons.BsFillHouseDoorFill className="nav-icon" /> Dashboard</Link>
                    </li>
                  </>
                : <>
                    <li className="navbar__item">
                      <Link className="nav-link" to="/dashboard"
                        onClick={handleShow}><BsIcons.BsFillHouseDoorFill className="nav-icon" /> Dashboard</Link>
                    </li>
                  </>
              }

              {/* Admin app users or user profile ternary */}

              {
                (user.is_staff)
                ? <>
                    <li className="navbar__item">
                      <Link className="nav-link" to="/admin/users"
                        onClick={handleShow}><BsIcons.BsFillPersonFill className="nav-icon" /> App Users </Link>
                    </li>
                  </>
                : <>
                    <li className="navbar__item">
                      <Link className="nav-link purple" to="/profile"
                        onClick={handleShow}><BsIcons.BsFillPersonFill className="nav-icon" /> User Profile</Link>
                    </li>
                  </>
              }

              {/* Admin will require more permissions than user */}

              {
                (user.is_staff)
                ? <>
                    <li className="navbar__item">
                      <Link className="nav-link" to="/community"
                        onClick={handleShow}><BsIcons.BsChatDotsFill className="nav-icon" /> Social Feed</Link>
                    </li>
                  </>
                : <>
                    <li className="navbar__item">
                      <Link className="nav-link steel" to="/community"
                        onClick={handleShow}><BsIcons.BsChatDotsFill className="nav-icon" /> Community</Link>
                    </li>
                  </>
              }

              {/* Admin doesn't have achievements page but users do */}

              {
                (user.is_staff)
                ? null
                : <>
                    <li className="navbar__item">
                      <Link className="nav-link salmon" to="/achievements"
                        onClick={handleShow}><BsIcons.BsAwardFill className="nav-icon" /> Achievements</Link>
                    </li>
                  </>
              }

              {/* Admin resoure upload or user resource tab */}

              {
                (user.is_staff)
                ? <>
                    {/* <li className="navbar__item">
                      <Link className="nav-link" to="/admin/resource/upload"
                        onClick={handleShow}><BsIcons.BsBook className="nav-icon" /> Resource Upload</Link>
                    </li> */}
                  </>
                : <>
                    <li className="navbar__item">
                      <Link className="nav-link sage" to="/resources"
                        onClick={handleShow}><BsIcons.BsBook className="nav-icon" /> Resources</Link>
                    </li>
                  </>
              }
              
              {/* Logout  */}
              {
                  (localStorage.getItem("stressLess_user_id") !== null) ?
                      <li className="navbar__item">
                          <button className="nav-link fakeLink nav-logout"
                              onClick={() => {
                                  localStorage.removeItem("stressLess_user_id")
                                  localStorage.removeItem("stressLess_staff")
                                  history.push({ pathname: "/" })
                              }}
                          >Logout <FiIcons.FiLogOut className="nav-logout" /></button>
                      </li> :
                      <>
                          <li className="nav-item">
                              <Link className="nav-link" to="/login">Login</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link" to="/register">Register</Link>
                          </li>
                      </>
              }        </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }


// export const NavBar = (props) => {
//     return (
//         <ul className="navbar">
//             <li className="navbar__item">
//                 Navigation link
//             </li>
//             <li className="navbar__item">
//                 Navigation link
//             </li>
//             <li className="navbar__item">
//                 Navigation link
//             </li>
//             {
//                 (localStorage.getItem("stressLess_user_id") !== null) ?
//                     <li className="nav-item">
//                         <button className="nav-link fakeLink"
//                             onClick={() => {
//                                 localStorage.removeItem("stressLess_user_id")
//                                 props.history.push({ pathname: "/" })
//                             }}
//                         >Logout</button>
//                     </li> :
//                     <>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/login">Login</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/register">Register</Link>
//                         </li>
//                     </>
//             }        </ul>
//     )
// }