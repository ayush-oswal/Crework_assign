"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_1 = require("../controllers/task");
const Router = express_1.default.Router();
Router.get('/getTasks/:userId', task_1.getTasks);
Router.post('/create', task_1.createTask);
Router.post('/edit', task_1.editTask);
Router.post('/delete', task_1.deleteTask);
Router.post('/editStatus', task_1.editStatus);
exports.default = Router;
