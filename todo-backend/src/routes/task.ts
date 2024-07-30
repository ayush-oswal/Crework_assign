import express from "express"
import { getTasks, createTask, editTask, deleteTask, editStatus } from "../controllers/task"

const Router = express.Router()

Router.get('/getTasks/:userId',getTasks)

Router.post('/create',createTask)

Router.post('/edit',editTask)

Router.post('/delete',deleteTask)

Router.post('/editStatus',editStatus)

export default Router