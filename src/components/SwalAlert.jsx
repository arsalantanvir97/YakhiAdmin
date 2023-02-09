import React from 'react'
import Swal from 'sweetalert2'

const SwalAlert = (type,title,msg) => {
  // console.log('type,title,msg',type,title,msg)
  return (
    Swal.fire({
        icon:type,
        title: title,
        text: msg,
        showConfirmButton: false,
        timer: 1500
      })
  )
}

export default SwalAlert