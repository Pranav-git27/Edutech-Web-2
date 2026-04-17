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
- [ ] **Step 2: Backend API Layer (Node.js/Express)**
  - [x] Initialize server, setup routing.
  - [ ] Implement CRUD operations for all entities.
- [ ] **Step 3: Authentication & Security**
  - [x] Implemented Express POST routes for Login/Signup.
  - [x] Created trigger to sync Supabase Auth implicitly with Postgres Profiles table (Data Consistency).
  - [x] Connected frontend forms to trigger Real Auth API.
- [ ] **Step 4: Frontend API Integration**
  - [ ] Connect existing HTML/JS UI to the new APIs.
- [ ] **Step 5: Code Execution Service**
  - [ ] Add execution logic payload validation.
  - [ ] Calculate logic for Leaderboards based on submissions.

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

💡 *Code. Compete. Improve.*
