require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 5000;

// =========================
// ENVIRONMENT CHECK
// =========================

console.log("SUPABASE URL:", process.env.SUPABASE_URL);
console.log(
    "SUPABASE KEY EXISTS:",
    !!process.env.SUPABASE_SERVICE_ROLE_KEY
);

if (
    !process.env.SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
) {
    console.error("❌ Supabase environment variables are missing.");
    process.exit(1);
}

// =========================
// SUPABASE
// =========================

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// =========================
// HOME
// =========================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "BlogSphere Backend API is running 🚀"
    });
});

// =========================
// TEST API
// =========================

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "API connection successful!"
    });
});

// =========================
// REGISTER
// =========================

app.post("/api/auth/register", async (req, res) => {
    console.log("REGISTER BODY:", req.body);

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 6 characters"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const {
            data: existingUser,
            error: checkError
        } = await supabase
            .from("users")
            .select("id")
            .eq("email", normalizedEmail)
            .maybeSingle();

        if (checkError) {
            console.error("CHECK USER ERROR:", checkError);

            return res.status(500).json({
                success: false,
                message: "Database error",
                error: checkError.message
            });
        }

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const {
            data,
            error
        } = await supabase
            .from("users")
            .insert({
                name: name.trim(),
                email: normalizedEmail,
                password: hashedPassword
            })
            .select("id, name, email")
            .single();

        if (error) {
            console.error("INSERT USER ERROR:", error);

            return res.status(500).json({
                success: false,
                message: "Database error",
                error: error.message
            });
        }

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: data
        });

    } catch (error) {
        console.error("REGISTER SERVER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// =========================
// LOGIN
// =========================

app.post("/api/auth/login", async (req, res) => {
    console.log("LOGIN BODY:", req.body);

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const {
            data,
            error
        } = await supabase
            .from("users")
            .select("id, name, email, password")
            .eq("email", normalizedEmail)
            .maybeSingle();

        if (error) {
            console.error("LOGIN DATABASE ERROR:", error);

            return res.status(500).json({
                success: false,
                message: "Login failed",
                error: error.message
            });
        }

        if (!data) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            data.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: data.id,
                name: data.name,
                email: data.email
            }
        });

    } catch (error) {
        console.error("LOGIN SERVER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// =====================================================
// CREATE BLOG
// =====================================================

app.post("/api/blogs", async (req, res) => {
    console.log("CREATE BLOG BODY:", req.body);

    try {
        const {
            title,
            category,
            content,
            author,
            tags,
            coverImage,
            readTime
        } = req.body;

        if (!title || !category || !content || !author) {
            return res.status(400).json({
                success: false,
                message:
                    "Title, category, content and author are required"
            });
        }

        const {
            data,
            error
        } = await supabase
            .from("blogs")
            .insert({
                title: title.trim(),
                category: category.trim(),
                content: content.trim(),
                author: author.trim(),
                tags: Array.isArray(tags) ? tags : [],
                cover_image: coverImage?.trim() || null,
                read_time: readTime?.trim() || null
            })
            .select()
            .single();

        if (error) {
            console.error("CREATE BLOG ERROR:", error);

            return res.status(500).json({
                success: false,
                message: "Database error",
                error: error.message
            });
        }

        return res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog: data
        });

    } catch (error) {
        console.error("CREATE BLOG SERVER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// =====================================================
// GET ALL BLOGS
// =====================================================

app.get("/api/blogs", async (req, res) => {
    try {
        const {
            data,
            error
        } = await supabase
            .from("blogs")
            .select("*")
            .order("created_at", {
                ascending: false
            });

        if (error) {
            console.error("GET BLOGS ERROR:", error);

            return res.status(500).json({
                success: false,
                message: "Database error",
                error: error.message
            });
        }

        return res.status(200).json({
            success: true,
            count: data.length,
            blogs: data
        });

    } catch (error) {
        console.error("GET BLOGS SERVER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// =====================================================
// GET SINGLE BLOG
// =====================================================

app.get("/api/blogs/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            data,
            error
        } = await supabase
            .from("blogs")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            blog: data
        });

    } catch (error) {
        console.error("GET SINGLE BLOG ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// =====================================================
// UPDATE BLOG
// =====================================================

app.put("/api/blogs/:id", async (req, res) => {
    console.log("UPDATE BLOG ID:", req.params.id);
    console.log("UPDATE BLOG BODY:", req.body);

    try {
        const { id } = req.params;

        const {
            title,
            category,
            content,
            author,
            tags,
            coverImage,
            readTime
        } = req.body;

        if (!title || !category || !content || !author) {
            return res.status(400).json({
                success: false,
                message:
                    "Title, category, content and author are required"
            });
        }

        const {
            data,
            error
        } = await supabase
            .from("blogs")
            .update({
                title: title.trim(),
                category: category.trim(),
                content: content.trim(),
                author: author.trim(),
                tags: Array.isArray(tags) ? tags : [],
                cover_image: coverImage?.trim() || null,
                read_time: readTime?.trim() || null,
                updated_at: new Date().toISOString()
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.error("UPDATE BLOG ERROR:", error);

            return res.status(500).json({
                success: false,
                message: "Database error",
                error: error.message
            });
        }

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog: data
        });

    } catch (error) {
        console.error("UPDATE BLOG SERVER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// =====================================================
// DELETE BLOG
// =====================================================

app.delete("/api/blogs/:id", async (req, res) => {
    console.log("DELETE BLOG ID:", req.params.id);

    try {
        const { id } = req.params;

        const {
            data: existingBlog,
            error: findError
        } = await supabase
            .from("blogs")
            .select("id")
            .eq("id", id)
            .maybeSingle();

        if (findError) {
            console.error("FIND BLOG ERROR:", findError);

            return res.status(500).json({
                success: false,
                message: "Database error",
                error: findError.message
            });
        }

        if (!existingBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        const {
            error
        } = await supabase
            .from("blogs")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("DELETE BLOG ERROR:", error);

            return res.status(500).json({
                success: false,
                message: "Database error",
                error: error.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });

    } catch (error) {
        console.error("DELETE BLOG SERVER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {
    console.log(
        `🚀 BlogSphere Backend running on http://localhost:${PORT}`
    );
});