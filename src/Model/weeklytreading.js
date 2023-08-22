import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }

);

export default models.Task || model("Task", TaskSchema);