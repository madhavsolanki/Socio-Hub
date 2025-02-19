# 🌟 Socio Hub - A MERN Stack Social Media Platform

## 🚀 Introduction
Welcome to **Socio Hub**, a feature-rich social media platform built using the **MERN stack**. Socio Hub enables users to seamlessly connect, share, and engage with posts, messages, and a growing community in real-time.

## 🛠️ Tech Stack
- **Frontend:** React.js, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Real-time Communication:** Socket.io
- **Cloud Storage:** Cloudinary

---

## ✨ Features
✅ User Authentication (Register/Login/Logout)  
✅ Create, Like, and Comment on Posts  
✅ Follow/Unfollow Users  
✅ Real-time Messaging using WebSockets  
✅ Profile Customization & Suggested Users  
✅ Bookmark & Delete Posts  
✅ Secure API Endpoints with JWT  
✅ Responsive UI/UX  

---

## 📁 Project Structure
```
📦 Socio Hub
├── 📂 backend
│   ├── 📂 controllers
│   ├── 📂 database
│   ├── 📂 middlewares
│   ├── 📂 models
│   ├── 📂 routes
│   ├── 📂 socket
│   ├── app.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── 📂 frontend
    ├── 📂 src
    │   ├── 📂 components
    │   ├── 📂 pages
    │   ├── 📂 redux
    │   ├── 📂 hooks
    │   ├── 📂 utils
    │   ├── main.jsx
    │   ├── App.jsx
    │   └── index.css
    ├── .env
    ├── package.json
    └── vite.config.js
```

---

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/socio-hub.git
cd socio-hub
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and configure:
```env
PORT=your_port
CLIENT_URL=your_client_url
MONGODB_URI=your_mongodb_uri
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Run the backend server:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📌 API Endpoints

### 🔹 User Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/users/register` | Register a new user |
| `POST` | `/api/v1/users/login` | Login user |
| `GET` | `/api/v1/users/logout` | Logout user |
| `GET` | `/api/v1/users/:id/profile` | Get user profile |
| `POST` | `/api/v1/users/profile/edit` | Update user profile |
| `GET` | `/api/v1/users/suggested` | Get suggested users |
| `POST` | `/api/v1/users/followorunfollow/:id` | Follow/Unfollow user |

### 🔹 Post Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/post/addpost` | Create a new post |
| `GET` | `/api/v1/post/all` | Get all posts |
| `GET` | `/api/v1/post/userpost/all` | Get user's posts |
| `GET` | `/api/v1/post/:id/like` | Like a post |
| `GET` | `/api/v1/post/:id/dislike` | Dislike a post |
| `POST` | `/api/v1/post/:id/comment` | Add comment to post |
| `POST` | `/api/v1/post/:id/comment/all` | Get all comments of a post |
| `DELETE` | `/api/v1/post/delete/:id` | Delete a post |
| `POST` | `/api/v1/post/:id/bookmark` | Bookmark a post |

### 🔹 Message Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/message/send/:id` | Send a message |
| `GET` | `/api/v1/message/all/:id` | Get all messages between two users |

---

## 🎮 Running the Project
To run both frontend and backend simultaneously, use:
```bash
# In the backend directory
npm run dev
# In the frontend directory
npm run dev
```

Once both servers are running, open **http://localhost:5173** in your browser to explore **Socio Hub**. 🎉

---

## 🤝 Contributing
We welcome contributions! 🚀 Feel free to fork this repo, create a new branch, and submit a **pull request** with your improvements.

---

## 📬 Contact
📧 Email: [madhav09solanki@gmail.com](mailto:madhav09solanki@gmail.com)

---

## ⭐ Show Some Love!
If you found this project helpful, don't forget to give it a **star** ⭐ on GitHub!

Happy Coding! 🚀🎉

