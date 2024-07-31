"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editStatus = exports.deleteTask = exports.editTask = exports.createTask = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../database/models/Task"));
const database_1 = __importDefault(require("../database"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.default)();
        const { userId } = req.params;
        const userTasks = yield Task_1.default.findOne({ userId });
        if (!userTasks) {
            return res.status(404).json({ message: "Tasks not found" });
        }
        return res.status(200).json(userTasks.tasks);
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching tasks", error });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.default)();
        const { userId, id, title, description, status, priority, deadline } = req.body;
        const newTask = {
            id,
            title,
            description,
            status,
            priority: priority || undefined,
            deadline: deadline || undefined,
        };
        const userTasks = yield Task_1.default.findOne({ userId });
        if (!userTasks) {
            const newTaskDocument = new Task_1.default({
                userId,
                tasks: [newTask]
            });
            yield newTaskDocument.save();
        }
        else {
            userTasks.tasks.push(newTask);
            yield userTasks.save();
        }
        return res.status(201).json(newTask);
    }
    catch (error) {
        return res.status(500).json({ message: "Error creating task", error });
    }
});
exports.createTask = createTask;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.default)();
        const { userId, id, title, description, status, priority, deadline, time } = req.body;
        const userTasks = yield Task_1.default.findOne({ userId });
        if (!userTasks) {
            return res.status(404).json({ message: "User tasks not found" });
        }
        const task = userTasks.tasks.find((task) => task.id === id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.title = title;
        task.description = description;
        task.status = status;
        task.priority = priority;
        task.deadline = deadline;
        task.time = time;
        yield userTasks.save();
        return res.status(200).json(task);
    }
    catch (error) {
        return res.status(500).json({ message: "Error editing task", error });
    }
});
exports.editTask = editTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, id } = req.body;
        const userTasks = yield Task_1.default.findOne({ userId });
        if (!userTasks) {
            return res.status(404).json({ message: "User tasks not found" });
        }
        const taskIndex = userTasks.tasks.findIndex((task) => task.id === id);
        if (taskIndex === -1) {
            return res.status(404).json({ message: "Task not found" });
        }
        userTasks.tasks.splice(taskIndex, 1);
        yield userTasks.save();
        return res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Error deleting task", error });
    }
});
exports.deleteTask = deleteTask;
const editStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, userId, status } = req.body;
        const userTasks = yield Task_1.default.findOne({ userId });
        if (!userTasks) {
            return res.status(404).json({ message: "User tasks not found" });
        }
        const task = userTasks.tasks.find((task) => task.id === id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.status = status;
        yield userTasks.save();
        return res.status(200).json(task);
    }
    catch (error) {
        return res.status(500).json({ message: "Error updating status task", error });
    }
});
exports.editStatus = editStatus;
