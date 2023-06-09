# MERN Authentication Boilerplate

This is a boilerplate app for a MERN stack application with authentication. This is for a SPA (Single Page Application) workflow that uses the [Vite](https://vite.dev) Build tool.

It includes the following:

- Backend API with Express & MongoDB
- Routes for auth, logout, register, profile, update profile
- JWT authentication stored in HTTP-only cookie
- Protected routes and endpoints
- Custom middleware to check JSON web token and store in cookie
- Custom error middleware
- React frontend to register, login, logout, view profile, and update profile
- React Bootstrap UI library
- React Toastify notifications

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Env Variables

Go to the **backend** directory and rename the `.env.example` file to `.env` and add the following

```
NODE_ENV=development
PORT=5000
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<The JWT secret name for local storage> # Change the JWT_SECRET to what you want
```

### Install Dependencies (frontend & backend)

```
cd backend
yarn install

cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)

# Run frontend
cd frontend
npm run dev

# Run backend
yarn server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```