import React from 'react'
import image from "../../assets/images/Fidget-spinner.gif"
import "../loader/loader.css"
export default function Loader() {
  return (
    <div className="loader">
      <img src={image} />
    </div>
  )
}
