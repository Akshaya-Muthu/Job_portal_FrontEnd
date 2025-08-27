🧑‍💼 Job Portal
A Full-Stack Job Portal Application where job seekers can search and apply for jobs, and employers can post and manage job listings. This platform is designed to simplify the recruitment process with a clean UI, secure authentication, and role-based access control.

🚀 Features
For Job Seekers (Candidates)
✔ Register & Login securely with JWT
✔ Create and update profile (personal info, skills, resume link)
✔ Browse jobs with filters (location, type, salary, category)
✔ Apply to jobs directly
✔ Track application status

For Employers (Recruiters)
✔ Post new jobs with detailed descriptions
✔ Manage (edit/delete) job listings
✔ View applicants for each job
✔ Shortlist candidates

General Features
Secure authentication & authorization (role-based)

Responsive UI for desktop & mobile

Real-time job search and filtering

RESTful API integration

Cloud-hosted backend and database

Error handling & form validation

🛠 Tech Stack
Frontend
React.js (Vite)

React Router

Tailwind CSS / Mantine UI

Axios (API calls)

Backend
Node.js

Express.js

MongoDB (MongoDB Atlas for cloud DB)

Mongoose (ODM)

JWT Authentication

Bcrypt.js (password hashing)

Deployment
Frontend: Netlify / Vercel

Backend: Render / Heroku

Database: MongoDB Atlas

🏗️ System Architecture

flowchart TD
    subgraph Frontend[Frontend - React]
        A1[Login/Register Page]
        A2[Job Listings]
        A3[Apply Job]
        A4[Employer Dashboard]
    end

    subgraph Backend[Backend - Node.js + Express]
        B1[Auth Service]
        B2[Job Service]
        B3[Application Service]
    end

    subgraph DB[MongoDB Atlas]
        C1[Users Collection]
        C2[Jobs Collection]
        C3[Applications Collection]
    end

    A1 <--> B1
    A2 <--> B2
    A3 <--> B3
    A4 <--> B2
    B1 <--> C1
    B2 <--> C2
    B3 <--> C3

    📡 API Endpoints
Authentication
POST /api/auth/register → Register user (job seeker/employer)

POST /api/auth/login → Login & get JWT token

POST /api/auth/logout → Logout user

Jobs
POST /api/jobs → Create new job (Employer only)

GET /api/jobs → Get all jobs

GET /api/jobs/:id → Get job by ID

PUT /api/jobs/:id → Update job (Employer only)

DELETE /api/jobs/:id → Delete job (Employer only)

Applications
POST /api/applications → Apply to a job (Candidate only)

GET /api/applications/:jobId → Get applicants for a job (Employer only)

GET /api/applications/user/:userId → Get all applications by a candidate



