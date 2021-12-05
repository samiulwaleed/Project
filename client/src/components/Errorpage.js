import React from 'react'
import { NavLink } from 'react-router-dom'

const Errorpage = () => {
    return (
        <div>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>

                    </div>
                    <h2>we are sorry, pae not found !!</h2>
                    <p className="mb-5">
                    The page you are looking for might have removed had it's name changed or it's temporaryly unavailable

                    </p>
                    <NavLink to="/" >Back to Homepage</NavLink>

                </div>
            </div>
        </div>
    )
}

export default Errorpage
