import React, {useRef, useState } from 'react'
import './addCourse.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { toastOptions } from '../../utils/Util';
//const apiEnd = 'http://localhost:8001/addcourse';

export default function AddCourse() {
    const allCourses = useSelector((state) => state.course.courses);
    const ref = useRef();
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [video, setVideo] = useState("");
    const [file, setFile] = useState("");


    const onChange = e => {
        setFile(e.target.files[0]);
    }

    const addCourse = {
        title,
        content,
        video,
    }
    const [error, setError] = useState({
        titleErr: "",
        contentErr: "",
        videoErr: "",
    });

    const handleSubmit = (e) => {
        if (title === "") {
            setError({ titleErr: "title is required" });
        } else if (content === "") {
            setError({ contentErr: " content is Required " });
        } else if (content.length < 10) {
            setError({ contentErr: " content must have ten characters " });
        } else if (video === "") {
            setError({ videoErr: " video is Required " });
        }
        else {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("video", video);
            formData.append("image", file)

            setTitle("");
            setContent("");
            setVideo("");
            e.preventDefault();
            dispatch(fetchCourse(formData))
            ref.current.value="";
        }
    };

    const fetchCourse = (formData, _id) => {
        return async () => {
            try {
                const token = localStorage.getItem("Token")
                const response = await axios.post('/addcourse/create', formData, {
                    headers: {
                        authorization: token,
                    }
                });
                toast.success('Successfully Added', toastOptions);
                return { create: true }
            }
            catch (error) {
                toast.error(error.response?.data, toastOptions);
                return { create: false }
            }
        }
    }
    return (
        <div className="h-500 gradient-form" style={{ backgroundcolor: "#eee" }}>
            <div className="container py-2 h-60">
                <div className="row d-flex justify-content-center align-items-center h-50">
                    <div className="col-xl-5">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div>
                                    <div className="card-body p-md-5 mx-md-4">
                                        <form>
                                            <p>Add Course</p>
                                            <div className="form-outline mb-4">
                                                <input
                                                    id='form2Example10'
                                                    className='form-control'
                                                    type='text'
                                                    placeholder='Title'
                                                    name='title'
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                                {error && error.titleErr ? (
                                                    <p style={{ color: "red", fontSize: "12px" }}> {error.titleErr} </p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <textarea
                                                    type="textarea"
                                                    id="form2Example11"
                                                    className="form-control"
                                                    placeholder="Content"
                                                    name='content'
                                                    value={content}
                                                    onChange={(e) => setContent(e.target.value)}
                                                />
                                                {error && error.contentErr ? (
                                                    <p style={{ color: "red", fontSize: "12px" }}> {error.contentErr} </p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    id="form2Example22"
                                                    className="form-control"
                                                    placeholder='video'
                                                    name='video'
                                                    value={video}
                                                    onChange={(e) => setVideo(e.target.value)}
                                                />
                                                {error && error.videoErr ? (
                                                    <p style={{ color: "red", fontSize: "12px" }}> {error.videoErr} </p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="file"
                                                    id="form2Example32"
                                                    className='form-control'
                                                    name='file'
                                                    ref={ref}
                                                    filename="image"
                                                    onChange={onChange}
                                                />
                                            </div>

                                            <div className="text-center pt-1  pb-1">
                                                <button className="btn btn-outline-primary"
                                                    type="button"
                                                    onClick={handleSubmit} encType="multipart/form-data">
                                                    Create
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
