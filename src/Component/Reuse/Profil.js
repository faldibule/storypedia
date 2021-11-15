import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { DoorOpenFill, HouseDoor, JournalText, Person } from 'react-bootstrap-icons'
import { Link, Redirect } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { useHomeDispatch } from '../../Reducer/HomeReducer'

const Profil = () => {
    const homeDispatch = useHomeDispatch();
    const {userState, userDispatch} = useContext(UserContext);
    const handleClick = () =>{
        return userDispatch({type: 'Logout'})
    }
    return (
        <div>
            <Card className="mb-2 shadow-sm">
                <Card.Body className="d-flex flex-column ">
                    <div className="d-flex align-items-center">
                        <Card.Img src={userState.image} style={{ width: '50px', objectFit: 'cover', objectPosition: 'center' }} className="rounded-circle me-2" variant="top" />
                        <Card.Title>{userState.nama} <br /> <small className="text-secondary">@{userState.username}</small>     </Card.Title>
                    </div>
                    <hr />
                    <div className="d-flex flex-md-column justify-content-between mt-2">
                        <br />
                        {window.location.pathname == '/home' ? 
                            <span style={{ cursor:'pointer' }} className="text-dark text-decoration-none me-2" onClick={() => homeDispatch({type: 'REFRESH'})}><HouseDoor size={30} /> Home </span>
                        :
                            <Link className="text-dark text-decoration-none me-2" to="/home"> <HouseDoor size={30} /> Home</Link>
                        }
                        
                        <hr />
                        <Link className="text-dark text-decoration-none me-2" to="/home"> <Person size={30} /> Profil</Link>
                        <hr />
                        <Link className="text-dark text-decoration-none me-2" to="/home">  <JournalText size={30} />  Storyku</Link>
                        <hr />
                        <span style={{ cursor:'pointer' }} className="text-danger text-decoration-none me-2" onClick={handleClick}><DoorOpenFill size={30} /> Logout</span>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Profil
