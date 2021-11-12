import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Container, Col, Row, Image, Form, Button, InputGroup, Spinner, Alert } from 'react-bootstrap'
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { useForm } from 'react-hook-form';
import RegisterImage from '../../Images/svg/register.svg'
import { FormRegistrasi } from '../../Utils/FormRegistrasi';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = useRef({})
    password.current = watch('password', '')

    //state
    const [cek, setCek] = useState({type: 'password', slash: 'none', eye: 'block'})
    const [display, setDisplay] = useState({
        button: 'block',
        loading: 'none'
    })
    const [alert, setAlert] = useState({
        isSuccess: {
            display: 'none',
            message: ''
        },
        isError: {
                display: 'none',
                message: ''
        }
    })

    const cekPassword = () => {
        if(cek.type === 'password'){
            setCek({
                type: 'text',
                slash: 'block', 
                eye: 'none'
            })
        }else{
            setCek({
                type: 'password',
                slash: 'none', 
                eye: 'block'
            })
        }
    }

    const onSubmit = data => {
        setDisplay({
            button: 'none',
            loading: 'block'
        })
        const form = {
            nama: data.nama,
            email: data.email,
            username: data.username,
            role: 1,
            password: data.password
        }
        axios.post(`${window.env.API_URL}auth/register`, form)
                .then(res => {
                    setDisplay({
                        button: 'block',
                        loading: 'none'
                    })
                    setAlert({
                        isSuccess: {
                            display: 'block',
                            message: res.data.message
                        },
                        isError: {
                            display: 'none',
                            message: ''
                        }
                    })    
                })
                .catch(err => {
                    if(err.response){
                        setAlert({
                            isSuccess: {
                                display: 'none',
                                message: ''
                            },
                            isError: {
                                    display: 'block',
                                    message: err.response.data.message
                            }
                        })
                        setDisplay({
                            button: 'block',
                            loading: 'none'
                        })
                    }
                })
    }

    return (
        <Container className="mt-3" style={{overflowY: 'auto', height: '100vh'}}>
            <Row>
                <Col md={7}>
                    <Image src={RegisterImage} fluid />
                </Col>
                <Col md={5} className="">
                    <h1 className="text-center">Registrasi</h1>
                    <Alert variant='success' style={{ display: alert.isSuccess.display }}>
                        {alert.isSuccess.message}
                    </Alert>
                    <Alert variant='danger' style={{ display: alert.isError.display }}>
                        {alert.isError.message}
                    </Alert>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {FormRegistrasi.map((val, i) => {
                            if(val.name == 'r_password'){
                                val.validation = {
                                    ...val.validation,
                                    validate: value => value === password.current || 'Password Tidak Sama'
                                }
                                return (
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>{val.label}</Form.Label>
                                        <InputGroup className="rounded-pill">
                                            <Form.Control
                                                className="rounded-pill " 
                                                type={cek.type} 
                                                placeholder={val.placeholder}
                                                {...register(val.name, val.validation)}                                    
                                            />
                                            <span className="input-group-append">
                                                <Button className="rounded-pill" variant="outline-secondary" onClick={cekPassword}>
                                                    <EyeFill size={30} style={{ display: cek.eye }}/>
                                                    <EyeSlashFill size={30} style={{ display: cek.slash }} />
                                                </Button>
                                            </span>
                                        </InputGroup>
                                        {errors[val.name] && <small className="text-danger">{errors[val.name].message}</small>}
                                    </Form.Group>
                                )
                            }else{
                                return(
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>{val.label}</Form.Label>
                                        <Form.Control
                                            className="rounded-pill"
                                            name={val.name} 
                                            type={val.type} 
                                            placeholder={val.placeholder}
                                            {...register(val.name, val.validation)}                                    
                                        />
                                        {errors[val.name] && <small className="text-danger">{errors[val.name].message}</small>}
                                    </Form.Group>
                                )
                            }
                        })}
                        <Button variant='warning' className="text-light rounded-pill" type="submit" style={{ display: display.button }}>
                            Submit
                        </Button>
                        <Button variant="warning" className="text-light rounded-pill" disabled style={{ display: display.loading }}>
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
                </Col>
            </Row>
            <br />
            <br />
            <br />
            <br />
            <br />
        </Container>
    )
}

export default Register
