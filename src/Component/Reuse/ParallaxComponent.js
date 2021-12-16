import React from 'react'
import { Parallax } from 'react-parallax'

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
            strength={500} 
            bgImage={props.image} 
            bgImageAlt="the cat" 
            style={{width: '100vw', objectFit: 'cover', objectPosition: 'center'}}
            className='img-fluid'
        >
            <div style={{height: 500}}>
                <div style={styleText}>
                    <p className='text-light display-1'>{props.header}</p>
                    <p className='text-secondary display-6'>{props.body}</p>
                
                </div>
            </div>
        </Parallax>
    )
}

export default ParallaxComponent
