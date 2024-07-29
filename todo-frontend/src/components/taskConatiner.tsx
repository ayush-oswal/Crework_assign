"use client"

import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd' 
import TaskCard from './ui/taskCard';
import CreateTaskDialog from './ui/createTaskDialog';

interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority?: 'Low' | 'Medium' | 'Urgent';
    deadline?: string;
  }
  
  interface Column {
    name: string;
    items: Task[];
  }
  
  interface Columns {
    [key: string]: Column;
  }
  
  const columnsFromBackend: Columns = {
    todo: {
      name: "To-Do",
      items: [
        { id: 'task-1', title: 'Task 1', status: 'todo', priority: 'Low', description: 'Prepare the project proposal.', deadline: '22-07-2003' },
        { id: 'task-2', title: 'Task 2', status: 'todo', priority: 'Medium', description: 'Review the design mockups.', deadline: '29-07-2006' },
      ]
    },
    inProgress: {
      name: "In Progress",
      items: [
        { id: 'task-3', title: 'Task 3', status: 'inProgress', priority: 'Urgent', description: 'Fix the critical bug in the application.', deadline: '22-07-2024' },
        { id: 'task-6', title: 'Task 6', status: 'inProgress', priority: 'Medium', description: 'Implement the new authentication flow.', deadline: '29-07-2024' }
      ]
    },
    underReview: {
      name: "Under Review",
      items: [
        { id: 'task-4', title: 'Task 4', status: 'underReview', priority: 'Low', description: 'Check the code review comments.', deadline: '29-07-2035' },
      ]
    },
    completed: {
      name: "Completed",
      items: [
        { id: 'task-5', title: 'Task 5', status: 'completed', priority: 'Medium', description: 'Deploy the latest version to production.', deadline: '13-06-2019' },
      ]
    }
  };

export const CreateNew = (newTask : Task) => {
    if (columnsFromBackend[newTask.status]) {
        columnsFromBackend[newTask.status].items.unshift(newTask);
    }
}

export const onEdit = (updatedTask: Task) => {
  const { status, id } = updatedTask;
  if (columnsFromBackend[status]) {
    const column = columnsFromBackend[status];
    const taskIndex = column.items.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      column.items[taskIndex] = updatedTask;
    }
  }
};

export const onDelete = (status: string, id: string) => {
  if (columnsFromBackend[status]) {
    const column = columnsFromBackend[status];
    const taskIndex = column.items.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      column.items.splice(taskIndex, 1);
    }
  }
};

const TaskConatiner = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [currentColumn, setCurrentColumn] = useState<string>('todo');

  useEffect(()=>{
    setColumns(columnsFromBackend)
  },[columnsFromBackend])


  const AddNew = (columnId: string) => {
    console.log(columnId)
    setCurrentColumn(columnId);
    setIsDialogOpen(true);
  }

  const onDragEnd = async (result : any) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    if(sourceColumn===destColumn) return;
    const sourceItems = [...sourceColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    const destItems = [...destColumn.items];
    destItems.splice(destination.index, 0, removed);

    const updatedColumns = {
        ...columns,
        [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems
        },
        [destination.droppableId]: {
            ...destColumn,
            items: destItems
        }
    };

    setColumns(updatedColumns);
  };
  return (
    <div className="flex justify-center gap-4 p-4 h-full w-full">
        <CreateTaskDialog 
            isOpen={isDialogOpen}
            onClose={()=>{setIsDialogOpen(false)}}
            onSubmit={CreateNew}
            columnStatus={currentColumn}
        />
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.entries(columns).map(([columnId, column]) => {
                    return (
                        <div className="flex flex-col items-center gap-2 w-1/4 h-full" key={columnId}>
                            <div className="text-lg text-gray-600 dark:text-white">{column.name}</div>
                            <div className='min-w-full flex items-center justify-center'>
                                  <button onClick={()=>AddNew(columnId)} className='bg-blue-900 p-1 pl-2 pr-2 rounded-md text-white hover:bg-blue-800'>Add New +</button>
                            </div>
                            <div className="w-full h-full">
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided:any, snapshot:any) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={`p-2 max-h-80 overflow-y-scroll no-scrollbar transition-colors rounded-md flex flex-col gap-2 ${
                                                    snapshot.isDraggingOver ? 'bg-blue-200' : 'bg-white dark:bg-slate-700'
                                                }`}
                                            >
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided:any, snapshot:any) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className='select-none p-1 bg-gray-100 dark:bg-slate-800 rounded-md' >
                                                                        <TaskCard 
                                                                            id={item.id}
                                                                            title={item.title}
                                                                            description={item.description}
                                                                            status={item.status}
                                                                            priority={item.priority}
                                                                            deadline={item.deadline}
                                                                        />
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
  )
}

export default TaskConatiner