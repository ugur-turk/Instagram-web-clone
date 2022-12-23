import React, { useEffect, useRef, useState } from 'react'
import { GrFacebook } from 'react-icons/gr';
import Input from '../components/Input';
import { useNavigate, useLocation , Link } from 'react-router-dom';
import { login } from '../firebase.js';
import { Formik, Form } from 'formik';
import { LoginSchema } from '../validation';
import Button from '../components/Button';
import Separator from '../components/Separator';

export default function Login() {

  const navigate = useNavigate()
  const location = useLocation()

  const ref = useRef()
  useEffect(() => {
    let images = ref.current.querySelectorAll('img'),
      total = images.length,
      current = 0

    const imageSlider = () => {
      images[(current > 0 ? current : total) - 1].classList.add('opacity-0')
      images[current].classList.remove('opacity-0')
      current = current === total - 1 ? 0 : current + 1;
    }

    imageSlider()
    let interval = setInterval(imageSlider, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [ref])

  

  const handleSubmit = async (values,actions) => {
    const response =  await login(values.username,values.password)
    if(response){
      navigate(location.state?.return_url || '/', {
        replace: true
      })
    }
    
  }

  return (
    <div className='h-full w-full flex gap-x-8 items-center justify-center'>
      <div className='hidden md:block w-[380px] h-[581px] bg-logo-patter relative bg-[length:468.32px_634.15px] bg-[top_left_-46px]' >
        <div className='w-[250px] h-[538px] absolute top-[27px] right-[18px]' ref={ref}>
          <img alt='' className=' w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear' src={require('../assets/1.png')}></img>
          <img alt='' className=' w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear' src={require('../assets/2.png')}></img>
          <img alt='' className=' w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear' src={require('../assets/3.png')}></img>
          <img alt='' className=' w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear' src={require('../assets/4.png')}></img>
        </div>
      </div>
      <div className='grid gap-y-4'>
        <div className='w-[350px] bg-white grid gap-y-6 rounded  border px-[50px] pt-8 pb-2'>
          <a href='#' className='flex justify-center'>
            <img className='h-[51px]' src={require('../assets/logo1.png')} alt=''></img>
          </a>
          <Formik
            validationSchema={LoginSchema}
            initialValues={{
              username: '',
              password: ''

            }}

            onSubmit={handleSubmit}
          >
            {({ isSubmitting,values, isValid,dirty }) => (
              <Form className='grid gap-y-2'>
                <Input  name="username"  label="Phone number, username or email" />
                <Input  type="password" name="password"  label="Password" />
                <Button type='submit' disabled={!isValid || !dirty || isSubmitting}>Log In</Button>
                <Separator></Separator>
                <a href='#' className=' cursor-pointer flex justify-center items-center gap-x-2 text-sm font-semibold text-facebook'>
                  <GrFacebook size={20} />
                  Log in with Facebook
                </a>
                <a href='#' className=' cursor-pointer flex items-center justify-center text-xs text-gray-700'>
                  Did you forget your password?
                </a>
              </Form>
            )}

          </Formik>


        </div>
        <div className='w-full h-14 rounded  bg-white border flex items-center justify-center text-sm'>
          Don't have an a account?<Link to='/auth/register' className='text-facebook font pl-2 cursor-pointer font-semibold'>Register</Link>
        </div>
        <div className=' flex items-center justify-center text-sm'>
          Download the application.

        </div>
        <div className='flex justify-center items-center gap-x-2 cursor-pointer'>
          <img alt='' className='h-[40px] w-[130px]' src={require('../assets/googlelogo.png')}></img>
          <img alt='' className='h-[40px] w-[120px]' src={require('../assets/microsoftlogo.png')}></img>
        </div>
      </div>
    </div>
  );
}
