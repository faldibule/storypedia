import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Card, Image, Spinner, Button } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Redirect } from 'react-router'
import CardPost from '../../Component/Atom/CardPost'
import ProfilModal from '../../Component/Atom/ProfilModal'
import { UserContext } from '../../Context/UserContext'
import { useHomeDispatch, useTrackedState } from '../../Reducer/HomeReducer'

const Profil = (props) => {
    const { userState } = useContext(UserContext)
    const homeDispatch = useHomeDispatch()
    const homeState = useTrackedState()
    const [profilData, setProfilData] = useState({})
    const [display, setDisplay] = useState({post: 'none'})
    
    //modal state
    const [modal, setModal] = useState({
        profil: false,
        password: false,
    })

    const getMoreData = () => {
        axios.post(`${window.env.API_URL}post/findByUserId`, {
            page: homeState.page,
            userId: profilData._id
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
        const username = props.match.params.username
        if(username){
            axios.post(`${window.env.API_URL}auth/profil`, {
                username,
            })
            .then(res => {
                if(mounted){
                    homeDispatch({type: 'REFRESH'})
                    console.log(res.data)
                    setProfilData(res.data.user[0])
                }

            })
            .catch(err => {
                console.log(err.response)
            })
        }
        return () => {
            mounted = false
        }
    }, [props])

    useEffect(() => {
        let mounted = true
        if(homeState.postData.length == 0 && JSON.stringify(profilData) !== '{}'){
            axios.post(`${window.env.API_URL}post/findByUserId`, {
                page: 1,
                userId: profilData._id
            })
            .then(res => {
                if(mounted){
                    console.log(res.data)
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
    
    return (
        <div style={{ height: '90vh', overflow: "auto"}} id="scrollableDiv">
            {JSON.stringify(profilData) !== '{}' ? 
            <Card>
                <Card.Header className="text-center d-flex justify-content-center flex-column align-items-center">
                    <Image style={{ width: '120px', objectFit: 'cover', objectPosition: 'center' }} className="img-fluid rounded-circle me-2" variant="top" src={profilData.image} />
                    <span>
                        <h5>{profilData.username}</h5>
                        <h5 className="text-secondary">{profilData.email}</h5>
                    </span>
                </Card.Header>
                <Card.Footer className="d-flex justify-content-evenly">
                    {display.post === 'none' ? 
                        <Button className="text-light btn-sm mx-1" variant='warning' onClick={handleDisplay}> Lihat {profilData.username} Post</Button>
                    :
                        <Button className="text-light btn-sm mx-1" variant='warning' onClick={handleDisplay}> Sembunyikan {profilData.username} Post</Button>

                    }
                    {profilData.username === userState.username &&
                    <> 
                        <Button className="text-light btn-sm mx-1" variant='warning' onClick={() => setModal({...modal, profil: true})}> Edit Profil</Button>
                        <Button className="text-light btn-sm mx-1" variant='warning' onClick={() => setModal({...modal, password: true})}> Ganti Password</Button>
                        <Button className="text-light btn-sm mx-1" variant='warning'> Ganti Foto Profil</Button>
                    </>
                    }
                </Card.Footer>

            </Card>
            :
            <div className="text-center mt-5">
                <Spinner animation="border" variant="warning" size="sm" />
            </div>
            }

            {/* modal */}
            <ProfilModal datauser={profilData} show={modal.profil} onHide={() => setModal({...modal, profil: false})} />

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