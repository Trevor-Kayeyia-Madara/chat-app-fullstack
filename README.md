# Real-Time Chat App Showcase

A web-based real-time chat application demonstrating modern full-stack development. This project highlights real-time messaging, multi-room chat, and persistent data storage, making it a strong portfolio piece for full-stack web development.

---

## Project Overview

- **Frontend:** SvelteKit + TailwindCSS  
- **Backend:** Express.js + Socket.IO  
- **Database:** MongoDB  
- **Dockerized:** Fully containerized for easy local development and deployment  

**Live Demo (Local)**  

- Frontend: [http://localhost:3000](http://localhost:3000)  
- Backend API & Socket.IO: [http://localhost:5000](http://localhost:5000)  

**Start all services with Docker Compose:**

```bash
git clone <repository-url>
cd chat-showcase
docker-compose up --build
````

---

## Features

- Real-Time Messaging: Instant delivery of messages via Socket.IO
- Multi-Room Chat: Users can join or create multiple rooms
- Persistent Chat History: Messages stored in MongoDB for retrieval
- Responsive UI: Mobile-friendly interface built with TailwindCSS
- Dockerized Setup: Easy reproducibility for development and deployment

---

## Technology Stack

| Layer            | Technology                               |
| ---------------- | ---------------------------------------- |
| Frontend         | SvelteKit, TailwindCSS, Socket.IO client |
| Backend          | Node.js, Express.js, Socket.IO server    |
| Database         | MongoDB (Mongoose ORM)                   |
| Deployment & Dev | Docker, Docker Compose                   |

---

## Architecture & Folder Structure

```text
chat-showcase/
├─ backend/
│  ├─ server.js
│  ├─ package.json
│  └─ routes/
│      ├─ auth.js
│      └─ messages.js
├─ frontend/
│  ├─ package.json
│  ├─ svelte.config.js
│  ├─ tailwind.config.cjs
│  ├─ src/
│      ├─ routes/
│      │   ├─ +page.svelte
│      │   └─ chat/[roomId]/+page.svelte
│      ├─ lib/
│      │   ├─ stores.js
│      │   └─ socket.js
│      └─ app.css
├─ docker-compose.yml
└─ README.md
```

---

## Screenshots

Insert screenshots here to visually showcase the app:

**Login / Room Selector:**
`[Insert Screenshot Link]`

**Chat Room:**
`[Insert Screenshot Link]`

**Multi-Room Chat / Message Flow:**
`[Insert Screenshot Link]`

---

## Code Highlights

**Socket.IO Client Setup** (`frontend/src/lib/socket.js`):

```javascript
import { io } from "socket.io-client";
export const socket = io("http://localhost:5000");
```

**Real-Time Message Handling** (`chat/[roomId]/+page.svelte`):

```javascript
socket.emit("joinRoom", roomId);
socket.on("receiveMessage", (msg) => {
  messages.update((m) => [...m, msg]);
});
```

**Backend Socket.IO** (`backend/server.js`):

```javascript
io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    io.to(data.roomId).emit("receiveMessage", data);
  });
});
```

---

## Quick Start

```bash
git clone <repository-url>
cd chat-showcase
docker-compose up --build
```

Open the app at [http://localhost:3000](http://localhost:3000) and start chatting.

---

## Future Enhancements

- Full authentication (JWT + email/password)
- Typing indicators and read receipts
- File/media sharing
- Deployment to cloud with SSL (DigitalOcean, AWS, etc.)
- Horizontal scaling using Redis for Socket.IO pub/sub
