import React, { useContext } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import { DoorOpenFill, HouseDoor, JournalText, Person } from 'react-bootstrap-icons'
import { Link, Redirect } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { useHomeDispatch, useTrackedState } from '../../Reducer/HomeReducer'
import StyledContentLoader from 'styled-content-loader'
import { useEffect } from 'react'
import DefaultImage from '../../Images/other/user_default.jpeg'

const Navigator = () => {
    const homeDispatch = useHomeDispatch();
    const homeState = useTrackedState();
    const {userState, userDispatch} = useContext(UserContext);
    const handleClick = () =>{
        return userDispatch({type: 'Logout'})
    }
   
    return (
        <div>
            <Card className="mb-2 shadow-sm">
                <Card.Body className="d-flex flex-column ">
                    <div className="d-flex align-items-center">
                        {userState.username ? 
                        <>
                            <Card.Img src={userState.image} style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }} className="rounded-circle me-2" variant="top" />
                            <Card.Title>{userState.nama} <br /> <small className="text-secondary">@{userState.username}</small>     </Card.Title>
                        </>
                        :
                        <StyledContentLoader
                            backgroundColor="#fafafa"
                            foregroundColor="#cccccc"
                            isLoading={true}
                            className='d-flex'
                        >
                            <Card.Img src={DefaultImage}  style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }} className="rounded-circle me-2" variant="top" />
                            <p>hahahahaha
                                hahahahaha</p> 
                        </StyledContentLoader>
                            
                        }
                        
                    </div>
                    <hr />
                    <div className="d-flex flex-md-column justify-content-between mt-2">
                        <br />
                        {userState.username ? 
                            <div className="d-flex flex-md-column justify-content-center mt-2">
                                {homeState.pathname === '/home' ? 
                                    <span style={{ cursor:'pointer' }} className="text-dark text-decoration-none me-2" onClick={() => homeDispatch({type: 'REFRESH'})}><HouseDoor size={30} /> Home </span>
                                :
                                    <Link className="text-dark text-decoration-none me-2" to="/home"> <HouseDoor size={30} /> Home</Link>
                                }
                                
                                <hr />
                                <Link className="text-dark text-decoration-none me-2" to={{pathname: `/home/${userState.username}`}}> <Person size={30} /> Profil</Link>
                                <hr />
                                <a href='https://storypedia.netlify.app/' className="text-dark text-decoration-none me-2"> <JournalText size={30} /> About</a>
                                <hr />
                                <span style={{ cursor:'pointer' }} className="text-danger text-decoration-none me-2" onClick={handleClick}><DoorOpenFill size={30} /> Logout</span>
                            </div>
                        :
                            <StyledContentLoader
                                backgroundColor="#fafafa"
                                foregroundColor="#cccccc"
                                isLoading={true}
                                className="d-flex flex-md-column justify-content-start mt-2"
                            >
                                <p>aallallaaaaaaaa</p>
                                <hr />
                                <p>alalalallaaaa</p>
                                <hr />
                                <p>lalalallal</p>
                                <hr />
                                <p>lalalallss</p>
                            </StyledContentLoader>
                        }
                        
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Navigator
