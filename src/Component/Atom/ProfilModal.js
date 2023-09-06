import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../Context/UserContext'
import { FormRegistrasi } from '../../Utils/FormRegistrasi'

const ProfilModal = (props) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const [display, setDisplay] = useState({
        button: 'block',
        loading: 'none'
    })
    const { userDispatch } = useContext(UserContext)
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
    

    const onSubmit = (data) => {
        let isEmailSame = props.datauser.email === data.email
        let isUsernameSame = props.datauser.username === data.username
        setDisplay({
            button: 'none',
            loading: 'block'
        })
        const dataForm = {
            nama: data.nama,
            email: data.email,
            username: data.username,
            isEmailSame,
            isUsernameSame,
            userId: props.datauser.userId,
            password: data.password
        }
        axios.post(`${window.env.API_URL}auth/edit_profil`, dataForm)
                .then(res => {
                    userDispatch({
                        type: 'EDIT_PROFIL',
                        payload: {
                            nama: data.nama,
                            username: data.username,
                            email: data.email
                        }
                    })
                    setValue('password', '')
                    setValue('nama', data.nama)
                    setValue('username', data.username)
                    setValue('email', data.email)
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
                    setDisplay({
                        button: 'block',
                        loading: 'none'
                    })
                    if(!isUsernameSame){
                        userDispatch({
                            type: 'NEW_TOKEN',
                            payload: {
                                token: res.data.data.token
                            }
                        })
                        props.history.replace({ pathname: `/home/${data.username}`})
                    }
                })
                .catch(err => {
                    if(err.response){
                        setValue('password', '')
                        setDisplay({
                            button: 'block',
                            loading: 'none'
                        })
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
                    }
                })
    }

    return (
        <div>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Form Edit Profil
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant='success' dismissible style={{ display: alert.isSuccess.display }}>
                    {alert.isSuccess.message}
                </Alert>
                <Alert variant='danger' dismissible style={{ display: alert.isError.display }}>
                    {alert.isError.message}
                </Alert>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {FormRegistrasi.map((val, i) => {
                        if(val.name !== 'r_password'){
                            return(
                                <Form.Group className="mb-3" controlId={i} key={i}>
                                    <Form.Label>{val.label}</Form.Label>
                                    {val.name !== 'password' ?
                                        <Form.Control
                                            className="rounded-pill"
                                            name={val.name} 
                                            type={val.type} 
                                            placeholder={val.placeholder}
                                            {...register(val.name, {value: props.datauser[val.name]}, val.validation)}                                    
                                        />
                                    :
                                        <Form.Control
                                            className="rounded-pill"
                                            name={val.name} 
                                            type={val.type} 
                                            placeholder={val.placeholder}
                                            {...register(val.name, val.validation)}                                    
                                        />
                                    }
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
            </Modal.Body>
            <Modal.Footer>
                
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProfilModal
