# Hi there! This is my Inventory Management System (Docker-Based)

This project is a fully containerized inventory management system that includes:

- ✅ React Frontend (served by Nginx)
- ✅ Flask Backend API (RESTful)
- ✅ MongoDB Database

## Which means
> You don't need to install Node.js, Python, pip, or MongoDB!
>
> With Docker installed, you can run the entire system with a single command.

---

## 📦 Prerequisites

### ✅ Install Docker Desktop

If you haven’t installed Docker yet:

- **Windows**: https://www.docker.com/products/docker-desktop
- **macOS**: https://www.docker.com/products/docker-desktop

Once installed, open Docker Desktop and make sure it’s **running**.

---

## 🚀 Getting Started

### 1️⃣ Clone this repository

```bash
git clone https://github.com/xiaoyu-2000/732-docker-deploy.git
cd 732-docker-deploy
```

> Alternatively, you can copy this entire folder if shared via USB.

---

### 2️⃣ Start all services (frontend, backend, and MongoDB)

```bash
docker compose up --build
```

This will:
- Build the frontend (React)
- Build the backend (Flask)
- Start MongoDB
- Launch everything in connected containers

---

## 🌐 System Access

| Service   | Address                  |
|-----------|--------------------------|
| Frontend  | http://localhost:3000    |
| Backend API | http://localhost:5000 |
| MongoDB   | mongodb://localhost:27017 |

---

## 🛑 Stop the System

To stop all running services:

- Press `Ctrl + C` in the terminal
- Or use:

```bash
docker compose down
```

---

## 🧱 Project Structure

```
732-docker-deploy/
├── docker-compose.yml         # Docker orchestration
├── frontend/                  # React frontend
│   ├── Dockerfile
│   ├── nginx.conf             # SPA route support for React Router
│   └── (React source files)
├── backend/                   # Flask backend
│   ├── Dockerfile
│   └── (Flask source files)
└── README.md
```

---

## 🔁 Routing Note for React

To ensure routes like `/charts`, `/products`, etc., don’t return 404 in Nginx, the following config is used in `frontend/nginx.conf`:

```nginx
location / {
  try_files $uri /index.html;
}
```

This ensures proper routing for all React SPA paths.

---

## 💬 Troubleshooting

| Problem | Solution |
|--------|----------|
| Docker not found | Make sure Docker Desktop is installed and running |
| Port already in use | Edit `docker-compose.yml` and change ports |
| React routes 404 | Make sure `nginx.conf` is present and copied in Dockerfile |
| Data not saving | MongoDB volume is preserved unless manually removed |

---

## 🧠 Developer Tip

You can freely edit the code in `frontend/` or `backend/`, then run:

```bash
docker compose down
docker compose up --build
```

To apply changes and rebuild the system.

---

Enjoy the app!  
Feel free to fork, deploy, and improve! 🎉