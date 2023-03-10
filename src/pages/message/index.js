import { getUserDetailByUid, returntools, testGetMessageboxByMessageBoxid, testGetMessageSubscriptionsByUid, } from '../../firebase.js'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { NavLink, Outlet } from 'react-router-dom'
import Header from './components/header'
import { useSelector } from 'react-redux'
import { getDatabase, ref, set, child, push, onChildAdded, onChildChanged, onChildRemoved, update, get, onValue } from "firebase/database";



export default function DirectLayout() {
    const [re, setRe] = useState([]);
    const user = useSelector(state => state.auth.user)
    const result = []
    const msRef = ref(returntools(), `messagesubscriptions/${user.uid}`)

    useEffect(() => {
        const getMessaboxes = () => {
            const unsub1 = onChildAdded(msRef, async (snapshot) => {
                const data = snapshot.val()
                data.forEach(elm => {
                    //console.log(elm)


                    get(child(ref(returntools()), `messageboxes/${elm}`)).then((snapshot) => {
                        const messageboxres = snapshot.val()
                        messageboxres.members.forEach(member => {
                            if (member.userId == user.uid) {
                                return
                            } else {
                                const res = getUserDetailByUid(member.userId);

                                res.then(e => {
                                    let messageBox = {}
                                    messageBox = {
                                        messageboxid: elm,
                                        formationTime: messageboxres.formationtime,
                                        fullName: e.full_name,
                                        profileImage: e.profileImage,
                                        lastMessage: messageboxres.lastMessage
                                    }
                                    //console.log(messageBox)

                                    setRe((currentRe) => [...currentRe, messageBox])



                                })


                            }
                        })
                    })

                })

            });


            const unsub2 = onChildChanged(msRef, (snapshot) => {

                const data = snapshot.val()
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];

                    // if(re.find(({messageboxid})=> messageboxid === "alRBkCWovM66HLvjOGEO") === undefined){
                    //     console.log(true)
                    // }
                    //console.log(re.find(({messageboxid})=> messageboxid === element))

                    // if(re.find(({messageboxid})=> messageboxid === element) === undefined){
                    //     console.log("ok")
                    // }

                    get(child(ref(returntools()), `messageboxes/${element}`)).then((snapshot) => {
                        const messageboxres = snapshot.val()
                        messageboxres.members.forEach(member => {
                            if (member.userId == user.uid) {
                                return
                            } else {
                                const res = getUserDetailByUid(member.userId);
                                //console.log(res)
                                res.then(e => {
                                    let messageBox = {}

                                    messageBox = {
                                        messageboxid: element,
                                        formationTime: messageboxres.formationtime,
                                        fullName: e.full_name,
                                        profileImage: e.profileImage,
                                        lastMessage: messageboxres.lastMessage
                                    }
                                    setRe((currentRe)=> [ ... currentRe.filter(res=>res.messageboxid !== element) ,messageBox])

                                })


                            }
                        })
                    })



                }


            });


            return () => {
                unsub1();
                unsub2();
            };

        };

        user.uid && getMessaboxes();

    }, [])

    return (
        <div className=' flex relative


          max-w-[935px] max-h-[590px] bg-white border rounded border-gray-300 '>
            <Helmet>
                <title>Inbox</title>
            </Helmet>
            <div className='flex-auto min-w-4/10 max-w-4/10'>
                <Header user={user.username}></Header>
                {re?.map(x => (


                    <NavLink key={x.messageboxid} to={`/direct/t/${x.messageboxid}`} className='px-4 pt-4 flex flex-col-2 gap-x-4 cursor-pointer hover:bg-gray-50 transition-all'>
                        <div  >
                            <img className="w-16 h-16 rounded-full" src={x.profileImage}></img>
                        </div>
                        <div className='pt-2' >
                            <h1 className='font-medium text-black  text-base'>{x.fullName}</h1>
                            {x.lastMessage && <p className='text-gray-400 text-sm  -mt-4  font-light'>{x.lastMessage}</p>}
                        </div>
                    </NavLink>

                ))}

            </div>
            <div className='border-l flex-auto min-w-6/10 max-w-6/10 h-[590px]'>
                <Outlet ></Outlet>
            </div>
        </div>
    )
}
