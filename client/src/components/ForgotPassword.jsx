import React from 'react'
import {Toaster} from 'react-hot-toast'

import styles from '../styles/username.module.css';

const ForgotPassword = () => {
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

        <form className='pt-20' >
          <div className="textbox flex flex-col items-center gap-6">
            <div className="input text-center">
            <span className='py-4 text-sm text-left text-gray-800'>
            An email containing your OTP to reset your password will be sent to you 
            </span>
            <input type="password" placeholder='Enter your email' className={styles.textbox} />
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