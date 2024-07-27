"use client"

import { useUserStore } from '@/store'
import React from 'react'
import { ModeToggle } from './ui/modeToggle';
import { CalendarIcon, DoubleArrowDownIcon, MagnifyingGlassIcon, Share1Icon, StarIcon } from '@radix-ui/react-icons';

const Header = () => {
    const {username} = useUserStore();
  return (
    <div className='p-2 bg-gray-200 dark:bg-slate-600 flex flex-col gap-3 justify-between'>
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
                    Image1
                </div>
                <div className='flex flex-col gap-1 max-w-72'>
                    <div className='font-semibold text-gray-600 dark:text-gray-300'>
                        Title
                    </div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ipsam veritatis totam odio dolorum provident beatae voluptate! Earum.
                    </div>
                </div>
            </div>
            <div className='flex gap-4 items-center justify-center  bg-white p-2 rounded-md dark:bg-gray-500'>
                <div>
                    Image2
                </div>
                <div className='flex flex-col gap-1 max-w-72'>
                    <div className='font-semibold text-gray-600 dark:text-gray-300'>
                        Title
                    </div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ipsam veritatis totam odio dolorum provident beatae voluptate! Earum.
                    </div>
                </div>
            </div>
            <div className='flex gap-4 items-center justify-center  bg-white p-2 rounded-md dark:bg-gray-500'>
                <div>
                    Image3
                </div>
                <div className='flex flex-col gap-1 max-w-72'>
                    <div className='font-semibold text-gray-600 dark:text-gray-300'>
                        Title
                    </div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ipsam veritatis totam odio dolorum provident beatae voluptate! Earum.
                    </div>
                </div>
            </div>
        </div>
        <div className='flex items-center justify-between'>
            <div className='relative'>
                <input placeholder='Search' className='outline-none border-none rounded-md p-1 pr-7 pl-2 dark:bg-gray-500' type="text" />
                <div className='absolute top-2 right-3'><MagnifyingGlassIcon /></div>
            </div>
            <div className='flex gap-5 items-center'>
                <div className='flex items-center gap-1'><CalendarIcon className='h-5 w-5'/> Calendar View</div>
                <div className='flex items-center gap-1'><StarIcon className='h-5 w-5'/>Automation</div>
                <div className='flex items-center gap-1'><DoubleArrowDownIcon className='h-5 w-5' /> Fliter</div>
                <div className='flex items-center gap-1'><Share1Icon className='h-5 w-5' />Share</div>
                <div><button className=' text-white p-2 pr-4 pl-4 rounded-md bg-blue-900 hover:bg-blue-800'>Create New +</button></div>
            </div>
        </div>
    </div>
  )
}

export default Header