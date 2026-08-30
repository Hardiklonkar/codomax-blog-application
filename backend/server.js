const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home API
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "BlogSphere Backend API is running 🚀"
    });
});

// Test API
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "API connection successful!"
    });
});

// User Registration API
app.post("/api/auth/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, email and password are required"
        });
    }

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            name: name,
            email: email
        }
    });
});

// User Login API
app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
            email: email
        }
    });
});

// Create Blog API
app.post("/api/blogs", (req, res) => {
    const {
        title,
        category,
        content,
        author,
        tags,
        coverImage
    } = req.body;

    if (!title || !category || !content || !author) {
        return res.status(400).json({
            success: false,
            message: "Title, category, content and author are required"
        });
    }

    res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog: {
            title: title,
            category: category,
            content: content,
            author: author,
            tags: tags || [],
            coverImage: coverImage || ""
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`BlogSphere Backend running on http://localhost:${PORT}`);
});