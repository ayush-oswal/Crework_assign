import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CreateNew } from '@/lib/actions/crud';
import { v4 as uuidv4 } from 'uuid';

interface CreateTaskDialogProps {
    isOpen: boolean;
    onClose: () => void;
    columnStatus?: string;
}

interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority?: 'Low' | 'Medium' | 'Urgent';
    deadline?: string;
    time?: Date;
}

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({ isOpen, onClose, columnStatus }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(columnStatus || "todo");
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'Urgent' | ''>('');
    const [deadline, setDeadline] = useState('');

    useEffect(() => {
        setStatus(columnStatus || "todo");
    }, [columnStatus]);

    const handleSubmit = () => {
        if(title==='' || status ===''){
            alert("Title or status cannot be empty")
            return;
        }
        const newTask: Task = {
            id: uuidv4(),
            title,
            description,
            status,
            priority: priority || undefined,
            deadline: deadline || undefined,
            time: new Date
        };
        console.log(newTask)
        CreateNew(newTask);
        setTitle('')
        setDescription('')
        setPriority('')
        setDeadline('')
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>Fill out the details below to create a new task.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    {!columnStatus && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="todo">To-Do</option>
                            <option value="inProgress">In Progress</option>
                            <option value="underReview">Under Review</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'Urgent')}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        >   
                            <option value=''>No priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deadline</label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 dark:bg-black rounded-md">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateTaskDialog;
