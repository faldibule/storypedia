import React, { useContext } from 'react'
import { Card, Image, Button, Spinner } from 'react-bootstrap'
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { useState } from 'react'
import axios from 'axios'
import { useHomeDispatch } from '../../Reducer/HomeReducer'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'; 



moment.updateLocale('id', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s  : '%d s',
        ss : '%d s',
        m:  "%d m",
        mm: "%d m",
        h:  "%d h",
        hh: "%d h",
        d:  "%d d",
        dd: "%d d",
        w:  "%d w",
        ww: "%d w",
        M:  "%d m",
        MM: "%d m",
        y:  "%d y",
        yy: "%d y"
    }
});
const CardPost = ({val, modalHandler}) => {
    const homeDispatch = useHomeDispatch();
    const history = useHistory();
    const { userState } = useContext(UserContext);
    const [display, setDisplay] = useState({
        loading: 'none',
        button: 'block'
    })

    const deletePost = () => {
        confirmAlert({
          title: 'Konfirmasi Hapus',
          message: 'Loh, Kok ceritanya mau dihapus?',
          buttons: [
            {
              label: 'Gpp, kok',
              onClick: () => {
                setDisplay({
                    loading: 'block',
                    button: 'none'
                })
                axios.delete(`${window.env.API_URL}post/delete/${val._id}`)
                        .then(res => {
                            console.log(res.data)
                            setDisplay({
                                loading: 'none',
                                button: 'block'
                            })
                            history.push('/home')
                            homeDispatch({type: 'REFRESH'});
                        })
                        .catch(err => {
                            console.log(err.response)
                        })
              }
            },
            {
              label: 'Yauda deh gajadi',
              onClick: () => console.log('Asik')
            }
          ]
        });
      };

    return (
        <Card className="mb-2 p-2 shadow-sm">
            <Card.Header className="d-flex">
                <Image style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }} className="rounded-circle me-2" variant="top" src={val.user.image} />
                <span>
                    <small>{val.user.nama}</small>
                    <Link className="text-decoration-none" to={{pathname: `/home/${val.user.username}`}}><small className="text-secondary"> @{val.user.username}</small></Link> 
                    <br />
                    <small className="text-secondary">{moment(val.createdAt).fromNow(true)}
                    </small>
                </span>
            </Card.Header>
            <Card.Body className="d-flex flex-column">
                {modalHandler ?
                <>
                    {userState.userId === val.user._id || userState.role === "2" ?
                        <div class="d-flex mb-3">
                            <Button onClick={deletePost} type="button" variant="danger" style={{ display: display.button }} className="btn-sm rounded-pill text-light" >Delete</Button>
                            <Button className="btn-sm rounded-pill text-light" variant="danger" style={{ display: display.loading }} disabled>
                                <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                />
                                Loading...
                            </Button>
                        </div>
                    :
                        ''
                    }
                </>
                :
                    ''
                }
                <Card.Text>
                        {`${val.body}`}
                </Card.Text>
                {val.image ? 
                    <Image src={val.image} style={{ width: '200px', objectFit: 'cover', objectPosition: 'center' }}/>
                :
                    ''
                }
            </Card.Body>
            <Card.Footer>
                {modalHandler ?
                <Card.Text className="text-secondary" onClick={modalHandler} style={{cursor: 'pointer'}}>
                    Comment Here
                </Card.Text>
                :
                <Link className="text-decoration-none text-dark" to={{pathname: `/home/detail/${val._id}${Date.now()}`}}>
                    <Card.Text className="text-secondary">
                        Leave Comment
                    </Card.Text>
                </Link>
                }
            </Card.Footer>
        </Card>
    )
}

export default CardPost
