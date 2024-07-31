
"use client"

import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import TaskConatiner from '@/components/taskConatiner'
import { useUserStore } from '@/store'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Dashboard = () => {
  const {username} = useUserStore();
  const Router = useRouter();
  useEffect(() => {
    if (!username) {
        Router.push("/");
    }
}, [username,Router]);
  return (
    <div className='h-screen w-screen flex'>
      <div className='h-full'>
        <Sidebar />
      </div>
      <div className='h-screen flex flex-col w-screen bg-gray-200 dark:bg-slate-600'>
        <Header />
        <TaskConatiner />
      </div>
    </div>
  )
}

export default Dashboard