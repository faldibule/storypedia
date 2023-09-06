import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Modal, Button, Form, Spinner, Alert, InputGroup } from 'react-bootstrap'
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import { FormRegistrasi } from '../../Utils/FormRegistrasi'

const PasswordModal = (props) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const pw = useRef({})
    pw.current = watch('password', '')
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
    const [cek, setCek] = useState({type: 'password', slash: 'none', eye: 'block'})

    
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

    const onSubmit = (data) => {
        const dataForm = {
            password: data.old_password,
            newPassword: data.password,
            userId: props.datauser.userId
        }
        setDisplay({
            button: 'none',
            loading: 'block'
        })
        axios.post(`${window.env.API_URL}auth/edit_password`, dataForm)
                .then(res => {
                    setValue('password', '')
                    setValue('old_password', '')
                    setValue('r_password', '')
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
                })
                .catch(err => {
                    if(err.response){
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
                    Form Edit Password
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
                <Form.Group className="mb-3" controlId="anjay">
                        <Form.Label>Password Lama</Form.Label>
                            <Form.Control
                                className="rounded-pill"
                                name='old_password' 
                                type='password' 
                                placeholder='Password Lama '
                                {...register('old_password', {
                                    required: 'Wajib Diisi!',
                                })}                                    
                            />
                        {errors['old_password'] && <small className="text-danger">{errors['old_password'].message}</small>}
                    </Form.Group>
                    {FormRegistrasi.map((val, i) => {
                        if(val.name == 'r_password' || val.name == 'password'){
                            if(val.name == 'r_password'){
                                val.validation = {
                                    ...val.validation,
                                    validate: value => value === pw.current || 'Password Tidak Sama'
                                }
                            }
                            return(
                                <div key={i}>
                                {val.name === 'password' ?
                                <Form.Group className="mb-3" controlId={i}>
                                    <Form.Label>{val.label+' Baru'}</Form.Label>
                                        <Form.Control
                                            className="rounded-pill"
                                            name={val.name} 
                                            type={val.type} 
                                            placeholder={val.placeholder}
                                            {...register(val.name, val.validation)}                                    
                                        />
                                    {errors[val.name] && <small className="text-danger">{errors[val.name].message}</small>}
                                </Form.Group>
                                
                                :

                                <Form.Group className="mb-3" controlId={i}>
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

                                }
                                </div>
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

export default PasswordModal
