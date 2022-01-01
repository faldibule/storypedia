import React from 'react'
import { Link } from 'react-router-dom'
import WIMG from '../../Images/svg/w2.svg'

const DarkSection = () => {
    return (
        <div className="row justify-content-center mb-5">
            <div className='p-5 col-md-7 text-light'>
                <img src={WIMG} alt="aa" className='img-fluid' />
            </div>
            <div className='col-md-5 text-light p-5'>
                <br />
                <br />
                <br />
                <h2 className='fw-bold mb-3'>Apa Itu Storypedia?</h2>
                <p className='lh-base text-secondary text-justify' style={{textIndent: '50px', textAlign: 'justify'}}> Storypedia adalah Website sederhana yang dibuat menggunakan Full Stack JavaScript, yaitu M E R N Stack. Website ini saya buat secara <b><i>Solo Player</i>.</b>  Di Web ini, kamu bisa memposting ceritamu, foto, dan kamu juga bisa berkomentar di cerita orang lain. Selain itu, tujuan lainnya ialah untuk mengukur pemahaman diri saya terhadap teknologi yang dipakai dan agar tidak terjebak di dalam <b><i>Tutorial Hell.</i></b></p>
                <div className='d-flex align-items-center'>
                    <Link to="/register" className='text-decoration-none d-inline badge bg-warning text-light p-3 rounded-pill'>
                        Daftar Disini!
                    </Link>
                    <p className='text-light mt-2 mx-3'><i>atau</i></p>
                    <Link to="/login" className='text-decoration-none d-inline badge bg-warning text-light p-3 rounded-pill'>
                        Login Disini!
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default DarkSection
