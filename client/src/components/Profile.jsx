import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import avatar from '../assets/profile.png'
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {profileValidate} from '../helper/validate';
import convertToBase64 from '../helper/convert';
/** new features */
import useFetch from '../hooks/fetchHook'
import { updateUser } from '../helper/helper'

import styles from '../styles/username.module.css';
import extend from '../styles/profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/userSlice'

const Profile = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [file, setFile] = useState()

  const {user} = useSelector((state) => state.auth)

  /** fetch an image from backend */
  const [{apiData, serverError}] =  useFetch()
  console.log(apiData.rest)

  const onLogOut = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  },[user,navigate])
  

  const formik = useFormik({
    initialValues:{
      firstName: apiData.rest?.firstName || '',
      lastName: apiData.rest?.lastName || '',
      email: apiData.rest?.email || '',
      mobile: apiData.rest?.mobile || '',
      address: apiData.rest?.address || ''
    },
    enableReinitialize: true,
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async(values) => {
      values = await Object.assign(values, {profile : file || apiData.rest?.profile || ''});
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Updated successfully</b>,
        error: <b>Could not Update!</b>
      })
      console.log("Run")
    }
  })
  /** formik doesn't support file upload so we need to create this handler */
  const onUpload = async(e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64)
  }

  if(serverError) return <h1 className='text.xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}/>
      <div className="flex justify-center flex-col items-center  h-screen">
        <div className={`${styles.glass} ${extend.glass}`} style={{width: '45%'}} >

        <div className="title flex flex-col items-center">
          <h4 className="text-3xl font-bold">Profile</h4>
          <span className="text-xl py-2 text-gray-700 text-center w-[90%]">
            You can update your details {apiData.rest?.username || ""}
          </span>
        </div>

        <form className='py-1' onSubmit={formik.handleSubmit} >
          <div className="profile flex justify-center py-4">
            <label htmlFor="profile">
            <img src={ apiData.rest?.profile ||file || avatar} alt="avatar" className={`${styles.profile_img} ${extend.profile_img}`} />
            </label>
            {/* id should be same with the htmlFor property in the label */}
            <input type="file" id='profile' name='profile' onChange={onUpload} />
          </div>

          <div className="textbox flex flex-col items-center gap-6">

            <div className="name flex w-3/4 gap-10">
            <input {...formik.getFieldProps('firstName')} type="text" placeholder='Enter First Name*' className={`${styles.textbox} ${extend.textbox}`} />
            <input {...formik.getFieldProps('lastName')} type="text" placeholder='Enter Last Name*' className={`${styles.textbox} ${extend.textbox}`} />
            </div>

            <div className="name flex w-3/4 gap-10">
            <input {...formik.getFieldProps('mobile')} type='phone' placeholder='Enter phone number*' className={`${styles.textbox} ${extend.textbox}`} />
            <input {...formik.getFieldProps('email')} type="text" placeholder='Enter email*' className={`${styles.textbox} ${extend.textbox}`} />
            </div>
            <input {...formik.getFieldProps('address')} type='text' placeholder='Address*' className={`${styles.textbox} ${extend.textbox}`} />
            <button className={styles.btn} type='submit'>Update profile</button>

          </div>

          <div className="text-center py-4">
            <span>Come back later! <button className='text-red-500' onClick={onLogOut} >Log out</button></span>
          </div>
        </form>

        </div>
      </div>
    </div>
  )
}

export default Profile