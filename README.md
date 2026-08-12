# HireHub

## Full-Stack Job Recruitment Platform

HireHub is a full-stack job recruitment platform that connects **job seekers** with **recruiters**.

Job seekers can create an account, browse available jobs, search for suitable opportunities, view job details, apply for jobs, and track their application status.

Recruiters can create and manage company information, post job opportunities, view applicants, and accept or reject applications.

---

## Features

### 👨‍💻 Job Seeker

* User registration and login
* Automatic login after registration
* 3-day login session
* Browse available jobs
* Search jobs by:

  * Job title
  * Company name
  * Location
* View complete job details
* Apply for jobs
* Prevent duplicate applications
* View applied jobs
* Track application status
* View personal profile
* Logout

### 🧑‍💼 Recruiter

* Recruiter registration and login
* Create company information
* View company information
* Update company information
* Post new jobs
* View jobs posted by the recruiter
* View number of jobs posted
* View applicants for each job
* Accept applications
* Reject applications
* Logout

### 🔐 Authentication

HireHub uses JWT-based authentication.

* JWT authentication
* HTTP-only authentication cookie
* 3-day login session
* Automatic login after registration
* Protected routes
* Role-based access
* Student and recruiter accounts
* Logout functionality

---

## Application Status

Applications can have different statuses:

* **Pending**
* **Accepted**
* **Rejected**

The recruiter can update an application's status.

The student can then see the updated status from the **My Applications** page.

---

## Main User Flow

### Student Flow

```text
Register
   ↓
Automatically Logged In
   ↓
Home Page
   ↓
Search Jobs
   ↓
View Job Details
   ↓
Apply for Job
   ↓
My Applications
   ↓
Track Application Status
   ↓
Logout
```

### Recruiter Flow

```text
Register / Login
       ↓
Company
       ↓
Manage Company
       ↓
Post Job
       ↓
Recruiter Dashboard
       ↓
View Applicants
       ↓
Accept / Reject Application
```

---

## Tech Stack

### Frontend

* React.js
* React Router
* Redux Toolkit
* Tailwind CSS
* shadcn/ui
* Axios
* Lucide React
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Cookie-based authentication

---

## Frontend Structure

```text
frontend/
│
├── src/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Layout.jsx
│   │   └── JobCard.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Jobs.jsx
│   │   ├── JobDetails.jsx
│   │   ├── ApplyJob.jsx
│   │   ├── Application.jsx
│   │   ├── Applicants.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── Company.jsx
│   │   ├── PostJob.jsx
│   │   └── RecruiterDashboard.jsx
│   │
│   ├── redux/
│   │   ├── authSlice.js
│   │   └── jobSlice.js
│   │
│   └── utils/
│       └── axios.js
│
└── package.json
```

---

## Backend Structure

```text
backend/
│
├── src/
│   │
│   ├── controllers/
│   │   ├── user.controllers.js
│   │   ├── job.controllers.js
│   │   ├── application.controllers.js
│   │   └── company.controllers.js
│   │
│   ├── models/
│   │   ├── user.models.js
│   │   ├── job.models.js
│   │   ├── application.models.js
│   │   └── company.models.js
│   │
│   ├── routes/
│   │   ├── user.routes.js
│   │   ├── job.routes.js
│   │   ├── application.routes.js
│   │   └── company.routes.js
│   │
│   ├── middleware/
│   │   └── isauthenticated.js
│   │
│   └── index.js
│
└── package.json
```

---

## API Endpoints

### User APIs

```text
POST /api/v1/user/register
```

Registers a new user.

```text
POST /api/v1/user/login
```

Logs in an existing user.

```text
GET /api/v1/user/logout
```

Logs out the current user.

---

### Job APIs

```text
POST /api/v1/job/post
```

Creates a new job.

```text
GET /api/v1/job/get
```

Gets all available jobs.

```text
GET /api/v1/job/get/:id
```

Gets details of a specific job.

```text
GET /api/v1/job/recruiter
```

Gets jobs posted by the logged-in recruiter.

---

### Application APIs

```text
POST /api/v1/application/apply/:id
```

Applies for a job.

```text
GET /api/v1/application/get
```

Gets applications of the logged-in student.

```text
GET /api/v1/application/:id/applicants
```

Gets applicants for a recruiter's job.

```text
PUT /api/v1/application/:applicationId/status
```

Updates the status of an application.

---

### Company APIs

```text
POST /api/v1/company/register
```

Creates a company.

```text
GET /api/v1/company/get
```

Gets the logged-in recruiter's company information.

```text
GET /api/v1/company/get/:id
```

Gets a company by its ID.

```text
PUT /api/v1/company/update/:id
```

Updates company information.

---

## Authentication

HireHub uses **JSON Web Tokens (JWT)** for authentication.

When a user successfully registers or logs in:

```text
User
  ↓
Backend verifies information
  ↓
JWT is generated
  ↓
JWT is stored in an HTTP-only cookie
  ↓
User remains authenticated
```

The JWT and authentication cookie are configured for a **3-day session**.

After the session expires, the user needs to log in again.

---

## Role-Based Access

HireHub supports two main user roles.

### Student

Students can:

* Browse jobs
* Search jobs
* View job details
* Apply for jobs
* View applications
* Track application status
* View their profile

### Recruiter

Recruiters can:

* Create and manage companies
* Post jobs
* View their posted jobs
* View applicants
* Accept or reject applications
* Manage company information

---

## Job Search

The Home page provides a job search feature.

Users can search by:

```text
Job Title
Company Name
Location
```

For example:

```text
Frontend Developer
Google
Bangalore
```

The available jobs are filtered based on the entered search text.

---

## Duplicate Application Protection

A student cannot apply for the same job multiple times.

If a student has already applied for a job, attempting to apply again will return an appropriate error message instead of creating another application.

---

## Responsive Design

HireHub is designed to work on different screen sizes.

The interface supports:

* Desktop
* Laptop
* Tablet
* Mobile

Tailwind CSS responsive classes are used throughout the frontend.

---

## Installation

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

### 2. Open the project

```bash
cd HireHub
```

---

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 4. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not upload your real `.env` file or secret values to GitHub.

---

## Running the Project

### Start Backend

Inside the backend directory:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:8000
```

---

### Start Frontend

Inside the frontend directory:

```bash
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

---

## Project Architecture

HireHub follows a client-server architecture.

```text
                 HireHub
                    │
          ┌─────────┴─────────┐
          │                   │
      Frontend             Backend
       React               Node.js
          │                Express
          │                   │
      Redux + Axios       Controllers
          │                   │
          │                Mongoose
          │                   │
          └───────────┬───────┘
                      │
                   MongoDB
```

### Frontend

The React frontend provides the user interface and communicates with the backend using Axios.

### Backend

The Express backend handles:

* Authentication
* Job management
* Applications
* Companies
* User data

### Database

MongoDB stores:

* Users
* Jobs
* Applications
* Companies

---

## Security

The project uses several security mechanisms:

* Password hashing using bcrypt
* JWT authentication
* HTTP-only cookies
* Protected backend routes
* Authentication middleware
* Role-based access control

Passwords are never stored directly in plain text.

---

## Future Improvements

The following features can be added in future versions:

* Resume upload
* Profile picture upload
* Advanced job filters
* Job categories
* Saved jobs
* Forgot password
* Email notifications
* Recruiter analytics
* Admin dashboard
* Pagination
* Job recommendations
* Application email notifications

---

## Screenshots

Screenshots of the application can be added here.

Example:

```text
Home Page
Jobs Page
Job Details
Student Dashboard
Recruiter Dashboard
Company Page
Applicants Page
```

---

## Project Goal

The main goal of HireHub is to create a simple and efficient recruitment platform that connects job seekers and recruiters in one application.

The platform simplifies the process of:

```text
Finding Jobs
     ↓
Applying for Jobs
     ↓
Managing Applications
     ↓
Recruiting Candidates
     ↓
Managing Job Applications
```

---

## Conclusion

HireHub demonstrates the development of a complete full-stack web application using modern frontend and backend technologies.

It provides separate functionality for job seekers and recruiters while using authentication, database management, REST APIs, and role-based access control to create a functional recruitment platform.

---

## Author

**Developed as a BTech project**

**Project:** HireHub
**Type:** Full-Stack Web Application
