import React, { useState } from 'react'
import Marquee from 'react-fast-marquee'
import CardWelcome from './CardWelcome'

const MarqueeComponent = () => {
    const marqueeStyle = {display: 'flex', alignItems: 'top'}
    return (
        <Marquee style={marqueeStyle} gradient={false} speed={70} pauseOnHover={true}>
            <CardWelcome
                icon={<img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" alt="" />} 
                title="MongoDB" 
                body="MongoDB adalah salah satu jenis database NoSQL yang cukup populer digunakan dalam pengembangan website. Berbeda dengan database jenis SQL yang menyimpan data menggunakan relasi tabel, MongoDB menggunakan dokumen dengan format JSON." 
            /> 
            <CardWelcome
                icon={<img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg
                " alt="" />} 
                title="ExpressJS" 
                body="Express JS adalah framework dari NodeJS yang dirancang secara fleksibel dan sederhana untuk membantu tahap pengembangan aplikasi back end. " 
            />
            <CardWelcome
                icon={<img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg
                " alt="" />}  
                title="ReactJS" 
                body="ReactJS adalah JavaScript Library yang dikembangkan oleh Jordan Walke sekitar tahun 2013. Saat itu, Walke merupakan seorang developer untuk Facebook. Saat ini, ReactJS digunakan sebagai salah satu framework untuk membuat bagian front-end dari sebuah aplikasi. "
            />
            <CardWelcome
                icon={<img src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" alt="" />}   
                title="NodeJS" 
                body="Node.js adalah runtime environment untuk JavaScript yang bersifat open-source dan cross-platform. Dengan Node.js kita dapat menjalankan kode JavaScript di mana pun, tidak hanya terbatas pada lingkungan browser." 
            />
        </Marquee>
    )
}

export default MarqueeComponent
