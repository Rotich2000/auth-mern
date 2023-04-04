import React from 'react'
import {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
/** get email from our store */

import styles from '../styles/username.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUsername } from '../features/auth/usernameSlice';
import { usernameValidate} from '../helper/validate';

const ForgotPassword = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
 

  const formik = useFormik({
    initialValues:{
      username:'',
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async(values) => {
      dispatch(setUsername(values.username));
      navigate("/recovery")    
    }
  })

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}/>
      <div className="flex justify-center flex-col items-center  h-screen">
        <div className={styles.glass} >

        <div className="title flex flex-col items-center">
          <h4 className="text-3xl font-bold">Forgot Password? 🥶</h4>
          <span className="text-xl py-2 text-gray-700 text-center w-[90%]">
            Enter email to recover password 😊
          </span>
        </div>

        <form className='pt-20' onSubmit={formik.handleSubmit} >
          <div className="textbox flex flex-col items-center gap-6">
            <div className="input text-center">
            <span className='py-4 text-sm text-left text-gray-800'>
            An email containing your OTP to reset your password will be sent to you 
            </span>
            <input type="username" {...formik.getFieldProps('username')} placeholder='Enter username!' className={styles.textbox} />
            </div>
            <button className={styles.btn} type='submit'>Submit</button>
          </div>
        </form>

        </div>
      </div>
    </div>
  )
}

export default ForgotPassword