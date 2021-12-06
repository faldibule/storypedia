import axios from 'axios'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { Card, Image, Spinner, Button, Form, Alert } from 'react-bootstrap'
import { PersonBoundingBox } from 'react-bootstrap-icons'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Redirect } from 'react-router'
import CardPost from '../../Component/Atom/CardPost'
import PasswordModal from '../../Component/Atom/PasswordModal'
import ProfilModal from '../../Component/Atom/ProfilModal'
import { UserContext } from '../../Context/UserContext'
import { useHomeDispatch, useTrackedState } from '../../Reducer/HomeReducer'

const Profil = (props) => {
    const { userState, userDispatch } = useContext(UserContext)
    const homeDispatch = useHomeDispatch()
    const homeState = useTrackedState()
    const [profilData, setProfilData] = useState({})
    const [display, setDisplay] = useState({post: 'none'})
    const [message, setMessage] = useState({
        image: {
            label : 'Ganti Foto',
            disabled: false
        }
    })
    const [alert, setAlert] = useState({
        isSuccess: {
            message: '',
            display: 'none'
        },
        isError: {
            message: '',
            display: 'none'
        }
    })
    const [usernameState, setUsernameState] = useState(userState.username)

    //modal state
    const [modal, setModal] = useState({
        profil: false,
        password: false,
    })

    const getMoreData = () => {
        axios.post(`${window.env.API_URL}post/findByUserId`, {
            page: homeState.page,
            userId: profilData._id || profilData.userId
        })
        .then(res => {
            if(homeState.page == res.data.posts.totalPage){
                homeDispatch({type: 'NOT_HAS_MORE'})
            }else{
                homeDispatch({type: 'SET_PAGE'})
            }
            homeDispatch({
                type: 'SET_POST_DATA',
                payload:{
                    data1: homeState.postData,
                    data2: res.data.posts.data
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        homeDispatch({
            type: 'SET_PATH',
            payload: {
                pathname: '/profil'
            }
        })
        let mounted = true
        let username = props.match.params.username
        if(userState.username !== usernameState){
            username = userState.username
        }
        if(username !== userState.username){
            axios.post(`${window.env.API_URL}auth/profil`, {
                username,
            })
            .then(res => {
                if(mounted){
                    homeDispatch({type: 'REFRESH'})
                    
                    setProfilData(res.data.user[0])
                }

            })
            .catch(err => {
                console.log(err.response)
            })
        }else{
            if(mounted){
                homeDispatch({type: 'REFRESH'})
                setProfilData(userState)
            }
        }
        return () => {
            mounted = false
        }
    }, [props, userState.username])

    useEffect(() => {
        let mounted = true
        if(homeState.postData.length == 0 && JSON.stringify(profilData) !== '{}'){
            axios.post(`${window.env.API_URL}post/findByUserId`, {
                page: 1,
                userId: profilData._id || profilData.userId
            })
            .then(res => {
                if(mounted){
                    homeDispatch({
                        type: 'SET_POST_DATA_FIRST',
                        payload: {
                            data: res.data.posts.data,
                        }
                    })
                    if(res.data.posts.totalPage === 1){
                        homeDispatch({type: 'NOT_HAS_MORE'})
                    }
                }
            })
            .catch(err => {
                console.log(err.response)
            })
        }
        return () => { 
            mounted = false
            homeDispatch({type: 'REFRESH'})
        }
    }, [display])

    if(!userState.isAuth){
        localStorage.clear()
        return <Redirect to={{ pathname: '/login' }} />
    }
    const handleDisplay = () =>{
        if(display.post === 'none'){
            setDisplay({post: 'block'})
        }else{
            setDisplay({post: 'none'})
        }
    }

    const imageHandle = (e) => {
        setMessage({
            image: {
                label : 'Loading',
                disabled: true
            }
        })
        let image_file = e.target.files[0];
        const formData = new FormData()
        formData.append('image', image_file)
        formData.append('username', profilData.username)
        axios.post(`${window.env.API_URL}auth/edit_foto_profil`, formData)
                .then(res => {
                    userDispatch({
                        type: 'EDIT_FOTO',
                        payload: {
                            image: res.data.data.image,
                            image_id: res.data.data.image
                        }
                    })
                    setMessage({
                        image: {
                            label : 'Ganti Foto',
                            disabled: false
                        }
                    })
                    setAlert({
                        isSuccess: {
                            message: res.data.message,
                            display: 'block'
                        },
                        isError: {
                            message: '',
                            display: 'none'
                        }
                    })
                })
                .catch(err => {
                    setMessage({
                        image: {
                            label : 'Ganti Foto',
                            disabled: false
                        }
                    })
                    if(err.response){
                        setAlert({
                            isSuccess: {
                                message: '',
                                display: 'none'
                            },
                            isError: {
                                message: err.response.data.message,
                                display: 'block'
                            }
                        })
                    }
                })
    }
    
    return (
        <div style={{ height: '90vh', overflow: "auto"}} id="scrollableDiv">
            {JSON.stringify(profilData) !== '{}' ? 
            <Card>
                <Card.Header className="text-center d-flex justify-content-center flex-column align-items-center">
                    <Image style={{ width: '120px', height: '120px', objectFit: 'cover', objectPosition: 'center' }} className="img-fluid rounded-circle me-2" variant="top" src={profilData.image} />
                    <span>
                        <h5>{profilData.username}</h5>
                        <h5 className="text-secondary">{profilData.email}</h5>
                    </span>
                </Card.Header>
                <Card.Footer className="d-flex justify-content-center">
                    <Card.Body className="text-center">
                    <Alert variant='danger' style={{ display: alert.isError.display }}>
                        {alert.isError.message}
                    </Alert>   
                    <Alert variant='success' style={{ display: alert.isSuccess.display }}>
                        {alert.isSuccess.message}
                    </Alert>   
                    {display.post === 'none' ? 
                        <Button className="text-light btn-sm mx-1" variant='warning' onClick={handleDisplay}> Lihat {profilData.username} Post</Button>
                    :
                        <Button className="text-light btn-sm mx-1" variant='warning' onClick={handleDisplay}> Sembunyikan {profilData.username} Post</Button>

                    }
                    {profilData.username === userState.username &&
                    <> 
                        <Button className="text-light btn-sm mx-1" variant='warning' onClick={() => setModal({...modal, profil: true})}> Edit Profil</Button>
                        <Button className="text-light btn-sm mx-1" variant='warning' onClick={() => setModal({...modal, password: true})}> Ganti Password</Button>
                        <Form className="d-inline">
                        <label className="text-warning mx-1 my-2 btn btn-sm text-light btn-warning" htmlFor="image-input" style={{ cursor: 'pointer' }} disabled={message.image.disabled} >{message.image.label}</label>
                        <input name="image" id="image-input" type="file" onChange={imageHandle} style={{ display: 'none' }}/>
                        </Form>
                    </>
                    }
                    </Card.Body>
                </Card.Footer>

            </Card>
            :
            <div className="text-center mt-5">
                <Spinner animation="border" variant="warning" size="sm" />
            </div>
            }

            {/* modal */}
            <ProfilModal datauser={profilData} show={modal.profil} onHide={() => setModal({...modal, profil: false})} />
            <PasswordModal datauser={profilData} show={modal.password} onHide={() => setModal({...modal, password: false})} />
            {/* scroll */}
            <div style={{display: display.post}}>
                <InfiniteScroll
                    dataLength={homeState.postData.length}
                    next={getMoreData}
                    hasMore={homeState.more}
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
                    
                >
                    {homeState.postData.map((val, i) => (
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

export default Profil
