import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Navigator from '../../Component/Reuse/Navigator'
import { UserContext } from '../../Context/UserContext'
import { Provider } from '../../Reducer/HomeReducer'
import Detail from '../Detail/Detail'
import {Home} from '../Home/Home'
import Profil from '../Profil/Profil'


const MainApp = () => {
    const {userState} = useContext(UserContext)

    if(!userState.isAuth){
        localStorage.clear()
        return <Redirect to={{ pathname: '/login' }} />
    }

    return (
        <Container className="mt-2">
            <Row>
                <Provider>
                <BrowserRouter>
                    <Col md={3} >
                        <Navigator />
                    </Col>
                    <Col md={8}>
                        <Switch>
                            <Route exact path="/home" component={Home}/>
                            <Route exact path="/home/:username" component={Profil}/>
                            <Route exact path="/home/detail/:uuid" component={Detail}/>
                        </Switch>
                    </Col>
                </BrowserRouter>
                </Provider>
            </Row>
        </Container>
    )
}

export default MainApp
