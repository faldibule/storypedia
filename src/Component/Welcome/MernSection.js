import React from 'react'
import MarqueeComponent from './MarqueeComponent'
const MernSection = () => {

    return (
        <div className="row justify-content-center">
            <h1 className='text-center'>Apa itu <span className='badge bg-secondary'>M E R N</span>  Stack?</h1>
            <div className='col-md-4'>
                <p className='px-4 text-center text-secondary'>MERN adalah akronim untuk MongoDB, Express JS, React JS dan Node JS. Stack MERN adalah kombinasi dari beberapa teknologi terbsebut, semua berdasarkan JavaScript, yang digunakan untuk membangun aplikasi baik web ataupun mobile. Ini adalah kerangka kerja pengembangan stack dengan full open source yaitu :</p>

            </div>
            <hr />
            <MarqueeComponent />
        
        </div>
    )
}

export default MernSection
