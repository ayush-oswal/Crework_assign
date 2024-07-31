import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { onEdit } from '@/lib/actions/crud';

interface EditTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: 'Low' | 'Medium' | 'Urgent';
  deadline?: string;
  time?:Date;
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({ isOpen, onClose, task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'Urgent' | ''>(task.priority || '');
  const [deadline, setDeadline] = useState(task.deadline || '');


  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority || '');
      setDeadline(task.deadline || '');
    }
  }, [task]);

  const handleSubmit = () => {
    if (title === '') {
      alert("Title cannot be empty");
      return;
    }
    const updatedTask: Task = {
      ...task,
      title,
      description,
      priority: priority || undefined,
      deadline: deadline || undefined,
      time: new Date()
    };
    setTitle('')
    setDescription('')
    setPriority('')
    setDeadline('')
    onEdit(updatedTask);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update the details below to edit the task.</DialogDescription>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'Urgent')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Priority</option>
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
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md">Update</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
