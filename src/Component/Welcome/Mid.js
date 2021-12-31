import React from 'react'
import JsLogo from '../../Images/svg/js.svg'

const Mid = () => {
    return (
        <section className="about py-3">
        <div className="px-4 py-4 my-5 text-center">
            <img src={JsLogo} alt='aa' style={{ width: '200px', objectFit: 'cover', objectPosition: 'center' }} />
            <h1 className="display-5 fw-bold">Fullstack <img className="d-inline" src="https://www.vectorlogo.zone/logos/javascript/javascript-horizontal.svg" alt="javascript online logo for website" /> Website</h1>
            <div className="col-lg-6 mx-auto">
            <p className="lead mb-4 font-monospace">Fullstack JavaScript Website adalah sebuah website yang dibuat menggunakan bahasa JavaScript di segala "Stack"-nya. Mulai dari Database, Backend Stack, dan Frontend Stack</p>
            </div>
        </div>
        </section>
    )
}

export default Mid
