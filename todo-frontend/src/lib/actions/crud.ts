"use client"

import { useUserStore } from "@/store";

interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority?: 'Low' | 'Medium' | 'Urgent';
    deadline?: string;
    time?: Date;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const CreateNew = async (newTask: Task) => {
    const { tasks, setTasks, userId } = useUserStore.getState();

    // Save current tasks state
    const currTasks = { ...tasks };

    // Optimistic update
    const optimisticTasks = { ...tasks };
    if (optimisticTasks[newTask.status]) {
        optimisticTasks[newTask.status].items.unshift(newTask);
    }
    setTasks(optimisticTasks);
    try{
        const response = await fetch(`${BASE_URL}/task/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, ...newTask })
        });

        if (!response.ok) {
            throw new Error('Failed to create task');
        }
    }
    catch(error){
        console.error('Error creating task:', error);
        // Revert optimistic update
        setTasks(currTasks);
    }
};

export const onEdit = async (updatedTask: Task) => {
    const { tasks, setTasks, userId } = useUserStore.getState();
    const { status, id } = updatedTask;

    // Save current tasks state
    const currTasks = { ...tasks };

    // Optimistic update
    const optimisticTasks = { ...tasks };
    if (optimisticTasks[status]) {
        const column = optimisticTasks[status];
        const taskIndex = column.items.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
            column.items[taskIndex] = updatedTask;
        }
    }
    setTasks(optimisticTasks);

    try {
        const response = await fetch(`${BASE_URL}/task/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, ...updatedTask })
        });

        if (!response.ok) {
            throw new Error('Failed to edit task');
        }
    } catch (error) {
        console.error('Error editing task:', error);
        // Revert optimistic update
        setTasks(currTasks);
    }
};

export const onDelete = async (status: string, id: string) => {
    const { tasks, setTasks, userId } = useUserStore.getState();

    // Save current tasks state
    const currTasks = { ...tasks };

    // Optimistic update
    const optimisticTasks = { ...tasks };
    if (optimisticTasks[status]) {
        const column = optimisticTasks[status];
        const taskIndex = column.items.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
            column.items.splice(taskIndex, 1);
        }
    }
    setTasks(optimisticTasks);

    try {
        const response = await fetch(`${BASE_URL}/task/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, id })
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        // Revert optimistic update
        setTasks(currTasks);
    }
};
