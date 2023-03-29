import React from 'react'
import {Link} from 'react-router-dom'
import avatar from '../assets/profile.png'
import {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {passwordValidate} from '../helper/validate';

import styles from '../styles/username.module.css';

const Password = () => {

  const formik = useFormik({
    initialValues:{
      password:''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async(values) => {
      console.log(values)
    }
  })

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}/>
      <div className="flex justify-center flex-col items-center  h-screen">
        <div className={styles.glass} >

        <div className="title flex flex-col items-center">
          <h4 className="text-3xl font-bold">Hello Again!</h4>
          <span className="text-xl py-2 text-gray-700 text-center w-[90%]">
            Explore more by connecting with us.
          </span>
        </div>

        <form className='py-1' onSubmit={formik.handleSubmit} >
          <div className="profile flex justify-center py-4">
            <img src={avatar} alt="avatar" className={styles.profile_img} />
          </div>

          <div className="textbox flex flex-col items-center gap-6">
            <input {...formik.getFieldProps('password')} type="password" placeholder='Enter password!' className={styles.textbox} />
            <button className={styles.btn} type='submit'>Sign In</button>
          </div>

          <div className="text-center py-4">
            <span>Forgot password? <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
          </div>
        </form>

        </div>
      </div>
    </div>
  )
}

export default Password