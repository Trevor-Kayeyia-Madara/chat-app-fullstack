const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());
/*
const mongoose = require('mongoose');


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Chat App DB connected'))
.catch(err => console.error(err));
*/
// Test route
app.get('/', (req, res) => res.send('Chat App API running'));

// Socket.io setup
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', socket => {
    console.log('A user connected');
    socket.on('disconnect', () => console.log('User disconnected'));
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
