import React from 'react'
import MarqueeComponent from './MarqueeComponent'
const MernSection = () => {
    return (
        <div className="row">
            <h1 className='text-center'>
                <span className='text-success'>M </span> 
                <span className='text-secondary'>E</span> 
                <span className='text-primary'> R </span> 
                <span className='text-success'>N </span> 
                <span className='text-warning'>    S T A C K</span>

            </h1>
            
            <hr />
            <MarqueeComponent speed={70} />
        
        </div>
    )
}

export default MernSection
