import React, { useState } from 'react'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FormRegistrasi } from '../../Utils/FormRegistrasi'

const ProfilModal = (props) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const [display, setDisplay] = useState({
        button: 'block',
        loading: 'none'
    })
    

    const onSubmit = (data) => {
        let isEmailSame = props.datauser.email === data.email
        let isUsernameSame = props.datauser.username === data.username
        setDisplay({
            button: 'none',
            loading: 'block'
        })
        console.log(isEmailSame, isUsernameSame)
        setDisplay({
            button: 'block',
            loading: 'none'
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
