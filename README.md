# Pakclassified — Backend

Node.js/Express REST API for **Pakclassified**, a classifieds platform where users can sign up, verify their account via OTP, and post/manage local advertisements (cars, items, services, etc.) by city and category.

## Tech Stack

- **Runtime:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (JSON Web Tokens) + bcrypt password hashing
- **File uploads:** Multer
- **Email/OTP:** Nodemailer
- **Dev tooling:** Nodemon

## Features

- User signup/login with hashed passwords
- Email OTP verification
- JWT-protected routes (create, update, delete)
- Advertisement CRUD with category & city/area filters
- "Latest postings" and "my ads" endpoints
- Contact form endpoint

## Project Structure

```
Pakclassified/
├── Controller/          # Route handler logic (User, Advertisement, OTP, Contact, etc.)
├── Models/               # Mongoose schemas
├── Routes/               # Express route definitions
├── middleware/            # JWT auth middleware
├── utils/                 # Token/OTP generators, mailer helpers
├── server.js               # App entry point
└── package.json
```

### Installation

```bash
git clone https://github.com/abdullahranaa5117-oss/Pakclassified-Backend
cd Pakclassified
npm install
```

### Environment Variables

Create a `.env` file in the project root (this file is git-ignored and must **never** be committed):

```env
PORT=5500
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### Run

```bash
# Development (auto-restart)
npm run debug

# Production
npm start
```

The API will be available at `http://localhost:5500`.

## API Routes (overview)

| Route base | Description |
|---|---|
| `/api/users` | Signup, login, profile update, OTP verification |
| `/api/advertisements` | Create/read/update/delete ads, latest ads, my ads |
| `/api/advertisement-categories` | Manage ad categories |
| `/api/city-areas` | Manage city-area list |
| `/api/contact` | Contact form submissions |
