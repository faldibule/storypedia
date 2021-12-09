import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Form, Modal, Spinner, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserContext } from '../../Context/UserContext';
import CommentCard from './CommentCard';

const CommentModal = (props) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const [display, setDisplay] = useState({
        button: 'block',
        loading: 'none'
    })
    const [comment, setComment] = useState({
        data: [],
    })
    const [more, setMore] = useState(true)
    const [page, setPage] = useState(2)
    const { userDispatch, userState } = useContext(UserContext)
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
    
    const getMoreData = () => {
        axios.post(`${window.env.API_URL}comment/find`, {
            page,
            postId: props.datapost
        })
                .then(res => {
                    if(page == res.data.commentData.totalPage){
                        setMore(false)
                    }else{
                        setPage(val => val + 1)
                    }
                    if(comment.data.length > 0){
                        const newData =  comment.data.filter(item => {
                            if (!res.data.commentData.data.some(item1=>item._id === item1._id)) {
                              return item
                            }
                          }).concat(res.data.commentData.data)
                        setComment({...comment, data: newData})
                    }
                })
                .catch(err => {
                    console.log(err)
                })
    }

    const getData = () =>{
        axios.post(`${window.env.API_URL}comment/find`, {
            page: 1,
            postId: props.datapost
        })
            .then(res => {
                const newData =  res.data.commentData.data.filter(item => {
                    if (!comment.data.some(item1=>item._id === item1._id)) {
                      return item
                    }
                  }).concat(comment.data)
                setComment({...comment, data: newData})
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    useEffect(() => {
        let mounted = true
        if(comment.data.length === 0){
            axios.post(`${window.env.API_URL}comment/find`, {
                page: 1,
                postId: props.datapost
            })
            .then(res => {
                console.log(res.data)
                if(mounted){
                    if(res.data.commentData.data.length == 0){
                        setMore(false)
                    }
                    setComment({...comment, data: res.data.commentData.data})
                }
            })
            .catch(err => {
                console.log(err.response)
            })
        }
        return () => mounted = false
    }, [props])


    const onSubmit = (data) => {
        console.log(data)
        setDisplay({
            button: 'none',
            loading: 'block'
        })
        const dataForm = {
            body: data.body,
            userId: userState.userId,
            postId: props.datapost
        }
        axios.post(`${window.env.API_URL}comment/store`, dataForm)
                .then(res => {
                    getData()
                    console.log(res.data)
                    setDisplay({
                        button: 'block',
                        loading: 'none'
                    })
                    setValue('body', '')
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
                    Comment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body id="scrollable" style={{ height: '80vh', overflowY: 'auto' }}>
                <Alert variant='success' dismissible style={{ display: alert.isSuccess.display }}>
                    {alert.isSuccess.message}
                </Alert>
                <Alert variant='danger' dismissible style={{ display: alert.isError.display }}>
                    {alert.isError.message}
                </Alert>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId={'x'}>
                            <Form.Control
                                className="rounded-pill"
                                name="body" 
                                type="text"
                                placeholder="write your comment here"
                                {...register("body", {
                                    maxLength: {
                                        value: 100,
                                        message: 'Maximal 100 Karakter'
                                    }
                                })}                                    
                            />
                        {errors["body"] && <small className="text-danger">{errors["body"].message}</small>}
                    </Form.Group>
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
                <br />
                
                {/* infinite scroll  */}
                <InfiniteScroll
                dataLength={comment.data.length}
                next={getMoreData}
                hasMore={more}
                loader={
                    <div className="text-center">
                        <Spinner animation="border" variant="warning" size="sm" />
                    </div>
                  }
                scrollableTarget="scrollable"
                endMessage={
                    <div style={{ textAlign: 'center' }}>
                      <b>Anda Sudah Mencapai Dasar Dari Comment! atau Comment Kosong</b>
                    </div>
                  }
                
            >
                {comment.data.map((val, i) => (
                    <div key={`${val._id}${Date.now().toString()}`}>
                            <CommentCard val={val} />
                    </div>
                ))}
            </InfiniteScroll>               
            <br />
            <br />
            <br />
            <br />
            <br />

            </Modal.Body>
            <Modal.Footer>
                
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CommentModal
