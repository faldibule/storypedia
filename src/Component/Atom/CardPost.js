import React from 'react'
import { Card, Image } from 'react-bootstrap'
import moment from 'moment'
import { Link } from 'react-router-dom'
moment.updateLocale('id', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s  : "%d s",
        m:  "%d m",
        h:  "%d h",
        d:  "%d d",
        w:  "%d w",
        M:  "%d n",
        y:  "%d y"
    }
});
const CardPost = ({val}) => {
    return (
        <Card className="mb-2 p-2 shadow-sm">
            <Card.Header className="d-flex">
                <Image style={{ width: '50px', objectFit: 'cover', objectPosition: 'center' }} className="rounded-circle me-2" variant="top" src={val.user.image} />
                <span>
                    <small>{val.user.nama}</small>
                    <small className="text-secondary"> @{val.user.username}</small> 
                    <br />
                    <small className="text-secondary">{moment(val.createdAt).fromNow(true)}
                    </small>
                </span>
            </Card.Header>
            <Card.Body className="d-flex flex-column">
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
                <Link className="text-decoration-none text-dark" to={{pathname: `/home/detail/${val._id}${Date.now()}`}}>
                    <Card.Text className="text-secondary">
                        Leave Comment
                    </Card.Text>
                </Link>
            </Card.Footer>
        </Card>
    )
}

export default CardPost
