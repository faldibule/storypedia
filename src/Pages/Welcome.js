import React, { useEffect, useState } from 'react'
import { Parallax, Background } from 'react-parallax'
import CardWelcome from '../Component/Reuse/CardWelcome'
import ParallaxComponent from '../Component/Reuse/ParallaxComponent'
import JumboImg from '../Images/other/2.jpg'
import MernImg from '../Images/other/mern.jpeg'

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
                <img className='img-fluid' style={{width: '100%', height: '300px', objectFit: 'cover', objectPosition: 'center'}} src={MernImg} alt="mern Stack" />
                <hr />
                <div className="row">
                    <CardWelcome 
                        title="MongoDB" 
                        body="MongoDB adalah salah satu jenis database NoSQL yang cukup populer digunakan dalam pengembangan website. Berbeda dengan database jenis SQL yang menyimpan data menggunakan relasi tabel, MongoDB menggunakan dokumen dengan format JSON. 
                        Hal inilah yang dianggap membuat pengelolaan data menggunakan MongoDB lebih baik. Alhasil, banyak perusahaan besar seperti Adobe, Google dan ebay yang menggunakannya. " 
                    />
                    <CardWelcome 
                        title="ExpressJS" 
                        body="Express JS adalah framework dari NodeJS yang dirancang secara fleksibel dan sederhana untuk membantu tahap pengembangan aplikasi back end. Express JS juga sangat berbeda dengan framework Laravel, dimana library ini memberikan kebebasan bagi para developer untuk mendesain aplikasi, sehingga memungkinan bagi setiap pengembang memiliki rancangan arsitektur yang berbeda dalam software yang dibangun" 
                    />
                    <CardWelcome 
                        title="ReactJS" 
                        body="ReactJS adalah JavaScript Library yang dikembangkan oleh Jordan Walke sekitar tahun 2013. Saat itu, Walke merupakan seorang developer untuk Facebook. Saat ini, ReactJS digunakan sebagai salah satu framework untuk membuat bagian front-end dari sebuah aplikasi. Dilansir dari laman resminya, ReactJS diklaim membantumu membuat UI interaktif dengan mudah.
                        ReactJS akan secara efisien memperbarui dan merender komponen yang tepat saat datamu berubah."
                    />
                    <CardWelcome 
                        title="NodeJS" 
                        body="Node.js adalah runtime environment untuk JavaScript yang bersifat open-source dan cross-platform. Dengan Node.js kita dapat menjalankan kode JavaScript di mana pun, tidak hanya terbatas pada lingkungan browser.Node.js menjalankan V8 JavaScript engine (yang juga merupakan inti dari Google Chrome) di luar browser. Ini memungkinkan Node.js memiliki performa yang tinggi." 
                    />
                
                </div>
            </div>


            <div style={{height: 500}}>

            </div>
             
        </div>
    )
}

export default Welcome
