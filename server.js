require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Backend is working!"
    });
});

// Get all tasks
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching tasks"
        });
    }
});

// Add a task
app.post("/api/tasks", async (req, res) => {
    try {
        const newTask = new Task({
            name: req.body.name
        });

        const savedTask = await newTask.save();

        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({
            message: "Error adding task"
        });
    }
});

// Start server
app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});

