"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tasks: [
        {
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: false
            },
            status: {
                type: String,
                enum: ['todo', 'inProgress', 'underReview', 'completed'],
                required: true
            },
            priority: {
                type: String,
                enum: ['Low', 'Medium', 'Urgent'],
                required: false
            },
            deadline: {
                type: Date,
                required: false
            },
            time: {
                type: Date,
                default: Date.now
            }
        }
    ]
});
const Task = mongoose_1.default.model('Task', TaskSchema);
exports.default = Task;
