"use client"

import { ClockIcon, CrossCircledIcon, Pencil1Icon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import EditTaskDialog from './editTaskDialog';
import { onDelete } from '@/lib/actions/crud';
import timeAgo from '@/lib/actions/timeAgo';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: 'Low' | 'Medium' | 'Urgent';
  deadline?: string;
  time?: Date;
}

const background = new Map<string, string>([
  ["Low", "bg-green-500"],
  ["Medium", "bg-yellow-500"],
  ["Urgent", "bg-red-500"]
]);

const formatDate = (dateString:string) => {
  const datePart = dateString.split('T')[0];
  const [year, month, day] = datePart.split('-');
  return `${day}/${month}/${year}`;
};

const TaskCard: React.FC<Task> = ({ id, title, description, status, priority, deadline, time}) => {
  const bg = priority ? background.get(priority) : 'bg-gray-500';
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const currtask : Task = {
    id,
    title,
    description,
    status,
    priority,
    deadline,
    time
  }
  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDialogOpen(true)
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    if(confirm("are you sure you want to proceed ?")){
      onDelete(status,id)
    }
    else return;
  };

  return (
    <div className='p-2 rounded-md flex flex-col gap-2'>
      <EditTaskDialog 
        isOpen={isDialogOpen}
        onClose={()=>setIsDialogOpen(false)}
        task={currtask}
      />
      <div className='flex items-center justify-between'>
        <div className="text-gray-800 dark:text-gray-200">{title}</div>
        <div className='flex gap-1'>
          <button
            onClick={(event) => { handleEdit(event)}}
          >
            <Pencil1Icon />
          </button>
          <button
            onClick={(event) => { handleDelete(event)}}          
            >
            <CrossCircledIcon />
          </button>
        </div>
      </div>
      <div>
      {description && <div className="text-sm text-gray-700 dark:text-gray-400">{description}</div>}
      </div>
      <div>
      {priority && <div className={`text-sm text-white p-1 pl-2 pr-2 ${bg} rounded-md w-fit`}>{priority}</div>}
      </div>
      <div>
      {deadline && <div className="text-sm flex gap-1 items-center"><ClockIcon /> <span className='text-blue-500'>{formatDate(deadline)}</span></div>}
      </div>
      <div>
      {time && <div className="text-sm text-gray-500">{timeAgo(new Date(time))}</div>}
      </div>
    </div>
  );
}

export default TaskCard;
