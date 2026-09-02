# BlogSphere 📝

BlogSphere is a full-stack blog application where users can register, login securely using JWT authentication, create blogs, manage their own content, and view their dashboard.

## 🚀 Features

### Authentication

* User Registration
* User Login
* JWT-based authentication
* Protected private routes
* Secure authorization using Bearer Token
* Logout functionality

### Blog Management

* Create a new blog
* View all published blogs
* View individual blog details
* Edit own blogs
* Delete own blogs
* Category and tags support
* Cover image support
* Read time support

### Dashboard

* Personalized welcome message
* Display logged-in user's profile
* Display user's email
* Display total number of blogs
* Display recent blogs
* Edit and delete blog actions
* Protected dashboard access

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API
* LocalStorage

### Backend

* Node.js
* Express.js
* JWT Authentication
* REST API

### Database

* MySQL

## 📁 Project Structure

```text
codomax-blog-application/
│
├── backend/
│   └── server.js
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── create-blog.html
├── blog-details.html
├── edit.html
├── package.json
└── package-lock.json
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Hardiklonkar/codomax-blog-application.git
```

### 2. Open the project

```bash
cd codomax-blog-application
```

### 3. Install backend dependencies

```bash
npm install
```

### 4. Start the backend server

```bash
node backend/server.js
```

The backend runs on:

```text
http://localhost:5000
```

### 5. Run the frontend

If using XAMPP, place the project inside:

```text
C:\xampp\htdocs\
```

Then open:

```text
http://localhost/codomax-blog-application/index.html
```

## 🔐 Authentication Flow

1. User registers an account.
2. User logs in using email and password.
3. Backend generates a JWT token.
4. Token is stored in LocalStorage.
5. Protected API requests send the token using the Authorization header.
6. Dashboard displays only the logged-in user's blogs.
7. Logout removes the stored authentication data.

## 📊 Module 5 – Authentication & Dashboard

This project implements the following Module 5 requirements:

* ✅ Secure JWT user authentication
* ✅ Protected private dashboard
* ✅ Logged-in user's blogs displayed in dashboard
* ✅ User profile information
* ✅ Logout functionality
* ✅ Blog edit/delete authorization
* ✅ Dashboard blog statistics

## 👨‍💻 Developer

**Hardik Lonkar**

Full Stack Developer

## 📌 Repository

GitHub:
https://github.com/Hardiklonkar/codomax-blog-application

---

Built with ❤️ using HTML, CSS, JavaScript, Node.js, Express.js and MySQL.
