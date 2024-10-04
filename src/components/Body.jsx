import React from 'react'

import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import NavBar from './NavBar'


const Body = () => {
    return (
        <div>
            <NavBar />
            {/* Any children route of body will render over here */}
            <Outlet />
            <Footer/>
        </div>
    )
}

export default Body