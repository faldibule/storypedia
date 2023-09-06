import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import CardPost from '../../Component/Atom/CardPost';
import CommentModal from '../../Component/Atom/CommentModal';
import { useHomeDispatch, useTrackedState } from '../../Reducer/HomeReducer';

const Detail = (props) => {
    const [card, setCard] = useState([]);
    const homeDispatch = useHomeDispatch()
    const homeState = useTrackedState();
    const [postId, setPostId] = useState('')

    const [modal, setModal] = useState(false)

    const modalHandler = () =>{
        setModal(true)
    }

    useEffect(() => {
        let mounted = true;
        const raw_uuid = props.match.params.uuid;
        const uuid = raw_uuid.substring(0, 24);
        if(uuid){
            axios.post(`${window.env.API_URL}post/detail`, {
                postId: uuid
            }).then(res => {
                if(mounted){
                    homeDispatch({
                        type: 'SET_PATH',
                        payload: {
                            pathname: '/detail'
                        }
                    })
                    setCard(res.data.post)
                    setPostId(uuid)
                }
            }).catch(err => {
                // console.log(err.response)
            })
        }
        return () => {
            mounted = false
        }
    }, [])

    return (
        <div>
            {card.length > 0 ? 
                card.map(val => (
                    <div key={val._id}>
                        <CardPost modalHandler={modalHandler} val={val} />
                        {modal ? 
                        <CommentModal datapost={postId} show={modal} onHide={() => setModal(false)} />
                        :
                        ''
                        }    

                    </div>
                ))
            :
            <div className="text-center mt-5">
                <Spinner animation="border" variant="warning" size="sm" />
            </div>
            }
        </div>
    )
}

export default Detail
