# 💻 Coding Platform – EdTech Website-2

## 📌 Introduction

The **Coding Platform** is a web-based application inspired by platforms like **LeetCode** and **HackerRank**, designed to help users practice programming, improve problem-solving skills, and prepare for technical interviews.

It provides a structured and interactive environment where users can:

* Solve coding problems across multiple difficulty levels
* Write and execute code in an integrated editor
* Submit solutions and receive feedback
* Track progress and performance
* Compete via leaderboards and contests
* Get AI-powered hints for better learning

---

## 🚀 System Overview

This is a **full-stack coding platform** designed for:

* Coding practice
* Code execution and submission
* Performance tracking
* Competitive programming (contests)
* Ranking systems

### 🔹 Development Stages

| Stage   | Description                 |
| ------- | --------------------------- |
| Static  | UI only                     |
| Hybrid  | Partial API integration     |
| Dynamic | Fully backend-driven system |

### 📈 Phase 2 Progress Tracker (Dynamic Evaluation)
- [x] **Step 1: Database Architecture & Schema Design**
  - [x] Define PostgreSQL Schema for Users, Problems, Submissions, Contests.
  - [x] Initialize Supabase project & update env vars.
- [x] **Step 2: Backend API Layer (Node.js/Express)**
  - [x] Initialize server, setup routing.
  - [x] Implement CRUD operations (Submission Create, Profile Update).
- [x] **Step 3: Authentication & Security**
  - [x] Implemented Express POST routes for Login/Signup.
  - [x] Created trigger to sync Supabase Auth implicitly with Postgres Profiles table (Data Consistency).
  - [x] Connected frontend forms to trigger Real Auth API.
- [x] **Step 4: Frontend API Integration**
  - [x] Wired Problems List, Auth Forms, and Code Submit buttons to the live API.
- [x] **Step 5: Code Execution Service**
  - [x] Built backend mock evaluator tracking runtime and memory usage.
  - [x] Mapped verdicts to automatically trigger SQL Point allocations on user profiles!
- [x] **Step 6: Real-time Innovation Engine (Phase 2)**
  - [x] Implemented PostgreSQL Real-time Broadcast via Supabase Channels.
  - [x] Wired Backend events (Signup, Login, Solve) to trigger global Toast notifications.
- [x] **Step 7: Advanced Social & Admin Features (Extra)**
  - [x] **Global Discussions:** Real-time threads on every problem.
  - [x] **Admin Analytics Board:** Live platform-wide counters (Users, Subs, Probs).
  - [x] **Cloud Deployment:** Production-ready on Vercel with automated routing.

---

## 🧩 Functional Modules

1. Authentication
2. Problem Management
3. Code Execution
4. Submissions
5. Leaderboard
6. Contests
7. Dashboard & Profile

Each module evolves through:
**UI → API → Database → Persistent System**

---

## 🏗️ System Architecture

### 🔹 High-Level Architecture

```
Frontend (HTML, CSS, JS)
        ↓
API Layer (HTTP Requests)
        ↓
Backend (Node.js / Express)
        ↓
Database (MongoDB / Firebase)
```

### 🔹 Architecture Style

* Client-Server Architecture
* RESTful APIs
* Modular Backend Design

### 🔹 Data Flow

**User Action → API Call → Backend → Database → Response → UI Update**

---

## 🧱 Architecture Layers

### 1. Presentation Layer

Handles UI and user interaction.

**Pages:**

* index.html
* problems.html
* problem.html
* submissions.html
* leaderboard.html
* contests.html
* dashboard.html
* profile.html
* login/signup

---

### 2. Client Application Layer

Responsibilities:

* Form validation
* API calls
* State management
* Filtering problems

**State Types:**

* Local State
* Global State

---

### 3. API Layer

| Method | Purpose     |
| ------ | ----------- |
| GET    | Fetch data  |
| POST   | Create data |
| PATCH  | Update data |
| DELETE | Remove data |

---

### 4. Backend Layer

Handles:

* Business logic
* Authentication
* Code execution
* Ranking system

---

### 5. Data Layer

Stores:

* Users
* Problems
* Submissions
* Contests
* Leaderboard data

---

## 🔐 Authentication Module

### Features

* Login & Signup
* JWT Authentication
* Secure Sessions

### Flow

User → `POST /api/auth/login` → Backend verifies → JWT Token → Stored → Used for requests

### Security

* Password hashing
* Token validation
* Input validation

---

## 📚 Problems Module

### Features

* Browse problems
* Filter by difficulty
* View detailed problem statements

### APIs

* `GET /api/problems`
* `GET /api/problems/:id`

---

## ⚙️ Code Execution Module

### Features

* Run code in real-time
* View outputs and errors

### Flow

User → Write Code → `POST /api/run-code` → Execution → Result

---

## 📤 Submission Module

### Features

* Submit solutions
* Track submission history
* View verdicts

### APIs

* `POST /api/submit-code`
* `GET /api/submissions`

---

## 🏆 Leaderboard Module

### Features

* Rank users
* Display scores

### API

* `GET /api/leaderboard`

---

## 🎯 Contest Module

### Features

* View contests
* Register for contests

### APIs

* `GET /api/contests`
* `POST /api/contests/:id/register`

---

## 📊 User Dashboard

### Features

* Track solved problems
* Performance stats
* Activity heatmap

### API

* `GET /api/user/stats`

---

## 🤖 AI Hint Module

### Features

* AI-generated hints
* Learning assistance

### API

* `POST /api/ai/hint`

---

## 🎨 UI/UX Behavior

| Feature | Static Version | Dynamic Version |
| ------- | -------------- | --------------- |
| Loading | Fake           | Real            |
| Data    | Hardcoded      | API-based       |
| Errors  | Not handled    | Handled via API |

---

## 🔗 Backend Integration Strategy

### Phase 1

* Connect frontend with APIs

### Phase 2

* Implement full CRUD operations

### Phase 3

* Add leaderboard & analytics

### Phase 4

* Real-time features + AI integration

---

## 🧰 Tech Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript (ES6)

### Backend

* Node.js
* Express.js REST API

### Database & Auth

* Supabase (PostgreSQL)
* Supabase Authentication (JWT)

---

## 📁 Project Structure

```
/
├── index.html
├── problems.html
├── problem.html
├── submissions.html
├── leaderboard.html
├── contests.html
├── dashboard.html
├── profile.html
├── login.html
├── signup.html
├── style.css
└── assets/
```

---

## ⚠️ Limitations (Initial Version)

* Static UI in early stages
* No real-time execution initially
* Limited backend integration
* No persistent storage (in static phase)

---

## 🔮 Future Enhancements

* Real-time code execution engine
* Advanced analytics dashboard
* AI-based recommendations
* Multi-language support
* Interview preparation tracks
* Peer competition & social features

---

## 🎯 Key Achievements

* Full API integration readiness
* Scalable backend architecture
* Modular system design

---

## 🏁 Conclusion

This project transforms a **static frontend UI into a fully functional coding platform**.

### Final Outcome:

* Secure authentication system
* Code execution engine
* Submission tracking
* Leaderboard & contest system
* AI-powered learning assistance

---

## 🤝 Contribution

This project is designed for learning, hackathons, and scalable development.
Feel free to fork, extend, and enhance it.

---

## 📜 License

Open for educational and development purposes.

---

---

---

## 🌟 EXTRA INNOVATIONS 

### 🥇 1. Real-time Social Proof Engine
To set this project apart, we implemented a **Real-time Innovation Engine** using Supabase Broadcast/Listen (PostgreSQL WebSockets). 
- **User UX:** Whenever a rival solves a problem or registers, a "Live Activity" toast notification appears instantly on every client. **"New student joined from [Email]!"**

### 📊 2. Admin Analytics Board
A dedicated, glowing dashboard at the top of the User Profile that tracks global platform growth using Supabase `.count()` aggregation. 
- **Live Counters:** Total Registered Minds, Code Submissions Analyzed, and Curated Problem Set.

### 💬 3. Problem Discussion Threads
A fully functioning community section for every problem.
- **Features:** Post comments, view upvotes, and see real-time updates when others share insights.
- **Security:** RLS (Row Level Security) ensures only authenticated users can contribute.

### 🚀 4. Production Deployment
The entire stack is deployed on **Vercel** with a custom `vercel.json` configuration for seamless Node.js runtime execution.

💡 *Code. Compete. Improve.*
