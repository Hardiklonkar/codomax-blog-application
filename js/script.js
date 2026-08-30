/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}


/* =========================
   PASSWORD TOGGLE
========================= */

function setupPasswordToggle(buttonId, inputId) {

    const button = document.getElementById(buttonId);
    const input = document.getElementById(inputId);

    if (button && input) {

        button.addEventListener("click", () => {

            if (input.type === "password") {
                input.type = "text";
                button.textContent = "🙈";
            } else {
                input.type = "password";
                button.textContent = "👁";
            }

        });

    }
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


/* =========================
   LOGIN FORM
========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value.trim();

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        alert("Login UI is working! Backend authentication will be added in Module 2 & 5.");

    });

}


/* =========================
   REGISTER FORM
========================= */

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const terms =
            document.getElementById("terms").checked;


        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill all required fields.");
            return;
        }


        if (password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }


        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }


        if (!terms) {
            alert("Please accept the Terms & Conditions.");
            return;
        }


        alert(
            "Registration UI is working! Backend registration will be added in Module 2."
        );

    });

}


/* =========================
   CREATE BLOG LIVE PREVIEW
========================= */

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


if (blogTitle) {

    blogTitle.addEventListener("input", function () {

        if (this.value.trim() !== "") {

            previewTitle.textContent =
                this.value;

        } else {

            previewTitle.textContent =
                "Your blog title will appear here";

        }

    });

}


if (blogCategory) {

    blogCategory.addEventListener("change", function () {

        if (this.value !== "") {

            previewCategory.textContent =
                this.value;

        } else {

            previewCategory.textContent =
                "Category";

        }

    });

}


if (blogContent) {

    blogContent.addEventListener("input", function () {

        if (this.value.trim() !== "") {

            previewContent.textContent =
                this.value;

        } else {

            previewContent.textContent =
                "Start writing your blog content and see the preview here.";

        }

    });

}


/* =========================
   COVER IMAGE PREVIEW
========================= */

if (blogImage) {

    blogImage.addEventListener("input", function () {

        const imageUrl = this.value.trim();

        if (imageUrl !== "") {

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


/* =========================
   SAVE BLOG DRAFT
========================= */

const saveDraftBtn =
    document.getElementById("saveDraftBtn");

if (saveDraftBtn) {

    saveDraftBtn.addEventListener("click", function () {

        const title =
            document.getElementById("blogTitle").value.trim();

        const content =
            document.getElementById("blogContent").value.trim();

        if (!title && !content) {

            alert("Please enter some blog content before saving.");

            return;

        }


        const draft = {

            title:
                document.getElementById("blogTitle").value,

            category:
                document.getElementById("blogCategory").value,

            readTime:
                document.getElementById("readTime").value,

            image:
                document.getElementById("blogImage").value,

            content:
                document.getElementById("blogContent").value,

            tags:
                document.getElementById("blogTags").value,

            savedAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            "blogDraft",
            JSON.stringify(draft)
        );


        alert("Blog draft saved successfully! 💾");

    });

}


/* =========================
   PUBLISH BLOG
========================= */

const blogForm =
    document.getElementById("blogForm");

if (blogForm) {

    blogForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const title =
            document.getElementById("blogTitle").value.trim();

        const category =
            document.getElementById("blogCategory").value;

        const content =
            document.getElementById("blogContent").value.trim();


        if (!title || !category || !content) {

            alert(
                "Please complete the required blog fields."
            );

            return;

        }


        alert(
            "Blog created successfully! 🚀\n\nBackend API will be connected in Module 2."
        );

    });

}