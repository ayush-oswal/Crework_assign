"use client"

import { useUserStore } from '@/store'
import React, { useState } from 'react'
import { ModeToggle } from './ui/modeToggle';
import { CalendarIcon, DoubleArrowDownIcon, MagnifyingGlassIcon, Share1Icon, StarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import CreateTaskDialog from './ui/createTaskDialog';

const Header = () => {
    const {username} = useUserStore();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <div className='p-2 flex flex-col gap-3 justify-between'>
        <CreateTaskDialog 
            isOpen={isDialogOpen}
            onClose={()=>{setIsDialogOpen(false)}}
        />
        <div className='flex items-center justify-between'>
          <div className='text-3xl font-semibold'>
            Hello, {username}!
          </div>
          <div>
            Help & feedback ? &nbsp;&nbsp;&nbsp;
            <ModeToggle />
          </div>
        </div>
        <div className='flex gap-3 items-center justify-between'>
            <div className='flex gap-4 items-center justify-center bg-white p-2 rounded-md dark:bg-gray-500'>
                <div>
                    <Image src='/I1.png' alt='img1' width={100} height={100} className='rounded-sm' />
                </div>
                <div className='flex flex-col gap-1 max-w-72'>
                    <div className='font-semibold text-gray-600 dark:text-gray-300'>
                        Introducing tags
                    </div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient. 
                    </div>
                </div>
            </div>
            <div className='flex gap-4 items-center justify-center  bg-white p-2 rounded-md dark:bg-gray-500'>
                <div>
                <Image src='/I2.png' alt='img2' width={100} height={100} className='rounded-sm' />
                </div>
                <div className='flex flex-col gap-1 max-w-72'>
                    <div className='font-semibold text-gray-600 dark:text-gray-300'>
                        Share Notes Instantly
                    </div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Effortlessly share your notes with others via email or link. Enhance Collaboration with quick sharing options.
                    </div>
                </div>
            </div>
            <div className='flex gap-4 items-center justify-center  bg-white p-2 rounded-md dark:bg-gray-500'>
                <div>
                <Image src='/I3.png' alt='img3' width={100} height={100} className='rounded-sm' />
                </div>
                <div className='flex flex-col gap-1 max-w-72'>
                    <div className='font-semibold text-gray-600 dark:text-gray-300'>
                        Access Anywhere
                    </div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Sync your notes accross all devices. Stay productive wether you're on your phone, tablet or computer. 
                    </div>
                </div>
            </div>
        </div>
        <div className='flex items-center justify-between'>
            <div className='relative'>
                <input placeholder='Search' className='outline-none border-none rounded-md p-1 pr-7 pl-2 dark:bg-gray-500' type="text" />
                <div className='absolute top-2 right-3'><MagnifyingGlassIcon /></div>
            </div>
            <div className='flex gap-5 items-center text-gray-500 dark:text-gray-400'>
                <div className='flex items-center gap-1'><CalendarIcon className='h-5 w-5'/> Calendar View</div>
                <div className='flex items-center gap-1'><StarIcon className='h-5 w-5'/>Automation</div>
                <div className='flex items-center gap-1'><DoubleArrowDownIcon className='h-5 w-5' /> Fliter</div>
                <div className='flex items-center gap-1'><Share1Icon className='h-5 w-5' />Share</div>
                <div><button onClick={()=>setIsDialogOpen(true)} className=' text-white p-2 pr-4 pl-4 rounded-md bg-blue-900 hover:bg-blue-800'>Create New +</button></div>
            </div>
        </div>
    </div>
  )
}

export default Header