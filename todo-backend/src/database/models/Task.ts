import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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

const Task = mongoose.model('Task', TaskSchema);

export default Task;
