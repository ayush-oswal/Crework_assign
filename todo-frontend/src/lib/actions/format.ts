

interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority?: 'Low' | 'Medium' | 'Urgent';
    deadline?: string;
    time?: Date
}

interface Column {
    name: string;
    items: Task[];
}

interface Columns {
    [key: string]: Column;
}

export const formatTodosToColumns = (todos: Task[]): Columns => {
    const columns: Columns = {
        todo: {
            name: "To-Do",
            items: [],
        },
        inProgress: {
            name: "In Progress",
            items: [],
        },
        underReview: {
            name: "Under Review",
            items: [],
        },
        completed: {
            name: "Completed",
            items: [],
        },
    };

    todos.forEach(todo => {
        switch (todo.status) {
            case 'todo':
                columns.todo.items.push(todo);
                break;
            case 'inProgress':
                columns.inProgress.items.push(todo);
                break;
            case 'underReview':
                columns.underReview.items.push(todo);
                break;
            case 'completed':
                columns.completed.items.push(todo);
                break;
            default:
                break;
        }
    });

    return columns;
};