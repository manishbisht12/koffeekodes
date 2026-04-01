# Koffeekodes

MERN stack authentication system with active session tracking and a minimalist teal-black UI.

## Features
* JWT Authentication (Login/Register)
* Device & IP tracking for every session
* Session manager (Log out specific devices)
* Role-based access (Admin/User)
* Clean, high-contrast UI (Black, White, #4EC9B0)

## Getting Started

### Prerequisites
* Node.js
* MongoDB (Atlas or Local)

### Setup

1. **Clone the repository**
2. **Backend Setup**
   * Go to `/backend`
   * Create a `.env` file:
     ```env
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_secret
     PORT=5000
     ```
   * Install and run:
     ```bash
     npm install
     npm start
     ```

3. **Frontend Setup**
   * Go to `/frontend`
   * Install and run:
     ```bash
     npm install
     npm run dev
     ```

## API Testing
The Postman collection is included in the root as `Koffeekodes.postman_collection.json`. 

### Key Endpoints
* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/sessions/active`
* `DELETE /api/sessions/:id`

## UI Design
Built with Tailwind CSS using a custom Teal (`#4EC9B0`) and Black color scheme. Icons are from Lucide-React.
