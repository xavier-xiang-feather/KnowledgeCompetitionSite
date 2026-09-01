# Knowledge Competition Site

A full-stack quiz web application that allows users to take quizzes and provides authenticated users with tools to manage a question bank. The project includes user authentication, quiz scoring, and question management features.

## Features

### Quiz
- Take quizzes with multiple-choice questions
- Prevent users from continuing without selecting an answer
- Automatically track quiz progress and score

### Question Bank
- View all questions and their answer options
- Add new questions with 2-6 options
- Edit existing questions, including question text, answer options, and correct answer
- Delete questions
- Store questions and answer options in a MySQL database

### User Authentication
- Register and log in with a username and password
- Authenticate users using JSON Web Tokens (JWT)
- Protect question management routes from unauthorized access
- Maintain login sessions using tokens stored in the browser

### Run the entire project
From the root directory:
```bash
npm run dev
```

## Getting Started

### Run the Client and Server separately
Client: 
```bash
cd client
npm run dev
```

Server:
```bash
cd server
npm start
```

## Environment Variables
Create a `.env` file in the server directory and configure the required environment variables.

Example:

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```



