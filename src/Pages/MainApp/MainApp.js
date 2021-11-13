import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom'
import Profil from '../../Component/Reuse/Profil'
import { UserContext } from '../../Context/UserContext'
import Detail from '../Detail/Detail'
import {Home} from '../Home/Home'

const MainApp = () => {
    const {userState, userDispatch} = useContext(UserContext)
    // const resetToken = () =>{
    //     setTimeout(() =>{
    //         userDispatch({type: 'Logout'})
    //     }, 10000)
    // }
    // useEffect(() => {
    //     if(userState.isAuth){
    //         resetToken();
    //     }
    // }, [])

    if(!userState.isAuth){
        localStorage.clear()
        return <Redirect to={{ pathname: '/login' }} />
    }

    return (
        <Container className="mt-2">
            <Row>
                <BrowserRouter>
                    <Col md={3} >
                        <Profil />
                    </Col>
                    <Col md={8}>
                        <Switch>
                            <Route exact path="/home" component={Home}/>
                            <Route exact path="/home/detail/:uuid" component={Detail}/>
                        </Switch>
                    </Col>
                </BrowserRouter>
            </Row>
        </Container>
    )
}

export default MainApp
