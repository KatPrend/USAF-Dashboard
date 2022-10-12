import React from "react";
import { Card } from "react-bootstrap"

const CardGeneric = (props) => {
    return (
        <Card className='card'>
            <Card.Header className="text-center cardHead">{props.Header}</Card.Header>
            <Card.Body>
                <Card.Text>
                    {props.Body}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export {CardGeneric};