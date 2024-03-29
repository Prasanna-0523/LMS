import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourse } from '../../redux/actions/courseAction'
import './AllCourse.css'
import { Link } from 'react-router-dom'
import Loader from "../loader/Loader"
export default function AllCourse() {

  const allCourses = useSelector((state) => state.course.courses)
  const {loading} = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const showCourses = Array.from(allCourses)
  useEffect(() => {
    dispatch(getAllCourse())
  }, [])

  return (
    <div>
      {loading ? <Loader /> :
        <div className="row mt-3 w-50 m-auto">
          {
            showCourses && showCourses.map((course, index) => (
              <div className="col-sm-6 mb-3" key={index}>
                <div className="card bg-dark ">
                  <div className="card-body">
                    <h5 className="card-title text-white">{course.title}</h5>
                    <Link to={`/coursecontent/${course._id}`} className="btn btn-primary">learn</Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      }
    </div>
  )
}
