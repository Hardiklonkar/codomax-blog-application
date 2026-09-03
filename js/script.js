/* =========================================================
   BLOGSPHERE - FINAL SCRIPT.JS
   VERCEL API + JWT AUTHENTICATION
========================================================= */

/* =========================================================
   API CONFIGURATION
========================================================= */

const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:5000"
        : "https://YOUR-VERCEL-BACKEND.vercel.app";


/* =========================================================
   AUTH HELPERS
========================================================= */

function getToken() {
    return localStorage.getItem("token");
}


function getLoggedInUser() {
    try {
        const user = localStorage.getItem("loggedInUser");

        return user ? JSON.parse(user) : null;

    } catch (error) {
        console.error("GET LOGGED USER ERROR:", error);
        return null;
    }
}


function getAuthHeaders() {
    const token = getToken();

    return {
        "Content-Type": "application/json",

        ...(token
            ? {
                "Authorization": `Bearer ${token}`
            }
            : {})
    };
}


function clearLoginData() {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
}


function redirectToLogin() {
    clearLoginData();
    window.location.href = "login.html";
}


/* =========================================================
   PROTECT DASHBOARD
========================================================= */

function protectDashboard() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    if (currentPage !== "dashboard.html") {
        return;
    }

    const token = getToken();
    const user = getLoggedInUser();

    if (!token || !user) {

        alert("Please login to access your dashboard.");

        window.location.href = "login.html";
    }
}


/* =========================================================
   LOGOUT
========================================================= */

function setupLogout() {

    const logoutButtons =
        document.querySelectorAll(
            "#logoutBtn, .logout-btn, [data-action='logout']"
        );

    logoutButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );

                if (!confirmLogout) {
                    return;
                }

                clearLoginData();

                alert("Logged out successfully! 👋");

                window.location.href = "login.html";
            }
        );

    });
}


/* =========================================================
   MOBILE MENU
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const menuBtn =
            document.getElementById("menuBtn");

        const navLinks =
            document.querySelector(".nav-links");

        if (menuBtn && navLinks) {

            menuBtn.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    navLinks.classList.toggle("show");
                }
            );
        }

    }
);


/* =========================================================
   PASSWORD TOGGLE
========================================================= */

function setupPasswordToggle(buttonId, inputId) {

    const button =
        document.getElementById(buttonId);

    const input =
        document.getElementById(inputId);

    if (!button || !input) {
        return;
    }

    button.addEventListener(
        "click",
        function () {

            if (input.type === "password") {

                input.type = "text";
                button.textContent = "🙈";

            } else {

                input.type = "password";
                button.textContent = "👁";
            }

        }
    );
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

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const emailInput =
                document.getElementById("loginEmail");

            const passwordInput =
                document.getElementById("loginPassword");

            if (!emailInput || !passwordInput) {
                return;
            }

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();

            const password =
                passwordInput.value;

            if (!email || !password) {

                alert(
                    "Please enter email and password."
                );

                return;
            }

            try {

                const response =
                    await fetch(
                        `${API_URL}/api/auth/login`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    email,
                                    password
                                })
                        }
                    );

                const data =
                    await response.json();

                if (
                    response.ok &&
                    data.success &&
                    data.token
                ) {

                    localStorage.setItem(
                        "token",
                        data.token
                    );

                    localStorage.setItem(
                        "loggedInUser",
                        JSON.stringify(data.user)
                    );

                    alert(
                        "Login successful! 🎉"
                    );

                    window.location.href =
                        "dashboard.html";

                } else {

                    alert(
                        data.message ||
                        "Login failed."
                    );
                }

            } catch (error) {

                console.error(
                    "LOGIN ERROR:",
                    error
                );

                alert(
                    "Unable to connect to the backend API."
                );
            }

        }
    );

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
                emailInput.value
                    .trim()
                    .toLowerCase();

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

                            body:
                                JSON.stringify({
                                    name,
                                    email,
                                    password
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
                    "REGISTRATION ERROR:",
                    error
                );

                alert(
                    "Unable to connect to the backend API."
                );
            }

        }
    );

}


/* =========================================================
   CREATE BLOG ELEMENTS
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

    blogTitle.addEventListener(
        "input",
        function () {

            previewTitle.textContent =
                blogTitle.value.trim() ||
                "Your blog title will appear here";
        }
    );
}


/* =========================================================
   LIVE CATEGORY PREVIEW
========================================================= */

if (blogCategory && previewCategory) {

    blogCategory.addEventListener(
        "change",
        function () {

            previewCategory.textContent =
                blogCategory.value ||
                "Category";
        }
    );
}


/* =========================================================
   LIVE CONTENT PREVIEW
========================================================= */

if (blogContent && previewContent) {

    blogContent.addEventListener(
        "input",
        function () {

            previewContent.textContent =
                blogContent.value.trim() ||
                "Start writing your blog content and see the preview here.";
        }
    );
}


/* =========================================================
   COVER IMAGE PREVIEW
========================================================= */

if (blogImage && previewImage) {

    blogImage.addEventListener(
        "input",
        function () {

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
        }
    );
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
                document.getElementById("blogTitle")?.value || "";

            const content =
                document.getElementById("blogContent")?.value || "";

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

            const token =
                getToken();

            if (!token) {

                alert(
                    "Please login first to create a blog."
                );

                window.location.href =
                    "login.html";

                return;
            }

            const title =
                document.getElementById(
                    "blogTitle"
                )?.value.trim() || "";

            const category =
                document.getElementById(
                    "blogCategory"
                )?.value.trim() || "";

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
                )?.value.trim() || "";

            const tags =
                tagsValue
                    ? tagsValue
                        .split(",")
                        .map(tag => tag.trim())
                        .filter(tag => tag.length > 0)
                    : [];

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

            try {

                const response =
                    await fetch(
                        `${API_URL}/api/blogs`,
                        {
                            method: "POST",

                            headers:
                                getAuthHeaders(),

                            body:
                                JSON.stringify({
                                    title,
                                    category,
                                    content,
                                    tags,
                                    coverImage,
                                    readTime
                                })
                        }
                    );

                const data =
                    await response.json();

                if (response.status === 401) {

                    alert(
                        "Session expired. Please login again."
                    );

                    redirectToLogin();

                    return;
                }

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
                    "CREATE BLOG ERROR:",
                    error
                );

                alert(
                    "Unable to connect to the backend API."
                );
            }

        }
    );

}


/* =========================================================
   LOAD ALL BLOGS
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
                    <h3>Unable to load blogs</h3>
                    <p>Please try again later.</p>
                </div>
            `;

            return;
        }

        const blogs =
            data.blogs || [];

        if (blogs.length === 0) {

            blogGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No blogs available</h3>
                    <p>Be the first to publish a blog!</p>
                </div>
            `;

            return;
        }

        blogGrid.innerHTML =
            blogs
                .map(function (blog) {

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
                                        background-size:
                                        cover;
                                        background-position:
                                        center;
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

                })
                .join("");

    } catch (error) {

        console.error(
            "LOAD BLOGS ERROR:",
            error
        );

        blogGrid.innerHTML = `
            <div class="empty-state">
                <h3>Unable to connect to API</h3>
                <p>Please try again later.</p>
            </div>
        `;
    }
}


/* =========================================================
   LOAD MY BLOGS - DASHBOARD
========================================================= */

async function loadDashboardBlogs() {

    const dashboardList =
        document.querySelector(
            ".dashboard-blog-list"
        );

    if (!dashboardList) {
        return;
    }

    const token =
        getToken();

    if (!token) {

        redirectToLogin();

        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/api/blogs/my-blogs`,
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        if (response.status === 401) {

            alert(
                "Session expired. Please login again."
            );

            redirectToLogin();

            return;
        }

        if (
            !response.ok ||
            !data.success
        ) {

            dashboardList.innerHTML = `
                <div class="empty-state">
                    <h3>Unable to load blogs</h3>
                    <p>
                        ${data.message || "Please try again."}
                    </p>
                </div>
            `;

            return;
        }

        const blogs =
            data.blogs || [];

        const totalBlogs =
            document.getElementById(
                "totalBlogs"
            );

        if (totalBlogs) {

            totalBlogs.textContent =
                data.count ?? blogs.length;
        }

        if (blogs.length === 0) {

            dashboardList.innerHTML = `
                <div class="empty-state">
                    <h3>No blogs yet</h3>
                    <p>Create your first blog.</p>
                </div>
            `;

            return;
        }

        const latestBlogs =
            blogs.slice(0, 5);

        dashboardList.innerHTML =
            latestBlogs
                .map(function (blog) {

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

                            <div
                                class="dashboard-blog-icon"
                                onclick="viewBlog(${blog.id})"
                                style="cursor:pointer;"
                            >
                                📝
                            </div>

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

                            <div class="blog-status published">
                                Published
                            </div>

                            <div class="blog-actions">

                                <button
                                    class="more-btn"
                                    type="button"
                                    onclick="
                                        toggleBlogMenu(
                                            event,
                                            ${blog.id}
                                        )
                                    "
                                    aria-label="Blog actions"
                                >
                                    ⋮
                                </button>

                                <div
                                    class="blog-menu"
                                    id="blogMenu-${blog.id}"
                                >

                                    <button
                                        type="button"
                                        onclick="
                                            editBlog(
                                                event,
                                                ${blog.id}
                                            )
                                        "
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        type="button"
                                        onclick="
                                            deleteBlog(
                                                event,
                                                ${blog.id}
                                            )
                                        "
                                    >
                                        🗑️ Delete
                                    </button>

                                </div>

                            </div>

                        </article>
                    `;

                })
                .join("");

    } catch (error) {

        console.error(
            "LOAD DASHBOARD BLOGS ERROR:",
            error
        );

        dashboardList.innerHTML = `
            <div class="empty-state">
                <h3>Unable to connect to API</h3>
                <p>Please try again later.</p>
            </div>
        `;
    }
}


/* =========================================================
   VIEW BLOG
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

    const menu =
        document.getElementById(
            `blogMenu-${id}`
        );

    if (!menu) {
        return;
    }

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

    const menu =
        document.getElementById(
            `blogMenu-${id}`
        );

    if (menu) {
        menu.classList.remove("show");
    }

    const token =
        getToken();

    if (!token) {

        alert("Please login first.");

        redirectToLogin();

        return;
    }

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
                    method: "DELETE",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        if (response.status === 401) {

            alert(
                "Session expired. Please login again."
            );

            redirectToLogin();

            return;
        }

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

        await loadDashboardBlogs();
        await loadBlogs();

    } catch (error) {

        console.error(
            "DELETE BLOG ERROR:",
            error
        );

        alert(
            error.message ||
            "Unable to delete blog."
        );
    }
}


/* =========================================================
   CLOSE BLOG MENUS
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

    const user =
        getLoggedInUser();

    if (!user) {
        return;
    }

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
}


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        protectDashboard();

        loadBlogs();

        loadDashboardBlogs();

        loadLoggedInUser();

        setupLogout();

    }
);