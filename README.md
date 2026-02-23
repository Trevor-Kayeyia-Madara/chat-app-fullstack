# Real-Time Chat Application

## Overview

This project is a **full-stack real-time chat application** built using **SvelteKit** for the frontend, **Express.js** for the backend, and **MongoDB** for data storage. It demonstrates modern web development practices, including:

* Real-time communication with **Socket.IO**
* Persistent message storage in **MongoDB**
* Multi-room chat functionality
* Modular, maintainable code structure
* Dockerized environment for easy setup and deployment

This project is intended for **portfolio showcase**, demonstrating proficiency in full-stack web development, real-time applications, and containerized deployment.

---

## Features

* **User Authentication**: Simple username-based login system.
* **Real-Time Messaging**: Instant message delivery using Socket.IO.
* **Multi-Room Support**: Users can join multiple chat rooms.
* **Persistent Chat History**: Messages are stored in MongoDB for retrieval.
* **Responsive UI**: Built with SvelteKit and TailwindCSS for a clean, responsive interface.
* **Dockerized Environment**: Frontend, backend, and database run in isolated containers using Docker Compose.

---

## Technology Stack

| Layer            | Technology                                     |
| ---------------- | ---------------------------------------------- |
| Frontend         | SvelteKit, TailwindCSS, Socket.IO client       |
| Backend          | Node.js, Express.js, Socket.IO server, MongoDB |
| Database         | MongoDB (with Mongoose ORM)                    |
| Dev & Deployment | Docker, Docker Compose                         |

---

## Project Structure

```
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

## Installation

### Prerequisites

* Docker and Docker Compose installed
* Node.js (for local development, optional if using Docker)

### Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd chat-showcase
```

1. Start the application using Docker Compose:

```bash
docker-compose up --build
```

1. Access the application:

* Frontend: `http://localhost:3000`
* Backend API: `http://localhost:5000/api`

The MongoDB database runs internally at `mongodb://mongo:27017/chatapp`.

---

## Local Development (Optional)

### Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:5000`. Ensure MongoDB is running.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` (Vite default). Ensure backend is running for API and Socket.IO connections.

---

## Usage

1. Open the frontend in your browser.
2. Enter a username to join.
3. Select or create a chat room.
4. Start sending messages. Messages appear in real-time for all users in the same room.
5. Multiple rooms can be joined in separate tabs or browsers.

---

## Socket.IO Events

| Event            | Direction       | Payload                                  |
| ---------------- | --------------- | ---------------------------------------- |
| `joinRoom`       | Client → Server | `roomId` (string)                        |
| `sendMessage`    | Client → Server | `{ roomId, sender, content }`            |
| `receiveMessage` | Server → Client | `{ roomId, sender, content, timestamp }` |
| `disconnect`     | Server → Client | `socket.id`                              |

---

## Database Schema

**User Collection**

```json
{
  "_id": "ObjectId",
  "username": "string",
  "createdAt": "Date"
}
```

**Message Collection**

```json
{
  "_id": "ObjectId",
  "roomId": "string",
  "sender": "string",
  "content": "string",
  "timestamp": "Date"
}
```

**ChatRoom Collection**

```json
{
  "_id": "ObjectId",
  "name": "string",
  "members": ["string"],
  "createdAt": "Date"
}
```

---

## Deployment

* The app is fully containerized with Docker Compose.
* For production, the frontend can be built and served via a static server or Nginx, while the backend remains an Express API server.
* MongoDB can be replaced with a managed cloud service (e.g., MongoDB Atlas) for scalability.

---

## Future Improvements

* Implement full authentication with email/password and JWT.
* Add message read receipts and typing indicators.
* Enable file and media sharing in chat.
* Deploy on a cloud platform (e.g., DigitalOcean, AWS) with SSL.
* Horizontal scaling with Redis for Socket.IO pub/sub.

---

## License

This project is for **educational and showcase purposes**. No license restrictions apply.
