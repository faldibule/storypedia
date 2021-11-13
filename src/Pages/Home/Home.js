import React, { useContext, useState, useRef, useEffect } from 'react'
import { Form, Button, Image, Spinner } from 'react-bootstrap'
import { ImageFill } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import { Redirect, useHistory } from 'react-router'
import { UserContext } from '../../Context/UserContext'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import CardPost from '../../Component/Atom/CardPost'
import './style.css'

export const Home = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const [postData, setPostData] = useState([]);
    const [more, setMore] = useState(true)
    const [page, setPage] = useState(2);
    const [max, setMax] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const [image, setImage] = useState({
        image_file: null,
        image_preview: ''
    })
    const [display, setDisplay] = useState({button: 'inline', loading: 'none'})
    const {userState, userDispatch} = useContext(UserContext)
    const post = useRef({})
    post.current = watch('post')

    const getMoreData = () => {
        axios.post(`${window.env.API_URL}post/find`, {
            page,
        })
                .then(res => {
                    if(page == res.data.posts.totalPage){
                        setMore(false)
                    }else{
                        setPage(page => page + 1)
                    }
                    const data = res.data.posts.data
                    const newData =  postData.filter(item => {
                        if (!data.some(item1=>item._id === item1._id)) {
                          return item
                        }
                      }).concat(data)
                    setPostData(newData)
                })
                .catch(err => {
                    console.log(err)
                })
    }

    const refreshPost = () => {
        setPostData([])
        setMore(true)
        setPage(2)
    }

    const getData = () =>{
        axios.post(`${window.env.API_URL}post/find`, {
            page: 1,
        })
            .then(res => {
                const newData =  res.data.posts.data.filter(item => {
                    if (!postData.some(item1=>item._id === item1._id)) {
                      return item
                    }
                  }).concat(postData)
                setPostData(newData)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    useEffect(() => {
        let mounted = true
        if(postData.length == 0){
            axios.post(`${window.env.API_URL}post/find`, {
                page: 1,
            })
            .then(res => {
                if(mounted){
                    const newData = [...res.data.posts.data, ...postData]
                    setPostData(newData)
                }
            })
            .catch(err => {
                console.log(err.response)
            })
        }
        return () => { 
            mounted = false
        }
    }, [postData])

    if(!userState.isAuth){
        localStorage.clear()
        return <Redirect to={{ pathname: '/login' }} />
    }

    const evenControl = (e) =>{
        const l = e.target.value.length
        if(l > 100 || l < 1){
            setMax(e.target.value.length)
            setDisabled(true)
        }else{
            setDisabled(false)
            setMax(e.target.value.length)
        }
    }

    const imageHandle = (e) => {
        let image_preview = URL.createObjectURL(e.target.files[0])
        let image_file = e.target.files[0];
        setImage({
            image_file,
            image_preview
        })
    }

    const onSubmit = (data) => {
        setDisplay({
            button: 'none',
            loading: 'inline'
        })
        const formData = new FormData()
        if(image.image_file !== null){
            formData.append('image', image.image_file) 
            formData.append('body', data.post)
            formData.append('userId', userState.userId)
        }else{
            formData.append('body', data.post)
            formData.append('userId', userState.userId)
        }
        axios.post(`${window.env.API_URL}post/store`, formData, {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        }).then(res => {
            setDisplay({
                button: 'inline',
                loading: 'none'
            })
            getData()
            setValue('post', '')
            setMax(0)
            setImage({
                image_file: null,
                image_preview: ''
            })
            
        })
        .catch(err => {
            console.log(err.response)
            setDisplay({
                button: 'inline',
                loading: 'none'
            })
        })
        
    }

    

    return (
        <div className="noselect" id="scrollableDiv" style={{ height: '90vh', overflow: "auto"}}>
            <Form className="mb-3" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <Form.Group className="mb-3">
                    <Form.Control
                        onInput={evenControl}
                        name="post" 
                        placeholder="Write Your Story Here" 
                        as="textarea" 
                        rows={3}
                        {...register('post', {
                            required: 'Wajib Di isi',
                            maxLength: {
                                value: 150,
                                message: 'Maximal 150 Karakter'
                            }
                        })} 
                    />
                    <Image src={image.image_preview} style={{ width: '100px', objectFit: 'cover', objectPosition: 'center' }} />
                    {errors['post'] && <small className="text-danger">{errors['post'].message}</small>}

                </Form.Group>
                <Form.Group className="text-end">
                    <small className="text-secondary me-2">{max}/100 </small>
                    <label className="text-warning me-2" htmlFor="image-input" style={{ cursor: 'pointer' }} ><ImageFill size={30} /> </label>
                    <input name="image" id="image-input" type="file" onChange={imageHandle} style={{ display: 'none' }}/>
                    <Button type="submit" variant="warning" style={{ display: display.button }} className="rounded-pill text-light" disabled={disabled}>Send</Button>
                    <Button className="rounded-pill text-light" variant="warning" style={{ display: display.loading }} disabled>
                        <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                        Loading...
                    </Button>
                </Form.Group>
            </Form>
            <div>
            <InfiniteScroll
                dataLength={postData.length}
                next={getMoreData}
                hasMore={more}
                loader={
                    <div className="text-center">
                        <Spinner animation="border" variant="warning" size="sm" />
                    </div>
                  }
                scrollableTarget="scrollableDiv"
                endMessage={
                    <div style={{ textAlign: 'center' }}>
                      <b>Anda Sudah Mencapai Dasar Dari Post!</b>
                    </div>
                  }
                refreshFunction={refreshPost}
                pullDownToRefresh
                pullDownToRefreshThreshold={100}
                pullDownToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8595; Tarik Untuk Mensegarkan</h3>
                }
            >
                {postData.map((val, i) => (
                    <div key={`${val._id}${Date.now().toString()}`}>
                            <CardPost val={val} />
                    </div>
                ))}
            </InfiniteScroll>
            </div>
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
            <br />
        </div>
    )
}
