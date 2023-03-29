import React from 'react'
import {Toaster} from 'react-hot-toast'

import styles from '../styles/username.module.css';

const Recovery = () => {

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}/>
      <div className="flex justify-center flex-col items-center  h-screen">
        <div className={styles.glass} >

        <div className="title flex flex-col items-center">
          <h4 className="text-3xl font-bold">Recover password</h4>
          <span className="text-xl py-2 text-gray-700 text-center w-[90%]">
            Enter OTP to recover password
          </span>
        </div>

        <form className='pt-20' >
          <div className="textbox flex flex-col items-center gap-6">
            <div className="input text-center">
            <span className='py-4 text-sm text-left text-gray-800'>
              Enter 6 digit OTP sent to your email address
            </span>
            <input type="password" placeholder='OTP' className={styles.textbox} />
            </div>
            <button className={styles.btn} type='submit'>Recover</button>
          </div>

          <div className="text-center py-4">
            <span className='text-gray-600'>Can't get OTP? <button className='text-red-500'>Resend</button></span>
          </div>
        </form>

        </div>
      </div>
    </div>
  )
}

export default Recovery