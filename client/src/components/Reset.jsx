import React from 'react'
import {Toaster, toast} from 'react-hot-toast'
import {useFormik} from 'formik'
import {resetPasswordValidate} from '../helper/validate';
import { resetPassword } from '../helper/helper';


import styles from '../styles/username.module.css';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetchHook';


const Reset = () => {

  const navigate = useNavigate()
  const {username} = useSelector(state => state.username)

  const [{serverError,status}] = useFetch('createResetSession')

  const formik = useFormik({
    initialValues:{
      password:'',
      confirm_pwd: '',
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async(values) => {
      let resetPromise = resetPassword({username, password: values.password })
      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Password reset Successfully...!</b>,
        error: <b>Could not reset...!</b>
      });

      resetPromise.then(function(){navigate("/")})
    }
  })

  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to="/" replace={true} ></Navigate>

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}/>
      <div className="flex justify-center flex-col items-center  h-screen">
        <div className={styles.glass} style={{width: "50%"}} >

        <div className="title flex flex-col items-center">
          <h4 className="text-3xl font-bold">Reset password</h4>
          <span className="text-xl py-2 text-gray-700 text-center w-[90%]">
            Enter new password
          </span>
        </div>

        <form className='pt-20' onSubmit={formik.handleSubmit} >

          <div className="textbox flex flex-col items-center gap-6">
            <input {...formik.getFieldProps('password')} type="password" placeholder='New password!' className={styles.textbox} />
            <input {...formik.getFieldProps('confirm_pwd')} type="password" placeholder='Confirm password!' className={styles.textbox} />
            <button className={styles.btn} type='submit'>Sign In</button>
          </div>
        </form>

        </div>
      </div>
    </div>
  )
}

export default Reset