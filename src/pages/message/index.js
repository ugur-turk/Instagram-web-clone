import { getMessageBoxes, getUser } from '../../firebase.js'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
import { useSelector } from 'react-redux'
import Image from '../../components/image.js'


export default function DirectLayout() {
    const user = useSelector(state => state.auth.user)
    const result = getMessageBoxes();
    //console.log(result)

    const [messageBoxes,setMessageBoxes] = useState([]);
    
    useEffect(() => {
        getMessageBoxes().then(el=>{
            setMessageBoxes(el)
           
        })
    }, [])

    if(messageBoxes.length > 0) {
      messageBoxes.forEach(element => {
            console.log(element.members)
      });
    }
       
   
   
   
    const inboxs = [
        {
            id:1,
            url:"pf1.jpg",
            name:"Yasemin",
            message:"Lorem ipsum dolor sit amet,"
        },
        {
            id:2,
            url:"pf2.jpg",
            name:"Merve",
            message:"At lectus urna duis convallis. "
        },
        {
            id:3,
            url:"pf3.jpg",
            name:"Eda",
            message:" Id nibh tortor id aliquet lectus proin nibh."
        },
    ]
    




    return (
        <div className=' flex relative


          max-w-[935px] max-h-[590px] bg-white border rounded border-gray-300 '>
            <Helmet>
                <title>Inbox</title>
            </Helmet>
            <div className='flex-auto min-w-4/10 max-w-4/10'>
                <Header user={user.username}></Header>
                {inboxs.map( x => (
                
                
                <div  key={x.id} className='px-4 pt-4 flex flex-col-2 gap-x-4 cursor-pointer hover:bg-gray-50 transition-all'>
                    
                    <div  >
                        <Image className="w-14 h-14 rounded-full" url={x.url}></Image>
                    </div>
                    <div className='pt-3' >
                        <h1 className='font-normal text-sm'>{x.name}</h1>
                        <p className='text-gray-400 text-sm font-light'>{x.message}</p>
                    </div>
                </div>
                
               ) )}

            </div>
            <div className='border-l flex-auto min-w-6/10 max-w-6/10 h-[590px]'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
