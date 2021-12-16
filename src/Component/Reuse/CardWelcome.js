import React, { useEffect } from "react";

const CardWelcome = ({title, body, icon}) => {

    return (
        <div className="col-md-3 d-flex align-items-start">
            <div>
                <h2>{icon} <span className='text-warning'>{title.substring(0, 1)}</span>{title.substr(1, title.length)}</h2>
                <p>{body}</p>
            </div>
        </div>
    )
}

export default CardWelcome
