import React from 'react'
import { Parallax } from 'react-parallax'
import { Link } from 'react-router-dom'

const ParallaxComponent = (props) => {
    console.log(props)
    const styleText = {
        left: '50%',
        top: '50%',
        position: 'absolute',
        padding: '20px',
        transform: 'translate(-50%, -50%)'
    }
    return (
        <Parallax 
            parent={props.parent}
            strength={400} 
            bgImage={props.image} 
            bgImageAlt="the cat" 
            style={{width: '100vw', objectFit: 'cover', objectPosition: 'center'}}
            className='img-fluid'
        >
            <div style={{height: '100vh'}}>
                <div style={styleText}>
                    <p className='text-light display-1'>{props.header}</p>
                    <Link to='/home' className='text-light text-decoration-none'>{props.body} </Link>
                
                </div>
            </div>
        </Parallax>
    )
}

export default ParallaxComponent
