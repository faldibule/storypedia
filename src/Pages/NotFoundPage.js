import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'
import NotFoundImage from '../Images/svg/404.svg'

const NotFoundPage = () => {
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Image src={NotFoundImage} fluid />
                    <h2 className="text-muted text-center">Page Not Found</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFoundPage
