import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { userLogin } from '../../redux/actions'
import { FaSignInAlt } from "react-icons/fa"
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import image from "../../assets/images/logo.png"

export default function Login() {
    const Userlogin = {
        email: "",
        password: ""
    };
    const [userData, setUserData] = useState(
        Userlogin
    );

    const [error, setError] = useState({
        emailErr: "",
        passwordErr: "",
    })

    const user = useSelector((state) => state.login.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChange = (e) => {
        setUserData((userData) => ({
            ...userData,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = userData;
        const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            email
        );
        if (email === "") {
            setError({ emailErr: " Email is Required " });
        } else if (!emailCheck) {
            setError({ emailErr: " Enter a valid Email" });
        } else if (password === "") {
            setError({ passwordErr: "password is required  " });
        } else if (password.length < 6) {
            setError({
                passwordErr: "password  must contain  six characters ",
            });
        } else {
            const result = await dispatch(userLogin(userData))

            if (result.login) {
                navigate('/');
            }
        }
    };
    return (
        <div className="h-100 gradient-form mt-5" style={{ backgroundcolor: "#eee" }}>
            <div className="container h-60">
                <div className="row d-flex justify-content-center align-items-center h-50">
                    <div className="col-xl-5">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div >
                                    <div className="card-body p-md-5 mx-md-4" style={{height: "450px"}}>

                                        <div className="text-center">
                                            <img src={image}
                                                style={{ width: "80px", height: "60px" }} alt="logo"></img>
                                            <h4 className="mt-1 pb-1">Welcome to Lms</h4>
                                        </div>

                                        <form>
                                            <p>Please register to create account</p>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    id="form2Example11"
                                                    className="form-control"
                                                    placeholder="Email address"
                                                    name='email'
                                                    value={userData.email}
                                                    onChange={onChange} />
                                                {error && error.emailErr ? (
                                                    <p style={{ color: "#e50e0e", fontSize: "12px" }}>
                                                        {" "}
                                                        {error.emailErr}{" "}
                                                    </p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password"
                                                    id="form2Example22"
                                                    className="form-control"
                                                    placeholder='Password'
                                                    name='password'
                                                    value={userData.password}
                                                    onChange={onChange} />
                                                {error && error.passwordErr ? (
                                                    <p style={{ color: "#e50e0e", fontSize: "12px" }}>
                                                        {" "}
                                                        {error.passwordErr}{" "}
                                                    </p>
                                                ) : (
                                                    ""
                                                )}

                                            </div>

                                            <div className="text-center pt-1 pb-1">
                                                <button className="btn btn-outline-primary"
                                                    type="button"
                                                    onClick={handleSubmit}>
                                                    <FaSignInAlt />LOGIN</button>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">Don't have an account?</p>
                                                <Link to='/register' className="btn btn-outline-primary">SignUp</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




