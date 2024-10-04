import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const navigate = useNavigate()
    const [emailId, setEmailId] = useState("balia@gmail.com")
    const [password, setPassword] = useState("Balia@123");
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            }, { withCredentials: true });
            // console.log(res.data);
            dispatch(addUser(res.data));
            navigate("/")
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
        }
    };
    
    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input type="text" placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input type="text" placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </label>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login