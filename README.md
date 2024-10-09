# Assignment Submission Portal Backend

This is a backend system for an assignment submission portal, built with Node.js, Express, and MongoDB. It supports user and admin functionality for uploading, viewing, and managing assignments.

## Project Structure

```
assignment-submission-portal/
│
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── user.js
│   │   └── assignment.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── adminRoutes.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/mrigankraj/assignment-submission-portal.git
   cd assignment-submission-portal
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/assignment_portal
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

### User Endpoints

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `POST /api/users/upload` - Upload an assignment
- `GET /api/users/admins` - Fetch all admins

### Admin Endpoints

- `POST /api/admins/register` - Register a new admin
- `POST /api/admins/login` - Admin login
- `GET /api/admins/assignments` - View assignments tagged to the admin
- `POST /api/admins/assignments/:id/accept` - Accept an assignment
- `POST /api/admins/assignments/:id/reject` - Reject an assignment

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.


## Layout of the final web-app 
![Screenshot (729)](https://github.com/user-attachments/assets/f5c10e24-af9e-4e4a-8d8e-8fddec54e78c)




## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
