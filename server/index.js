import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'
import authRoutes from './routes/users/authentication.js'
import usersRoutes from './routes/users/user.js'
import adminRoutes from './routes/admin/adminAuth.js'
import hotelRoutes from './routes/hotel/hotel.js'
import {
  poolASABA,
  poolASOKORO,
  poolELVIS,
  poolHYATTI,
  poolIKEJARES,
  poolIMPERIAL,
  poolKANO,
  poolNESTGARKI,
  poolNESTIB,
  poolPLATINUM,
  poolROYALPARKLANE,
  poolSMITHCITY,
  poolTRANSTELL
} from './utilities/pool.js'
const app = express()
const server = http.createServer(app)

// Middleware
dotenv.config()
app.use(
  cors({
    origin: '*'
  })
)
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Register User
app.use('/auth', authRoutes)
app.use('/user', usersRoutes)
app.use('/admin', adminRoutes)
app.use('/hotel', hotelRoutes)

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

const testDbConnection = (pool, label) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(`Database connection to ${label} failed:`, err)
    } else {
      console.log(`Connected to ${label} successfully!`)
      connection.release()
    }
  })
}

testDbConnection(poolNESTIB, 'NestIBSQL')
testDbConnection(poolASABA, 'AsabaSQL')
testDbConnection(poolROYALPARKLANE, 'RoyalParkLaneSQL')
testDbConnection(poolKANO, 'KanoSQL')
testDbConnection(poolPLATINUM, 'PlatinumSQL')
testDbConnection(poolHYATTI, 'HyattiSQL')
testDbConnection(poolSMITHCITY, 'SmithCitySQL')
testDbConnection(poolNESTGARKI, 'NestGarkiSQL')
testDbConnection(poolIMPERIAL, 'ImperialSQL')
testDbConnection(poolELVIS, 'ElvisSQL')
testDbConnection(poolASOKORO, 'AsokoroSQL')
testDbConnection(poolTRANSTELL, 'TranstellSQL')
testDbConnection(poolIKEJARES, 'IkejaResSQL')

app.listen(5001, console.log('server is up and running '))
