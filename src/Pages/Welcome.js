import React, { useEffect, useState } from 'react'
import CardWelcome from '../Component/Welcome/CardWelcome'
import ParallaxComponent from '../Component/Welcome/ParallaxComponent'
import JumboImg from '../Images/other/5.jpg'
import Mid from '../Component/Welcome/Mid'
import Footer from '../Component/Welcome/Footer'

const Welcome = () => {
    const [parent, setParent] = useState(null)
    useEffect(() => {
        let mounted = true
        if(mounted){
            const parent = document.querySelector('.x');
            setParent(parent)
        }
        return () => mounted = false;
    }, [])

    return (
        <div className='x' style={{overflowY: 'auto', height: '100vh', width: '100vw'}}>
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

                <div className="row">
                    <h1 className='text-center'>
                        <span className='text-success'>M </span> 
                        <span className='text-secondary'>E</span> 
                        <span className='text-primary'> R </span> 
                        <span className='text-success'>N </span> 
                        <span className='text-warning'>    S T A C K</span>

                    </h1>
                    
                    <hr />
                    <CardWelcome
                        icon={<img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" alt="" />} 
                        title="MongoDB" 
                        body="MongoDB adalah salah satu jenis database NoSQL yang cukup populer digunakan dalam pengembangan website. Berbeda dengan database jenis SQL yang menyimpan data menggunakan relasi tabel, MongoDB menggunakan dokumen dengan format JSON. 
                        Hal inilah yang dianggap membuat pengelolaan data menggunakan MongoDB lebih baik. Alhasil, banyak perusahaan besar seperti Adobe, Google dan ebay yang menggunakannya. " 
                    />
                    <CardWelcome
                        icon={<img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg
                        " alt="" />} 
                        title="ExpressJS" 
                        body="Express JS adalah framework dari NodeJS yang dirancang secara fleksibel dan sederhana untuk membantu tahap pengembangan aplikasi back end. Express JS juga sangat berbeda dengan framework Laravel, dimana library ini memberikan kebebasan bagi para developer untuk mendesain aplikasi, sehingga memungkinan bagi setiap pengembang memiliki rancangan arsitektur yang berbeda dalam software yang dibangun" 
                    />
                    <CardWelcome
                        icon={<img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg
                        " alt="" />}  
                        title="ReactJS" 
                        body="ReactJS adalah JavaScript Library yang dikembangkan oleh Jordan Walke sekitar tahun 2013. Saat itu, Walke merupakan seorang developer untuk Facebook. Saat ini, ReactJS digunakan sebagai salah satu framework untuk membuat bagian front-end dari sebuah aplikasi. Dilansir dari laman resminya, ReactJS diklaim membantumu membuat UI interaktif dengan mudah.
                        ReactJS akan secara efisien memperbarui dan merender komponen yang tepat saat datamu berubah."
                    />
                    <CardWelcome
                        icon={<img src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" alt="" />}   
                        title="NodeJS" 
                        body="Node.js adalah runtime environment untuk JavaScript yang bersifat open-source dan cross-platform. Dengan Node.js kita dapat menjalankan kode JavaScript di mana pun, tidak hanya terbatas pada lingkungan browser.Node.js menjalankan V8 JavaScript engine (yang juga merupakan inti dari Google Chrome) di luar browser. Ini memungkinkan Node.js memiliki performa yang tinggi." 
                    />
                
                </div>
            </div>


            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Welcome
