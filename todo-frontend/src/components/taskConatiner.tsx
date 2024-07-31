"use client"

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './ui/taskCard';
import CreateTaskDialog from './ui/createTaskDialog';
import { useUserStore } from '@/store';
import { formatTodosToColumns } from '@/lib/actions/format';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const TaskContainer = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [currentColumn, setCurrentColumn] = useState<string>('todo');
    const { tasks, setTasks, userId } = useUserStore();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${BASE_URL}/task/getTasks/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }

                const tasksFromBackend = await response.json();
                setTasks(formatTodosToColumns(tasksFromBackend));
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        if (userId) {
            fetchTasks();
        }
    }, [userId]);

    const AddNew = (columnId: string) => {
        console.log(columnId);
        setCurrentColumn(columnId);
        setIsDialogOpen(true);
    };

    const onDragEnd = async (result: any) => {
        const { source, destination } = result;

        if (!destination) return;
        
        const sourceColumn = tasks[source.droppableId];
        const destColumn = tasks[destination.droppableId];
        if (sourceColumn === destColumn) return;

        const currTasks = { ...tasks };

        const sourceItems = [...sourceColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        removed.status = destination.droppableId;
        const destItems = [...destColumn.items];
        destItems.splice(destination.index, 0, removed);

        const updatedTasks = {
            ...tasks,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        };

        setTasks(updatedTasks);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/task/editStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: removed.id, userId, status: removed.status })
            });
    
            if (!response.ok) {
                throw new Error('Failed to update task status');
            }
        } catch (error) {
            console.error('Error updating task status:', error);
            setTasks(currTasks);
        }
    };

    return (
        <div className="flex justify-center gap-4 p-4 h-full w-full">
            <CreateTaskDialog
                isOpen={isDialogOpen}
                onClose={() => { setIsDialogOpen(false); }}
                columnStatus={currentColumn}
            />
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.entries(tasks).map(([columnId, column]) => {
                    return (
                        <div className="flex flex-col items-center gap-2 w-1/4 h-full" key={columnId}>
                            <div className="text-lg w-full pl-2 pr-2 text-gray-600 dark:text-white flex justify-between items-center">
                                <div>{column.name}</div>
                                <div><HamburgerMenuIcon /></div>
                            </div>
                            <div className="w-full">
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided: any, snapshot: any) => {
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
                                                            {(provided: any, snapshot: any) => {
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
                                                                            time={item.time}
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
                            <div className='min-w-full flex items-center justify-center'>
                                <button onClick={() => AddNew(columnId)} className='bg-blue-900 w-full p-1 pl-2 pr-2 rounded-md text-white hover:bg-blue-800'>Add New +</button>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
}

export default TaskContainer;
