import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import mysql from 'mysql2'
import dotenv from 'dotenv'
import authRoutes from './routes/users/authentication.js'
import usersRoutes from './routes/users/user.js'
const app = express()
const server = http.createServer(app)

// Middleware
dotenv.config()
app.use(cors())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())

// Register User
app.use('/auth', authRoutes)
app.use('/user', usersRoutes)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})
// Handle Socket.IO connections
io.on('connection', socket => {
  console.log('New client connected: ', socket.id)

  // Listen for user location updates
  socket.on('userLocation', location => {
    console.log('User location updated: ', location)
    // Broadcast the user's location to all connected clients
    io.emit('updateUserLocation', location)
  })

  // Listen for delivery person's location updates
  socket.on('deliveryLocation', location => {
    console.log('Delivery location updated: ', location)
    // Broadcast the delivery person's location to all connected clients
    io.emit('updateDeliveryLocation', location)
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected: ', socket.id)
  })
})

// Mongo db Connection
const mongoUrl =
  'mongodb+srv://mikecheq5:GMxS40xnuCn8Jwp0@cluster0.sz9xp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('MongoDB Connected successfully')
  })
  .catch(e => {
    console.log(e)
  })

// Mysql
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err)
  } else {
    console.log('✅ Connected to MySQL database successfully!')
    connection.release() // Release connection back to the pool
  }
})

app.listen(5001, console.log('server is up and running '))
