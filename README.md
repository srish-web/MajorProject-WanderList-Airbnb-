<div align="center">

# 🌍 WanderList

### An Airbnb-Inspired Full-Stack Web Application

*Explore, list & review unique stays around the world.*

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)](https://ejs.co/)

[![GitHub repo](https://img.shields.io/badge/GitHub-WanderList-181717?style=flat-square&logo=github)](https://github.com/srish-web/MajorProject-WanderList-Airbnb-)
![Architecture](https://img.shields.io/badge/Architecture-MVC-E85A4F?style=flat-square)
![API](https://img.shields.io/badge/API-RESTful-2E7D5E?style=flat-square)
![Auth](https://img.shields.io/badge/Auth-Passport.js-D4A853?style=flat-square)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Routes Reference](#-routes-reference)


---

## 🏡 About the Project

**WanderList** is a dynamic full-stack web application inspired by Airbnb. It allows users to **explore**, **list**, and **review** travel accommodations. Built following clean **MVC architecture**, it integrates:

- 🔐 **Passport.js** — secure local authentication with session persistence
- ✅ **Joi** — robust server-side validation

> Built as a major project to demonstrate full-stack proficiency with the Node.js ecosystem.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Secure Authentication** | Sign up, log in and log out with Passport.js local strategy — passwords hashed, sessions stored in MongoDB |
| 🏡 **Listing CRUD** | Hosts can create, edit and delete listings with full validation and flash message feedback |
| ⭐ **Reviews & Ratings** | Authenticated users can post and delete reviews, with server-side authorization checks |
| 🛡️ **Authorization** | Only listing owners can edit or delete their listings; reviews similarly protected |
| 💬 **Flash Messages** | Contextual success and error notifications across all user actions |
| 📱 **Responsive UI** | Bootstrap-powered layout that works across all screen sizes |

---

## 🛠 Tech Stack

### Backend
| Technology | Role |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework & routing |
| **MongoDB + Mongoose** | Database & ODM |
| **Passport.js** | Authentication middleware |
| **passport-local-mongoose** | User model plugin |
| **express-session + connect-mongo** | Session management |
| **Joi** | Schema validation |
| **method-override** | PUT/DELETE from HTML forms |
| **connect-flash** | Flash message middleware |

### Frontend
| Technology | Role |
|---|---|
| **EJS** | Server-side templating engine |
| **Bootstrap 5** | Responsive CSS framework |


---

## 🏗 Architecture

WanderList follows the **Model-View-Controller (MVC)** pattern:

```
Browser Request
      │
      ▼
  ┌─────────┐
  │  Router  │  ← Express route definitions (/routes)
  └────┬─────┘
       │
       ▼
  ┌────────────┐
  │ Controller │  ← Business logic, req/res handling (/controllers)
  └──┬──────┬──┘
     │      │
     ▼      ▼
 ┌───────┐ ┌──────┐
 │ Model │ │ View │
 │       │ │      │
 │Mongoose│ │ EJS  │
 │schemas│ │tmplt │
 └───┬───┘ └──┬───┘
     │        │
     ▼        ▼
 MongoDB   HTML Response
```

**Key architectural decisions:**
- **Async error handling** via a custom `wrapAsync` utility — no unhandled promise rejections
- **Centralized error handling** using a custom `ExpressError` class and global error middleware
- **Middleware pipeline** for authentication checks, listing ownership, and input validation

---

## 📁 Project Structure

```
MajorProject-WanderList-Airbnb/
│
├── 📂 models/                  # Mongoose schemas
│   ├── listing.js              # Listing model (title, description, image, price, location)
│   ├── review.js               # Review model (rating, comment, author)
│   └── user.js                 # User model (passport-local-mongoose plugin)
│
├── 📂 controllers/             # Business logic
│   ├── listings.js             # index, show, new, create, edit, update, destroy
│   ├── reviews.js              # createReview, destroyReview
│   └── users.js                # renderSignup, signup, renderLogin, login, logout
│
├── 📂 routes/                  # Express routers
│   ├── listing.js              # /listings routes
│   ├── review.js               # /listings/:id/reviews routes
│   └── user.js                 # /signup, /login, /logout routes
│
├── 📂 views/                   # EJS templates
│   ├── 📂 listings/
│   │   ├── index.ejs           # All listings
│   │   ├── show.ejs            # Single listing + map + reviews
│   │   ├── new.ejs             # Create listing form
│   │   └── edit.ejs            # Edit listing form
│   ├── 📂 users/
│   │   ├── signup.ejs
│   │   └── login.ejs
│   └── 📂 partials/
│       ├── navbar.ejs
│       ├── footer.ejs
│       └── flash.ejs           # Flash message display
│
├── 📂 public/                  # Static assets
│   ├── css/
│   └── js/
│
├── 📂 middleware/              # Custom middleware
│   └── index.js                # isLoggedIn, isOwner, isReviewAuthor, validateListing
│
├── 📂 utils/                   # Utility helpers
│   ├── ExpressError.js         # Custom error class
│   └── wrapAsync.js            # Async error wrapper
│
├── cloudConfig.js              # Cloudinary + Multer setup
├── schema.js                   # Joi validation schemas
├── app.js                      # Express app entry point
├── .env                        # Environment variables (⚠️ not committed)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v14 or higher
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local) or a [MongoDB Atlas](https://cloud.mongodb.com/) account

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/srish-web/MajorProject-WanderList-Airbnb-.git
cd MajorProject-WanderList-Airbnb-
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
node app.js
# or with auto-reload:
nodemon app.js
```

**4. Open your browser**

```
http://localhost:8080
```

---



## 🗺 Routes Reference

### Listing Routes

| Method | Route | Description | Auth |
|---|---|---|---|
| `GET` | `/listings` | Browse all listings | Public |
| `GET` | `/listings/new` | New listing form | ✅ Required |
| `POST` | `/listings` | Create new listing | ✅ Required |
| `GET` | `/listings/:id` | View listing detail | Public |
| `GET` | `/listings/:id/edit` | Edit listing form | ✅ Owner only |
| `PUT` | `/listings/:id` | Update listing | ✅ Owner only |
| `DELETE` | `/listings/:id` | Delete listing | ✅ Owner only |

### Review Routes

| Method | Route | Description | Auth |
|---|---|---|---|
| `POST` | `/listings/:id/reviews` | Post a review | ✅ Required |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Delete a review | ✅ Author only |

### User Routes

| Method | Route | Description | Auth |
|---|---|---|---|
| `GET` | `/signup` | Signup form | Public |
| `POST` | `/signup` | Register new user | Public |
| `GET` | `/login` | Login form | Public |
| `POST` | `/login` | Authenticate user | Public |
| `GET` | `/logout` | Destroy session | Public |

---

<div align="center">

Built with ❤️ by [srish-web](https://github.com/srish-web)

⭐ Star this repo if you found it helpful!

</div>
