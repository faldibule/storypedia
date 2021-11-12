import React, { useContext } from 'react'
import { Container, Nav, Navbar, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'


export const NavbarComponent = () => {
    const {userState, userDispatch} = useContext(UserContext)

    if(userState.isAuth){
        return (
                <Navbar sticky="top" bg="warning" variant="dark" expand="lg">
                    <Container>
                        <NavLink className="navbar-brand" to={{ pathname: '/' }}>
                            Storypedia
                        </NavLink>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav>
                                {userState.role == 2 ? 
                                    <NavLink className="nav-link" to={{ pathname: '/dashboard' }}>
                                        Dashboard Admin
                                    </NavLink>
                                   :
                                   null 
                                }
                                <span style={{ cursor:'pointer' }} className="nav-link" onClick={() => { userDispatch({type: 'Logout'})}}>
                                    Logout
                                </span>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        )
    }

    return (
            <Navbar sticky="top" bg="warning" variant="dark" expand="lg">
                <Container>
                    <NavLink className="navbar-brand" to={{ pathname: '/' }}>
                        Storypedia
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            
                        </Nav>
                        <Nav>
                            <NavLink className="nav-link" to={{ pathname: '/register' }}>
                                Registrasi
                            </NavLink>
                            <NavLink className="nav-link" to={{ pathname: '/login' }}>
                                Login
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}
