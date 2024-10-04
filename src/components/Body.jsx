import React, { useEffect } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import NavBar from './NavBar'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'


const Body = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const userData = useSelector((store) => store.user)
    const fetchUser = async () => {
        if (userData) return;
        try {
            const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true })
            dispatch(addUser(res.data))
        } catch (error) {
            if (error.status === 401) {
                Navigate("/login")
            }
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div>
            <NavBar />
            {/* Any children route of body will render over here */}
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body