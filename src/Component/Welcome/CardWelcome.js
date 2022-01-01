import React from "react";
import { Card } from "react-bootstrap";

const CardWelcome = ({title, body, icon, color}) => {

    return (
        <Card style={{ width: '20rem', height: '50vh' }} className="mx-3">
            <Card.Header>
                <h2 align="center">{icon} <span style={{ color}} >{title.substring(0, 1)}</span>{title.substr(1, title.length)}</h2>
            </Card.Header>
            <Card.Body>
                <Card.Text style={{ textAlign: 'justify', textIndent: '50px' }}>
                    {body}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardWelcome
