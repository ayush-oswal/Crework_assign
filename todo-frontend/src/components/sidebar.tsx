"use client"

import React, { useState } from 'react'
import { BellIcon, DoubleArrowRightIcon, DownloadIcon, GearIcon, GridIcon, HomeIcon, PersonIcon, SunIcon, TextAlignLeftIcon } from '@radix-ui/react-icons'
import { useUserStore } from '@/store'
import CreateTaskDialog from './ui/createTaskDialog';
import { useTheme } from "next-themes"

const Sidebar = () => {
    const {username, setUsername, setUserId, setTasks} = useUserStore();
    const { setTheme } = useTheme()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const Logout = () => {
        setUsername("")
        setUserId("")
        setTasks({
            todo: { name: "To-Do", items: [] },
            inProgress: { name: "In Progress", items: [] },
            underReview: { name: "Under Review", items: [] },
            completed: { name: "Completed", items: [] },
        })
        setTheme("light")
    }
  return (
    <div className='bg-white dark:bg-slate-700 flex flex-col items-start justify-between gap-2 h-full w-full p-2 pt-8 pb-8'>
        <CreateTaskDialog 
            isOpen={isDialogOpen}
            onClose={()=>{setIsDialogOpen(false)}}
        />
        <div className='flex flex-col items-start gap-2 w-full'>
        <div className='flex items-start'>
            <PersonIcon className='h-5 w-5'/> &nbsp;&nbsp;&nbsp;&nbsp;
            <div>{username}</div>
        </div>
        <div className='w-full flex items-center justify-between gap-5'>
            <div className='flex items-center justify-between gap-4'>
            <BellIcon className='h-5 w-5' />
            <SunIcon className='h-5 w-5' />
            <DoubleArrowRightIcon className='h-5 w-5' />
            </div>
            <div>
                <button onClick={Logout} className='p-2 pr-4 pl-4 rounded-md bg-gray-300 dark:bg-gray-500'>Logout</button>
            </div>
        </div>
        <div className='flex flex-col gap-2 mt-8'>
            <div className='w-full flex gap-3 items-center hover:bg-gray-400 hover:cursor-pointer pr-28 p-2 rounded-md'><HomeIcon className='h-5 w-5'/>Home</div>
            <div className='flex gap-3 items-center  hover:bg-gray-400 hover:cursor-pointer pr-28 p-2 rounded-md'><GridIcon className='h-5 w-5' />Boards</div>
            <div className='flex gap-3 items-center  hover:bg-gray-400 hover:cursor-pointer pr-28 p-2 rounded-md'><GearIcon className='h-5 w-5' />Setting</div>
            <div className='flex gap-3 items-center  hover:bg-gray-400 hover:cursor-pointer pr-28 p-2 rounded-md'><PersonIcon className='h-5 w-5' />Teams</div>
            <div className='flex gap-3 items-center  hover:bg-gray-400 hover:cursor-pointer pr-28 p-2 rounded-md'><TextAlignLeftIcon className='h-5 w-5' />Analytics</div>
        </div>
        <div className='w-full'>
            <button onClick={()=>setIsDialogOpen(true)} className='w-full bg-blue-900 p-2 pr-4 pl-4 rounded-md text-white hover:bg-blue-800'>Create New +</button>
        </div>
        </div>
        <div className='flex gap-2 items-center p-2 bg-gray-300 dark:bg-gray-500 rounded-md'>
            <DownloadIcon className='h-7 w-7' />
            <div className='w-full flex flex-col gap-2 pr-5'>
                <div className='text-gray-700 dark:text-gray-200'>Download the app!</div>
                <div className='text-gray-500 text-sm dark:text-gray-300'>Get the full experience</div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar