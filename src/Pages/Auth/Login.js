import axios from 'axios'
import React, { useState, useContext } from 'react'
import { Col, Container, Row, Button, Form, Spinner, Alert, Image } from 'react-bootstrap'
import { UserContext } from '../../Context/UserContext'

import LoginImage from '../../Images/svg/login.svg'

export const Login = (props) => {
    const {userDispatch} = useContext(UserContext)

    const [form, setForm] = useState({email_username: '', password: ''})
    const [alert, setAlert] = useState({isError: 'none'})
    const [message, setMessage] = useState({isError: ''})
    const [display, setDisplay] = useState({button: 'block', loading: 'none'})

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = () => {
        setDisplay({
            button: 'none',
            loading: 'block'
        })

        const data = {
            email_username: form.email_username,
            password: form.password
        }

        axios.post(`${window.env.API_URL}auth/login`, data)
                .then(res => {
                    if(res.data){
                        userDispatch({
                            type: 'Login',
                            payload: {
                                userId: res.data.data._id,
                                image: res.data.data.image,
                                image_id: res.data.data.image_id,
                                nama: res.data.data.nama,
                                username: res.data.data.username,
                                email: res.data.data.email,
                                role: res.data.data.role,
                                token: res.data.token,
                                isAuth: true
                            }
                        })
                        setDisplay({
                            button: 'block',
                            loading: 'none'
                        })
                        props.history.push('/home')
                    }
                })
                .catch(err => {
                    if(err.response){
                        setAlert({isError: 'block'})
                        setMessage({isError: err.response.data.message})
                        setDisplay({
                            button: 'block',
                            loading: 'none'
                        })
                    }
                })

    }


    return (
        <Container className="mt-3" style={{ overflowY: 'auto', height: '100vh' }}>
            <Row>
                <Col md={7}>
                    <Image src={LoginImage} fluid />
                </Col>
                <Col md={5}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1 className="text-center">Login</h1>
                    <Alert variant='danger' style={{ display: alert.isError }}>
                        {message.isError}
                    </Alert>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address/Username</Form.Label>
                            <Form.Control
                                className="rounded-pill"
                                value={form.email_username}
                                onChange={handleChange}
                                name="email_username" 
                                type="text" 
                                placeholder="Email/Username Anda!" 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                className="rounded-pill"
                                value={form.password}
                                onChange={handleChange}
                                name="password" 
                                type="password" 
                                placeholder="Type Your Password Slowly" 
                            />
                        </Form.Group>
                        <Button variant='warning' className="text-light rounded-pill" name='submit' style={{ display: display.button }} onClick={onSubmit}>Submit</Button>
                        <Button variant='warning' className="text-light rounded-pill" disabled style={{ display: display.loading }}>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </Button>
                    </Form>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </Col>
            </Row>
        </Container>
    )
}
