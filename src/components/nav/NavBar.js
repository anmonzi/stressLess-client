import React, { useState} from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import { Button, Offcanvas } from "react-bootstrap"
import { useHistory } from "react-router"
import * as FaIcons from "react-icons/fa"
import * as FiIcons from "react-icons/fi"
import * as BsIcons from "react-icons/bs"

export const NavBar = () => {
    const [show, setShow] = useState(false);
    const history = useHistory()
  
    const handleShow = () => setShow(!show);
  
    return (
      <>
        <Button className="menu-bars" onClick={handleShow}>
          <FaIcons.FaBars />
        </Button>
  
        <Offcanvas show={show} onHide={handleShow}>
          <Offcanvas.Header closeButton className="navbar-header">
            <Offcanvas.Title>StressLess</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="navbar-body">
            <ul className="navbar">
              <li className="navbar__item">
                <Link className="nav-link" to="/dashboard" onClick={handleShow}><BsIcons.BsFillHouseDoorFill /> Dashboard</Link>
              </li>
              <li className="navbar__item">
                <Link className="nav-link" to="/profile" onClick={handleShow}><BsIcons.BsFillPersonFill /> User Profile</Link>
              </li>
              <li className="navbar__item">
                <Link className="nav-link" to="/community" onClick={handleShow}><BsIcons.BsChatDotsFill /> Community</Link>
              </li>
              <li className="navbar__item">
                <Link className="nav-link" to="/resources" onClick={handleShow}><BsIcons.BsBook /> Resources</Link>
              </li>
              {
                  (localStorage.getItem("stressLess_user_id") !== null) ?
                      <li className="navbar__item">
                          <button className="nav-link fakeLink"
                              onClick={() => {
                                  localStorage.removeItem("stressLess_user_id")
                                  history.push({ pathname: "/" })
                              }}
                          >Logout <FiIcons.FiLogOut /></button>
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