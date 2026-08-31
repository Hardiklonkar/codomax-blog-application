/* =========================================================
   BLOGSPHERE - FINAL SCRIPT.JS
========================================================= */


/* =========================================================
   API CONFIGURATION
========================================================= */

const API_URL = "http://localhost:5000";


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        navLinks.classList.toggle("show");

    });

}


/* =========================================================
   PASSWORD TOGGLE
========================================================= */

function setupPasswordToggle(buttonId, inputId) {

    const button = document.getElementById(buttonId);
    const input = document.getElementById(inputId);

    if (!button || !input) {
        return;
    }

    button.addEventListener("click", function () {

        if (input.type === "password") {

            input.type = "text";
            button.textContent = "🙈";

        } else {

            input.type = "password";
            button.textContent = "👁";

        }

    });

}


setupPasswordToggle(
    "toggleLoginPassword",
    "loginPassword"
);

setupPasswordToggle(
    "toggleRegisterPassword",
    "registerPassword"
);

setupPasswordToggle(
    "toggleConfirmPassword",
    "confirmPassword"
);


/* =========================================================
   LOGIN
========================================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const emailInput =
            document.getElementById("loginEmail");

        const passwordInput =
            document.getElementById("loginPassword");

        if (!emailInput || !passwordInput) {
            return;
        }

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;

        if (!email || !password) {

            alert("Please enter email and password.");

            return;
        }

        try {

            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(data.user)
                );

                alert("Login successful! 🎉");

                window.location.href = "dashboard.html";

            } else {

                alert(
                    data.message ||
                    "Login failed."
                );

            }

        } catch (error) {

            console.error("Login Error:", error);

            alert(
                "Unable to connect to backend server. Please make sure your Node.js server is running."
            );

        }

    });

}


/* =========================================================
   REGISTER
========================================================= */

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const nameInput =
                document.getElementById("registerName");

            const emailInput =
                document.getElementById("registerEmail");

            const passwordInput =
                document.getElementById("registerPassword");

            const confirmInput =
                document.getElementById("confirmPassword");

            const termsInput =
                document.getElementById("terms");

            if (
                !nameInput ||
                !emailInput ||
                !passwordInput ||
                !confirmInput
            ) {
                return;
            }

            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            const confirmPassword =
                confirmInput.value;

            const terms =
                termsInput
                    ? termsInput.checked
                    : true;

            if (
                !name ||
                !email ||
                !password ||
                !confirmPassword
            ) {

                alert(
                    "Please fill all required fields."
                );

                return;
            }

            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;
            }

            if (password !== confirmPassword) {

                alert(
                    "Passwords do not match."
                );

                return;
            }

            if (!terms) {

                alert(
                    "Please accept the Terms & Conditions."
                );

                return;
            }

            try {

                const response =
                    await fetch(
                        `${API_URL}/api/auth/register`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                name: name,
                                email: email,
                                password: password
                            })
                        }
                    );

                const data =
                    await response.json();

                if (
                    response.ok &&
                    data.success
                ) {

                    alert(
                        "Registration successful! 🎉"
                    );

                    window.location.href =
                        "login.html";

                } else {

                    alert(
                        data.message ||
                        "Registration failed."
                    );

                }

            } catch (error) {

                console.error(
                    "Registration Error:",
                    error
                );

                alert(
                    "Unable to connect to backend server. Please make sure your Node.js server is running."
                );

            }

        }
    );

}


/* =========================================================
   CREATE BLOG - ELEMENTS
========================================================= */

const blogTitle =
    document.getElementById("blogTitle");

const blogCategory =
    document.getElementById("blogCategory");

const blogContent =
    document.getElementById("blogContent");

const blogImage =
    document.getElementById("blogImage");

const previewTitle =
    document.getElementById("previewTitle");

const previewCategory =
    document.getElementById("previewCategory");

const previewContent =
    document.getElementById("previewContent");

const previewImage =
    document.getElementById("previewImage");


/* =========================================================
   LIVE TITLE PREVIEW
========================================================= */

if (blogTitle && previewTitle) {

    blogTitle.addEventListener("input", function () {

        previewTitle.textContent =
            blogTitle.value.trim() ||
            "Your blog title will appear here";

    });

}


/* =========================================================
   LIVE CATEGORY PREVIEW
========================================================= */

if (blogCategory && previewCategory) {

    blogCategory.addEventListener("change", function () {

        previewCategory.textContent =
            blogCategory.value ||
            "Category";

    });

}


/* =========================================================
   LIVE CONTENT PREVIEW
========================================================= */

if (blogContent && previewContent) {

    blogContent.addEventListener("input", function () {

        previewContent.textContent =
            blogContent.value.trim() ||
            "Start writing your blog content and see the preview here.";

    });

}


/* =========================================================
   COVER IMAGE PREVIEW
========================================================= */

if (blogImage && previewImage) {

    blogImage.addEventListener("input", function () {

        const imageUrl =
            blogImage.value.trim();

        if (imageUrl) {

            previewImage.style.backgroundImage =
                `url("${imageUrl}")`;

            previewImage.style.backgroundSize =
                "cover";

            previewImage.style.backgroundPosition =
                "center";

            previewImage.textContent = "";

        } else {

            previewImage.style.backgroundImage =
                "none";

            previewImage.textContent = "📝";

        }

    });

}


/* =========================================================
   SAVE BLOG DRAFT
========================================================= */

const saveDraftBtn =
    document.getElementById("saveDraftBtn");

if (saveDraftBtn) {

    saveDraftBtn.addEventListener(
        "click",
        function () {

            const title =
                document.getElementById(
                    "blogTitle"
                )?.value || "";

            const content =
                document.getElementById(
                    "blogContent"
                )?.value || "";

            if (
                !title.trim() &&
                !content.trim()
            ) {

                alert(
                    "Please enter some blog content before saving."
                );

                return;
            }

            const draft = {

                title:
                    document.getElementById(
                        "blogTitle"
                    )?.value || "",

                category:
                    document.getElementById(
                        "blogCategory"
                    )?.value || "",

                readTime:
                    document.getElementById(
                        "readTime"
                    )?.value || "",

                image:
                    document.getElementById(
                        "blogImage"
                    )?.value || "",

                content:
                    document.getElementById(
                        "blogContent"
                    )?.value || "",

                tags:
                    document.getElementById(
                        "blogTags"
                    )?.value || "",

                savedAt:
                    new Date().toISOString()

            };

            localStorage.setItem(
                "blogDraft",
                JSON.stringify(draft)
            );

            alert(
                "Blog draft saved successfully! 💾"
            );

        }
    );

}


/* =========================================================
   PUBLISH BLOG
========================================================= */

const blogForm =
    document.getElementById("blogForm");

if (blogForm) {

    blogForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const title =
                document.getElementById(
                    "blogTitle"
                )?.value.trim() || "";

            const category =
                document.getElementById(
                    "blogCategory"
                )?.value || "";

            const content =
                document.getElementById(
                    "blogContent"
                )?.value.trim() || "";

            const tagsValue =
                document.getElementById(
                    "blogTags"
                )?.value.trim() || "";

            const coverImage =
                document.getElementById(
                    "blogImage"
                )?.value.trim() || "";

            const readTime =
                document.getElementById(
                    "readTime"
                )?.value || "";


            /* GET LOGGED-IN USER */

            let loggedInUser = null;

            try {

                const storedUser =
                    localStorage.getItem(
                        "loggedInUser"
                    );

                if (storedUser) {

                    loggedInUser =
                        JSON.parse(storedUser);

                }

            } catch (error) {

                console.error(
                    "User data error:",
                    error
                );

            }


            const author =
                loggedInUser?.name ||
                loggedInUser?.email ||
                "Hardik Lonkar";


            /* TAGS */

            const tags =
                tagsValue
                    ? tagsValue
                        .split(",")
                        .map(function (tag) {
                            return tag.trim();
                        })
                        .filter(function (tag) {
                            return tag.length > 0;
                        })
                    : [];


            /* VALIDATION */

            if (
                !title ||
                !category ||
                !content
            ) {

                alert(
                    "Please complete the required blog fields."
                );

                return;
            }


            /* SEND TO BACKEND */

            try {

                const response =
                    await fetch(
                        `${API_URL}/api/blogs`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                title: title,

                                category: category,

                                content: content,

                                author: author,

                                tags: tags,

                                coverImage: coverImage,

                                readTime: readTime

                            })
                        }
                    );

                const data =
                    await response.json();

                if (
                    response.ok &&
                    data.success
                ) {

                    localStorage.removeItem(
                        "blogDraft"
                    );

                    alert(
                        "Blog created successfully! 🚀"
                    );

                    window.location.href =
                        "dashboard.html";

                } else {

                    alert(
                        data.message ||
                        "Blog creation failed."
                    );

                }

            } catch (error) {

                console.error(
                    "Create Blog Error:",
                    error
                );

                alert(
                    "Unable to connect to backend server. Please make sure your Node.js server is running."
                );

            }

        }
    );

}


/* =========================================================
   LOAD BLOGS - HOME PAGE
========================================================= */

async function loadBlogs() {

    const blogGrid =
        document.querySelector(".blog-grid");

    if (!blogGrid) {
        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/api/blogs`
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            blogGrid.innerHTML = `

                <div class="empty-state">

                    <h3>
                        Unable to load blogs
                    </h3>

                    <p>
                        Please check the backend server.
                    </p>

                </div>

            `;

            return;
        }


        const blogs =
            data.blogs || [];


        if (blogs.length === 0) {

            blogGrid.innerHTML = `

                <div class="empty-state">

                    <h3>
                        No blogs available
                    </h3>

                    <p>
                        Be the first to publish a blog!
                    </p>

                </div>

            `;

            return;
        }


        blogGrid.innerHTML =
            blogs.map(function (blog) {

                const authorName =
                    blog.author ||
                    "Unknown Author";

                const firstLetter =
                    authorName
                        .charAt(0)
                        .toUpperCase();

                const date =
                    blog.created_at
                        ? new Date(
                            blog.created_at
                        ).toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            }
                        )
                        : "";

                const imageHTML =
                    blog.cover_image
                        ? `
                            <div
                                class="blog-image"
                                style="
                                    background-image:
                                    url('${blog.cover_image}');
                                    background-size: cover;
                                    background-position: center;
                                "
                            ></div>
                        `
                        : `
                            <div class="blog-image technology">
                                📝
                            </div>
                        `;


                return `

                    <article
                        class="blog-card"
                        onclick="viewBlog(${blog.id})"
                        style="cursor:pointer;"
                    >

                        ${imageHTML}

                        <div class="blog-content">

                            <span class="category">
                                ${blog.category || "General"}
                            </span>

                            <h3>
                                ${blog.title || "Untitled Blog"}
                            </h3>

                            <p>
                                ${blog.content || ""}
                            </p>

                            <div class="blog-footer">

                                <div class="author">

                                    <div class="author-avatar">
                                        ${firstLetter}
                                    </div>

                                    <div>

                                        <strong>
                                            ${authorName}
                                        </strong>

                                        <small>
                                            ${date}
                                        </small>

                                    </div>

                                </div>

                                <span class="read-time">
                                    ${blog.read_time || "Read →"}
                                </span>

                            </div>

                        </div>

                    </article>

                `;

            }).join("");


    } catch (error) {

        console.error(
            "Load Blogs Error:",
            error
        );

        blogGrid.innerHTML = `

            <div class="empty-state">

                <h3>
                    Backend server not connected
                </h3>

                <p>
                    Please start your Node.js server.
                </p>

            </div>

        `;

    }

}


/* =========================================================
   LOAD DASHBOARD BLOGS
========================================================= */

async function loadDashboardBlogs() {

    const dashboardList =
        document.querySelector(
            ".dashboard-blog-list"
        );

    if (!dashboardList) {
        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/api/blogs`
            );

        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            dashboardList.innerHTML = `

                <div class="empty-state">

                    <h3>
                        Unable to load blogs
                    </h3>

                    <p>
                        Please check the backend server.
                    </p>

                </div>

            `;

            return;
        }


        const blogs =
            data.blogs || [];


        /* TOTAL BLOG COUNT */

        const totalBlogs =
            document.getElementById(
                "totalBlogs"
            );

        if (totalBlogs) {

            totalBlogs.textContent =
                blogs.length;

        }


        /* NO BLOGS */

        if (blogs.length === 0) {

            dashboardList.innerHTML = `

                <div class="empty-state">

                    <h3>
                        No blogs yet
                    </h3>

                    <p>
                        Create your first blog.
                    </p>

                </div>

            `;

            return;
        }


        /* LATEST 5 BLOGS */

        const latestBlogs =
            blogs.slice(0, 5);


        dashboardList.innerHTML =
            latestBlogs.map(function (blog) {

                const date =
                    blog.created_at
                        ? new Date(
                            blog.created_at
                        ).toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            }
                        )
                        : "";


                return `

                    <article
                        class="dashboard-blog"
                        style="position:relative;"
                    >

                        <!-- BLOG ICON -->

                        <div
                            class="dashboard-blog-icon"
                            onclick="viewBlog(${blog.id})"
                            style="cursor:pointer;"
                        >
                            📝
                        </div>


                        <!-- BLOG INFORMATION -->

                        <div
                            class="dashboard-blog-info"
                            onclick="viewBlog(${blog.id})"
                            style="cursor:pointer;"
                        >

                            <span class="category">
                                ${blog.category || "General"}
                            </span>

                            <h3>
                                ${blog.title || "Untitled Blog"}
                            </h3>

                            <p>
                                ${date}
                            </p>

                        </div>


                        <!-- BLOG STATUS -->

                        <div class="blog-status published">
                            Published
                        </div>


                        <!-- BLOG ACTIONS -->

                        <div class="blog-actions">

                            <button
                                class="more-btn"
                                type="button"
                                onclick="toggleBlogMenu(event, ${blog.id})"
                                aria-label="Blog actions"
                            >
                                ⋮
                            </button>


                            <!-- EDIT / DELETE MENU -->

                            <div
                                class="blog-menu"
                                id="blogMenu-${blog.id}"
                            >

                                <button
                                    type="button"
                                    onclick="editBlog(event, ${blog.id})"
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    type="button"
                                    onclick="deleteBlog(event, ${blog.id})"
                                >
                                    🗑️ Delete
                                </button>

                            </div>

                        </div>

                    </article>

                `;

            }).join("");


    } catch (error) {

        console.error(
            "Load Dashboard Blogs Error:",
            error
        );

        dashboardList.innerHTML = `

            <div class="empty-state">

                <h3>
                    Backend server not connected
                </h3>

                <p>
                    Please start your Node.js server.
                </p>

            </div>

        `;

    }

}


/* =========================================================
   VIEW SINGLE BLOG
========================================================= */

function viewBlog(id) {

    if (!id) {
        return;
    }

    window.location.href =
        `blog-details.html?id=${encodeURIComponent(id)}`;

}


/* =========================================================
   EDIT BLOG
========================================================= */

function editBlog(event, id) {

    if (event) {
        event.stopPropagation();
    }

    if (!id) {
        return;
    }

    window.location.href =
        `edit.html?id=${encodeURIComponent(id)}`;

}


/* =========================================================
   TOGGLE BLOG MENU
========================================================= */

function toggleBlogMenu(event, id) {

    if (event) {
        event.stopPropagation();
    }

    /* CLOSE ALL OTHER MENUS */

    document
        .querySelectorAll(".blog-menu")
        .forEach(function (menu) {

            if (
                menu.id !==
                `blogMenu-${id}`
            ) {

                menu.classList.remove("show");

            }

        });


    /* FIND CURRENT MENU */

    const menu =
        document.getElementById(
            `blogMenu-${id}`
        );

    if (!menu) {
        return;
    }


    /* TOGGLE CURRENT MENU */

    menu.classList.toggle("show");

}


/* =========================================================
   DELETE BLOG
========================================================= */

async function deleteBlog(event, id) {

    if (event) {
        event.stopPropagation();
    }

    if (!id) {
        return;
    }


    /* CLOSE MENU */

    const menu =
        document.getElementById(
            `blogMenu-${id}`
        );

    if (menu) {

        menu.classList.remove("show");

    }


    /* CONFIRM DELETE */

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this blog? This action cannot be undone."
        );

    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/blogs/${id}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Blog deletion failed."
            );

        }


        alert(
            "Blog deleted successfully! 🗑️"
        );


        /* REFRESH DASHBOARD */

        await loadDashboardBlogs();


        /* REFRESH HOME BLOGS */

        await loadBlogs();


    } catch (error) {

        console.error(
            "Delete Blog Error:",
            error
        );

        alert(
            error.message ||
            "Unable to delete blog."
        );

    }

}


/* =========================================================
   CLOSE BLOG MENUS WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function () {

        document
            .querySelectorAll(".blog-menu")
            .forEach(function (menu) {

                menu.classList.remove("show");

            });

    }
);


/* =========================================================
   LOAD LOGGED-IN USER
========================================================= */

function loadLoggedInUser() {

    const userData =
        localStorage.getItem(
            "loggedInUser"
        );


    if (!userData) {
        return;
    }


    try {

        const user =
            JSON.parse(userData);


        /* DASHBOARD WELCOME NAME */

        const dashboardUserName =
            document.getElementById(
                "dashboardUserName"
            );


        if (
            dashboardUserName &&
            user.name
        ) {

            dashboardUserName.textContent =
                `${user.name}!`;

        }


        /* PROFILE NAME */

        const profileName =
            document.querySelector(
                ".profile-user h3"
            );


        if (
            profileName &&
            user.name
        ) {

            profileName.textContent =
                user.name;

        }


        /* PROFILE EMAIL */

        const profileDetails =
            document.querySelector(
                ".profile-details"
            );


        if (
            profileDetails &&
            user.email
        ) {

            const emailStrong =
                profileDetails.querySelector(
                    "div:first-child strong"
                );


            if (emailStrong) {

                emailStrong.textContent =
                    user.email;

            }

        }


        /* PROFILE AVATAR */

        const profileAvatar =
            document.querySelector(
                ".profile-avatar"
            );


        if (
            profileAvatar &&
            user.name
        ) {

            profileAvatar.textContent =
                user.name
                    .charAt(0)
                    .toUpperCase();

        }


    } catch (error) {

        console.error(
            "Logged-in user error:",
            error
        );

    }

}


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadBlogs();

        loadDashboardBlogs();

        loadLoggedInUser();

    }
);