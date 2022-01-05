import React, { useEffect, useState } from 'react'
import ParallaxComponent from '../Component/Welcome/ParallaxComponent'
import JumboImg from '../Images/other/4.jpg'
import Mid from '../Component/Welcome/Mid'
import Footer from '../Component/Welcome/Footer'
import MernSection from '../Component/Welcome/MernSection'
import DarkSection from '../Component/Welcome/DarkSection'

const Welcome = () => {
    const [parent, setParent] = useState(null)
    useEffect(() => {
        let mounted = true
        if(mounted){
            const parent = document.querySelector('.x');
            setParent(parent)
        }
        return () => mounted = false 
    }, [])

    return (
        <div className='x' style={{overflowY: 'auto', height: '100vh', width: '100vw', overflowX: 'hidden'}}>
            <div>
                <ParallaxComponent 
                    image={JumboImg}  
                    parent={document.querySelector('.x')}
                    header='Storypedia'
                    body='Tulis Cerita Kamu Disini'
                />
            </div>
            <br />
            <div className="container px-4 py-5" id="hanging-icons">

                <div className="row">
                    <Mid />
                </div>
            </div>

            <div className='mb-5 container-fluid bg-dark'>
                <DarkSection />
            </div>

            <div className='my-5'>
                <MernSection />
            </div>

            
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Welcome
