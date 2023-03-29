import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import avatar from '../assets/profile.png'
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {loginValidate} from '../helper/validate';


import styles from '../styles/username.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../features/auth/userSlice'
import Spinner from './Spinner'

const Username = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/profile");
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);


  const formik = useFormik({
    initialValues:{
      username:'',
      password:''
    },
    validate: loginValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async(values) => {
      let loginPromise = dispatch(login(values));
      toast.promise(loginPromise, {
        loading: 'Loading...',
        success: <b>You're in 😊...</b>,
        error: <b>Registration failed!</b>
      })
    }
  })

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}/>
      <div className="flex justify-center flex-col items-center  h-screen">
        <div className={styles.glass} >

        <div className="title flex flex-col items-center">
          <h4 className="text-3xl font-bold">Login</h4>
          <span className="text-xl py-2 text-gray-700 text-center w-[90%]">
            Explore more by connecting with us. 💪
          </span>
        </div>

        <form className='py-1' onSubmit={formik.handleSubmit} >
          <div className="profile flex justify-center py-4">
            <img src={avatar} alt="avatar" className={styles.profile_img} />
          </div>

          <div className="textbox flex flex-col items-center gap-6">
            <input {...formik.getFieldProps('username')} type="text" placeholder='Enter username!' className={styles.textbox} />
            <input {...formik.getFieldProps('password')} type="password" placeholder='Enter password!' className={styles.textbox} />
            <button className={styles.btn} type='submit'>Sign In</button>
          </div>

          <div className="text-center pt-4">
            <span>Not a member <Link className='text-red-500' to="/register">Register Now</Link></span>
          </div>
          <div className="text-center pt-4">
            <Link to="/forgot-password" className='text-gray-600 underline cursor-pointer'>Forgot password?</Link>
          </div>
        </form>

        </div>
      </div>
    </div>
  )
}

export default Username