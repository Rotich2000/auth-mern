import React, { useEffect, useState } from 'react'
import {Toaster, toast} from 'react-hot-toast'

import styles from '../styles/username.module.css';
import { useSelector } from 'react-redux';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

const Recovery = () => {

  const navigate = useNavigate()

  const {username} = useSelector(state => state.username)
  const [OTP, setOTP] = useState()
  useEffect(() => {
     generateOTP(username).then((OTP) => {
      console.log(OTP)
      if(OTP) return toast.success("OTP has been sent to your email")
      return toast.error("Problem while generating OTP")
     })
  },[username])

  const onSubmit = async(e) =>{
    e.preventDefault()

    try {
      let {status} = await verifyOTP({username, code: OTP})
    if(status === 201){
      toast.success("Verify Successfully")
      navigate('/reset')
    }
    } catch (error) {
      toast.error("Wrong OTP!, check email again") 
    }
  } 

  //handle of resend OTP
  function resendOTP(){
    let sendPromise = generateOTP(username)
    toast.promise(sendPromise, {
      loading: 'Sending',
      success: <b>OTP has been sent to your email!</b>,
      error: <b>Could not send it!</b>
    })
    sendPromise.then(OTP => {
      //console.log(OTP)
    })
  }

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

        <form className='pt-20' onSubmit={onSubmit} >
          <div className="textbox flex flex-col items-center gap-6">
            <div className="input text-center">
            <span className='py-4 text-sm text-left text-gray-800'>
              Enter 6 digit OTP sent to your email address
            </span>
            <input type="password" placeholder='OTP' onChange={e => setOTP(e.target.value)} className={styles.textbox} />
            </div>
            <button className={styles.btn} type='submit'>Recover</button>
          </div>
        </form>

        <div className="text-center py-4">
            <span className='text-gray-600'>Can't get OTP? <button className='text-red-500' onClick={resendOTP} >Resend</button></span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Recovery