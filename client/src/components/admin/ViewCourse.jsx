import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCourse } from '../../redux/actions/courseAction'
import { FaTrash, FaEdit } from "react-icons/fa"
import { deleteCourse } from '../../redux/actions/courseAction'
import { Link } from 'react-router-dom'
import Loader from '../loader/Loader'
export default function ViewCourse() {
  const allCourses = useSelector((state) => state.course.courses)
  const {loading} = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const newcourses = Array.from(allCourses)
  useEffect(() => {
    dispatch(getAllCourse())
  }, [])
  return (
    <div style={{ overflowX: 'auto', fontSize: '14px' }}>
      {loading ? <Loader /> :
        <center><br /><br /><br />
          <table className='container table table-striped table-dark' >
            <thead>
              <tr>
                <th scope='col'>Title</th>
                <th scope='col'>Video</th>
                <th scope='col'>Image</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                newcourses && newcourses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.title}</td>
                    <td>{course.video}</td>
                    <td><img src={course.file} height={30}/></td>
                    <td>
                      <a className="text-danger mr-2"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you really want to delete " + course.title
                          )
                          if (confirmBox === true) {
                            dispatch(deleteCourse(course._id))
                            dispatch(getAllCourse())
                          }
                        }}> <i><FaTrash /></i> </a>
                      <Link to={`/editcourse/${course._id}`} state={{ course: course }}>
                        <i><FaEdit /></i>
                      </Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </center>
      }
    </div>
  )
}
