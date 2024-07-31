// store.ts
import { create } from 'zustand';

interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority?: 'Low' | 'Medium' | 'Urgent';
    deadline?: string;
    time?: Date;
}

interface Column {
    name: string;
    items: Task[];
}

interface Columns {
    [key: string]: Column;
}

interface UserStore {
    username: string;
    setUsername: (username: string) => void;
    tasks: Columns;
    setTasks: (tasks: Columns) => void;
    userId: string;
    setUserId: (userId: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    username: '',
    setUsername: (username: string) => set({ username }),
    tasks: {
        todo: { name: "To-Do", items: [] },
        inProgress: { name: "In Progress", items: [] },
        underReview: { name: "Under Review", items: [] },
        completed: { name: "Completed", items: [] },
    },
    setTasks: (tasks: Columns) => set({ tasks }),
    userId: '',
    setUserId: (userId: string) => set({ userId })
}));
