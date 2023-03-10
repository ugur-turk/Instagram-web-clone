import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { toast } from 'react-hot-toast'
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import Icon from '../../components/icon.js'
import { getUserInfo } from '../../firebase.js'
import Header from './components/header.js'
export default function ProfileLayout() {

    const [loading , setLoading] = useState(true)
    const [user , setUser] = useState(false)
    const {username} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getUserInfo(username)
        .then(user=> {
            setUser(user)
        })
        .catch(err=>{
            toast.error(err.code)
            navigate('/',{
                replace:true
            })
        })
    },[])

  return (
    <div className='px-28'>
        <Helmet>
        <title>{user.username}</title>
        </Helmet>
        <Header user={user}></Header>
        <nav className='border-t flex justify-center items-center gap-x-16 '>
            <NavLink to={`/${username}`} end={true} className={({isActive})=> classNames({
                "text-xs flex  py-5 border-t transition-all -mt-px tracking-widest items-center gap-x-1.5 font-semibold" :true,
                "text-[#8e8e8e] border-transparent":!isActive,
                "text-black  border-black":isActive
            })}>
                <Icon name={'posts'}></Icon>
                POSTS
            </NavLink>
            <NavLink to={`/${username}/saved`} end={true} className={({isActive})=> classNames({
                "text-xs flex  py-5 border-t transition-all -mt-px tracking-widest items-center gap-x-1.5 font-semibold" :true,
                "text-[#8e8e8e] border-transparent":!isActive,
                "text-black  border-black":isActive
            })}>
                <Icon name={'saved'}></Icon>
                SAVED
            </NavLink>
            <NavLink to={`/${username}/tagged`} end={true} className={({isActive})=> classNames({
                "text-xs flex py-5 border-t transition-all -mt-px tracking-widest items-center gap-x-1.5 font-semibold" :true,
                "text-[#8e8e8e] border-transparent":!isActive,
                "text-black border-black":isActive
            })}>
                <Icon name={'tag'}></Icon>
                TAGGED
            </NavLink>
        </nav>
        <Outlet></Outlet>
    </div>
  )
}
