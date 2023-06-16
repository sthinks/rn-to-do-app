import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
