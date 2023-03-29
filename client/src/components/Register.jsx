import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import avatar from '../assets/profile.png'
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {registerValidate} from '../helper/validate';
import convertToBase64 from '../helper/convert';

import styles from '../styles/username.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../features/auth/userSlice'
import Spinner from './Spinner';

const Register = () => {

  /*************************************************************************** */

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);





  /************************************************************************* */

  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues:{
      email: "",
      username:"",
      password: ""
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async(values) => {
      values = await Object.assign(values, {profile : file || ''})
      let registerPromise = dispatch(register(values));
      toast.promise(registerPromise, {
        loading: 'Loading...',
        success: <b>Registration successful...</b>,
        error: <b>Registration failed</b>
      })
    }
  })


  /** formik doesn't support file upload so we need to create this handler */
  const onUpload = async(e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64)
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}/>
      <div className="flex justify-center flex-col items-center  h-screen">
        <div className={styles.glass} style={{width: '45%'}} >

        <div className="title flex flex-col items-center">
          <h4 className="text-3xl font-bold">Register!</h4>
          <span className="text-xl py-2 text-gray-700 text-center w-[90%]">
            Happy to join us!
          </span>
        </div>

        <form className='py-1' onSubmit={formik.handleSubmit} >
          <div className="profile flex justify-center py-4">
            <label htmlFor="profile">
            <img src={file || avatar} alt="avatar" className={styles.profile_img} />
            </label>
            {/* id should be same with the htmlFor property in the label */}
            <input type="file" id='profile' name='profile' onChange={onUpload} />
          </div>

          <div className="textbox flex flex-col items-center gap-6">
            <input {...formik.getFieldProps('username')} type="text" placeholder='Enter username*' className={styles.textbox} name='username'  />
            <input {...formik.getFieldProps('email')} type="text" placeholder='Enter email*' className={styles.textbox} name='email' />
            <input {...formik.getFieldProps('password')} type="password" placeholder='Enter password*' className={styles.textbox} name='password' />
            <button className={styles.btn} type='submit'>Register</button>
          </div>

          <div className="text-center py-4">
            <span>Already registered? <Link className='text-red-500' to="/">Login Now</Link></span>
          </div>
        </form>

        </div>
      </div>
    </div>
  )
}

export default Register