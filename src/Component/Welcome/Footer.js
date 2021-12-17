import React from 'react'
import { HeartFill } from 'react-bootstrap-icons'

const Footer = () => {
    return (
        <section id="footer">
            <footer className="text-center text-white bg-warning">
                {/* <!-- Grid container --> */}
                <div className="container">
                    {/* <!-- Facebook --> */}
                    <a className="btn btn-link btn-floating btn-lg text-light m-1" href="https://web.facebook.com/faldinakmoeara"
                        role="button" data-mdb-ripple-color="dark"><img src="https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg" width="30" alt="a" /></a>

                    {/* <!-- Twitter --> */}
                    <a className="btn btn-link btn-floating btn-lg text-light m-1" href="https://twitter.com/faldibule"
                        role="button" data-mdb-ripple-color="dark"><img src="https://www.vectorlogo.zone/logos/twitter/twitter-icon.svg" width="30" alt="a" /></a>

                    {/* <!-- Instagram --> */}
                    <a className="btn btn-link btn-floating btn-lg text-light m-1" href="https://www.instagram.com/faldi.bule/"
                        role="button" data-mdb-ripple-color="dark"><img src="https://www.vectorlogo.zone/logos/instagram/instagram-icon.svg" width="30" alt="a" /></a>

                    {/* <!-- Github --> */}
                    <a className="btn btn-link btn-floating btn-lg text-light m-1" href="https://github.com/faldibule" role="button"
                        data-mdb-ripple-color="dark"><img src="https://www.vectorlogo.zone/logos/github/github-icon.svg" width="30" alt="a" /></a>
                    <p>Created with <span className='text-danger'><HeartFill size={15} /></span>  by Faldi Bule</p>
                </div>
           
             <br />
             <br />
             <br />
             <br />
            </footer>
        </section>
    )
}

export default Footer
