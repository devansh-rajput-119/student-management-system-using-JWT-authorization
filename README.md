# student-management-system-using-JWT-authorization
A Student Management System built using Node.js, Express, and MongoDB with secure JWT-based authentication. It includes user registration, login functionality, password hashing using bcrypt, and protected routes. All APIs are tested using Postman to ensure proper working and security. Designed with a clean and scalable backend structure.
## 🧪 API Testing (Postman)

All backend APIs have been tested using Postman to ensure proper functionality and security.

### 🔹 Register User
- **Method:** POST  
- **URL:** http://localhost:4000/register  
- **Body (JSON):**
{
  "username": "admin",
  "email": "admin@gmail.com",
  "password": "11223344"
}

---

### 🔹 Login User
- **Method:** POST  
- **URL:** http://localhost:4000/login  
- **Body (JSON):**
{
  "username": "admin",
  "password": "11223344"
}

- **Response:** Returns JWT Token

---

### 🔹 Access Protected Route
- **Method:** GET  
- **URL:** http://localhost:4000/protected  

- **Headers:**
Authorization: Bearer YOUR_JWT_TOKEN

---

### 🔐 Security
- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Protected routes require valid token

---

### ⚙️ Tools Used
- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- Postman
