import Task from "../database/models/Task";
import { Request, Response } from "express";
import ConnectDB from "../database";

export const getTasks = async(req:Request,res:Response) => {
    try {
        await ConnectDB();
        const { userId } = req.params;
        const userTasks = await Task.findOne({ userId });
      if (!userTasks) {
        return res.status(404).json({ message: "Tasks not found" });
      }
      return res.status(200).json(userTasks.tasks);
    } 
    catch (error) {
        return res.status(500).json({ message: "Error fetching tasks", error });
    }
}

export const createTask = async(req:Request,res:Response) => {
    try {
        await ConnectDB();
        const { userId, id, title, description, status, priority, deadline } = req.body;
        const newTask = {
          id,
          title,
          description,
          status,
          priority: priority || undefined,
          deadline: deadline || undefined,
        };
  
        const userTasks = await Task.findOne({ userId });
        if (!userTasks) {
          const newTaskDocument = new Task({
            userId,
            tasks: [newTask]
          });
          await newTaskDocument.save();
        } else {
          userTasks.tasks.push(newTask);
          await userTasks.save();
        }
  
        return res.status(201).json(newTask);
    } 
    catch (error) {
        return res.status(500).json({ message: "Error creating task", error });
    }
}

export const editTask = async(req:Request,res:Response) => {
    try {
        await ConnectDB()
        const { userId, id, title, description, status, priority, deadline, time } = req.body;
        const userTasks = await Task.findOne({ userId });
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
  
        await userTasks.save();
        return res.status(200).json(task);
    } 
    catch (error) {
        return res.status(500).json({ message: "Error editing task", error });
    }
}

export const deleteTask = async(req:Request,res:Response) => {
    try {
        const { userId, id } = req.body;
  
        const userTasks = await Task.findOne({ userId });
        if (!userTasks) {
          return res.status(404).json({ message: "User tasks not found" });
        }
  
        const taskIndex = userTasks.tasks.findIndex((task) => task.id === id);
        if (taskIndex === -1) {
          return res.status(404).json({ message: "Task not found" });
        }
  
        userTasks.tasks.splice(taskIndex, 1);
        await userTasks.save();
  
        return res.status(200).json({ message: "Task deleted successfully" });
    } 
    catch (error) {
        return res.status(500).json({ message: "Error deleting task", error });
    }
}

export const editStatus = async(req:Request,res:Response) => {
  try{
    const {id, userId, status} = req.body;

    const userTasks = await Task.findOne({ userId });
    if (!userTasks) {
      return res.status(404).json({ message: "User tasks not found" });
    }

    const task = userTasks.tasks.find((task) => task.id === id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.status = status;
    await userTasks.save();
    return res.status(200).json(task);
  }
  catch(error){
    return res.status(500).json({ message: "Error updating status task", error });
  } 
}