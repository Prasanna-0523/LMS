import React, { useState } from 'react'
import "./Login.css"
import { userFetch } from '../../redux/actions';
import { FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import image from "../../assets/images/logo.png"
export default function Registration() {
    const Userregister = {
        name: "",
        email: "",
        password: ""
    };
    const [values, setValues] = useState(
        Userregister
    );
    const [error, setError] = useState({
        nameErr: "",
        emailErr: "",
        passwordErr: "",
    });

    const user = useSelector((state) => state.login.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChange = (e) => {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = values;
        const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            email
        );
        if (name === "") {
            setError({ nameErr: "name is required " });
        } else if (name.length < 3) {
            setError({ nameErr: " name must have three characters " });
        } else if (email === "") {
            setError({ emailErr: " Email is Required " });
        } else if (!emailCheck) {
            setError({ emailErr: " Enter a valid Email" });
        } else if (password === "") {
            setError({ passwordErr: "password is required  " });
        } else if (password.length < 6) {
            setError({
                passwordErr: "password  must contain  six characters ",
            });
        }
        else {
            const registerRes = await dispatch(userFetch(values))
            if (registerRes.register) {
                navigate('/login');
            }
        }
    };
    return (
        <div className="h-400 gradient-form" style={{ backgroundcolor: "#eee" }}>
            <div className="container py-2 h-60">
                <div className="row d-flex justify-content-center align-items-center h-50">
                    <div className="col-xl-5">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div>
                                    <div className="card-body h-400 p-md-5 mx-md-4">

                                        <div className="text-center">
                                            <img src={image}
                                                style={{ width: "80px", height: "65px" }} alt="logo"></img>
                                            <h4 className="mt-1 pb-1">Welcome to Lms</h4>
                                        </div>

                                        <form>
                                            <p>Please login to your account</p>
                                            <div className="form-outline mb-4">
                                                <input
                                                    id='form2Example10'
                                                    className='form-control'
                                                    type='text'
                                                    placeholder='Name'
                                                    name='name'
                                                    value={values.name}
                                                    onChange={onChange}
                                                />
                                                {error && error.nameErr ? (
                                                    <p style={{ color: "red", fontSize: "12px" }}> {error.nameErr} </p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    id="form2Example11"
                                                    className="form-control"
                                                    placeholder="Email address"
                                                    name='email'
                                                    value={values.email}
                                                    onChange={onChange}
                                                />
                                                {error && error.emailErr ? (
                                                    <p style={{ color: "red", fontSize: "12px" }}> {error.emailErr} </p>
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
                                                    value={values.password}
                                                    onChange={onChange}
                                                />
                                                {error && error.passwordErr ? (
                                                    <p style={{ color: "red", fontSize: "12px" }}>
                                                        {" "}
                                                        {error.passwordErr}{" "}
                                                    </p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>

                                            <div className="text-center pt-1  pb-1">
                                                <button className="btn btn-outline-primary"
                                                    type="button"
                                                    onClick={handleSubmit}>
                                                    <FaUser />REGISTER
                                                </button>
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
