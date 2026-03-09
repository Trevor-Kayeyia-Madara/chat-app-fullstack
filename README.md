# Real-Time Chat App Showcase

A web-based real-time chat application demonstrating modern full-stack development. It highlights real-time messaging, multi-room chat, persistent data storage, and horizontal scaling with Redis pub/sub for Socket.IO.

## Project Overview

- Frontend: SvelteKit + TailwindCSS
- Backend: Express.js + Socket.IO
- Database: MongoDB
- Realtime Scaling: Redis adapter for Socket.IO pub/sub
- Dockerized: Fully containerized for local development and deployment

Local URLs:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API + Socket.IO: [http://localhost:5000](http://localhost:5000)

## Features

- Real-time messaging via Socket.IO
- Multi-room chat (join/create rooms)
- Persistent chat history in MongoDB
- Responsive UI (TailwindCSS)
- Dockerized environment with reproducible setup
- Horizontal Socket.IO scaling with Redis pub/sub

## Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend | SvelteKit, TailwindCSS, Socket.IO client |
| Backend | Node.js, Express.js, Socket.IO server |
| Database | MongoDB (Mongoose) |
| Realtime Adapter | `@socket.io/redis-adapter`, `redis` |
| Dev/Deployment | Docker, Docker Compose |

## Architecture and Folder Structure

```text
chat-showcase/
+- backend/
�  +- server.js
�  +- package.json
�  +- routes/
�     +- auth.js
�     +- messages.js
+- frontend/
�  +- package.json
�  +- svelte.config.js
�  +- tailwind.config.cjs
�  +- src/
�     +- routes/
�     �  +- +page.svelte
�     �  +- chat/[roomId]/+page.svelte
�     +- lib/
�     �  +- stores.js
�     �  +- socket.js
�     +- app.css
+- docker-compose.yml
+- README.md
```

## Screenshots

- Login / Room Selector: `[Insert Screenshot Link]`
- Chat Room: `[Insert Screenshot Link]`
- Multi-Room Chat / Message Flow: `[Insert Screenshot Link]`

## Code Highlights

Socket.IO client setup (`frontend/src/lib/socket.js`):

```js
import { io } from "socket.io-client";
export const socket = io("http://localhost:5000");
```

Real-time message handling (`frontend/src/routes/chat/[roomId]/+page.svelte`):

```js
socket.emit("joinRoom", roomId);
socket.on("receiveMessage", (msg) => {
  messages.update((m) => [...m, msg]);
});
```

Backend Socket.IO broadcast (`backend/server.js`):

```js
io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    io.to(data.roomId).emit("receiveMessage", data);
  });
});
```

## Horizontal Scaling with Redis (Socket.IO Pub/Sub)

Install backend dependencies:

```bash
cd backend
npm i @socket.io/redis-adapter redis
```

Update `backend/server.js`:

```js
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

const pubClient = createClient({ url: process.env.REDIS_URL || "redis://redis:6379" });
const subClient = pubClient.duplicate();

await pubClient.connect();
await subClient.connect();

io.adapter(createAdapter(pubClient, subClient));
```

Add Redis service in `docker-compose.yml`:

```yaml
services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
```

Scale backend instances:

```bash
docker compose up --build --scale backend=3
```

This allows messages emitted by one backend instance to be delivered to clients connected through other backend instances.

## Quick Start

```bash
git clone <repository-url>
cd chat-showcase
docker compose up --build
```

Then open [http://localhost:3000](http://localhost:3000).

## Future Enhancements

- Full authentication (JWT + email/password)
- Typing indicators and read receipts
- File/media sharing
- Cloud deployment with SSL (DigitalOcean, AWS, Azure)
