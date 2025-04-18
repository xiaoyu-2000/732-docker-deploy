# Hi there! This is my Inventory Management Flask APP (Docker-Based)

### This project is a fully containerized inventory management system that includes:

- ✅ React Frontend
- ✅ Flask Backend API
- ✅ MongoDB Database

### Which means
> You don't need to install Node.js, Python, pip, or MongoDB!
> With Docker installed, you can run the entire system with a **single command**.

---

## 📦 Prerequisites

### 0️⃣ Install Docker Desktop

If you haven’t installed Docker yet:

- **Windows**: https://www.docker.com/products/docker-desktop  
- **macOS**: https://www.docker.com/products/docker-desktop

Once installed, open Docker Desktop and make sure it’s **running**.

I strongly recommend you use **Google Chrome** browser:
- https://www.google.com/chrome/

---

## 🚀 Getting Started

### 1️⃣ Clone this repository

```bash
git clone https://github.com/xiaoyu-2000/732-docker-deploy.git

cd 732-docker-deploy
```


### 2️⃣ Start all services (frontend, backend, and MongoDB)

```bash
docker compose up --build
```

This will:
- Build the frontend (React)
- Build the backend (Flask)
- Start MongoDB
- Launch everything in connected containers

### 🕙 Please wait patiently for about 3 minutes while Docker installs the necessary dependencies.


## 🌐 System Access

| Service       | Address                  |
|---------------|--------------------------|
| Frontend UI   | http://localhost:3000    |
| Backend API   | http://localhost:5000    |
| MongoDB (URI) | mongodb://localhost:27019 |

---
## ⚠️ Browser Compatibility Recommendation
### ✅ Recommended: Chrome ✅
### ❌ Not recommended: Safari ❌
#### (may block cross-site cookies, which can prevent proper login and access to protected resources)

## 🛑 Stop the System

To stop all running services:

- Press `Ctrl + C` in the terminal
- Or use:

```bash
docker compose down
```

## 😄 Usage Introduction
#### This is a web-based inventory management system built with a Python Flask backend and a React frontend.

### To login, please use 

| Email       | Password                  |
|---------------|--------------------------|
|  lu@lu.com  |  lu   |


#### With this app, you can:

- ✅ Add, delete, and search for products

- ✅ Upload product images

- ✅ View your inventory list in real time

#### Highlight features include:

- 📊 Pie charts and bar charts showing inventory status, generated by the python backend

- 📁 CSV export of your full inventory data

- 📈 An interactive chart view located at the bottom of the left sidebar, rendered in React using live backend data

All chart visualizations are powered by Python and displayed interactively on the frontend, delivering a smooth and insightful user experience.
