import React from 'react'
import { Card, Image } from 'react-bootstrap'

const CommentCard = ({val}) => {
    return (
        <>
            <Image style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }} className="rounded-circle me-2" variant="top" src={val.user.image} />
            <Card.Text>
                    <b className="text-mute">{val.user.nama}</b><span className='text-mute'>@{val.user.username}</span> <br />
                    {`${val.body}`}
            </Card.Text>
            <hr />
        </>
    )
}

export default CommentCard
