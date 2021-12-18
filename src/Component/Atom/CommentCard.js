import React from 'react'
import { Card, Image } from 'react-bootstrap'

const CommentCard = ({val}) => {
    return (
        <>
            <Card className="mb-2 p-2 shadow-sm" border="warning">
                <Card.Body className="d-flex">
                    <Image style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }} className="rounded-circle me-2" variant="top" src={val.user.image} />
                    <Card.Text>
                            <b className="text-mute">{val.user.nama}</b><span className='text-mute'>@{val.user.username}</span> <br />
                            {`${val.body}`}
                    </Card.Text>
                    {/* {val.image ? 
                        <Image src={val.image} style={{ width: '200px', objectFit: 'cover', objectPosition: 'center' }}/>
                    :
                        ''
                    } */}
                </Card.Body>
            </Card>
        </>
    )
}

export default CommentCard
