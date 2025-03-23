// Json webtoken
const jwtSecret = crypto.randomBytes(64).toString('hex')

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString()

app.get('/rooms', (req, res) => {
  pool.query('SELECT * FROM wp_vikbooking_rooms', (err, results) => {
    if (err) {
      console.error('Database Query Error:', err)
      return res.status(500).send(err)
    }
    res.json(results)
  })
})
app.get('/dispcost', (req, res) => {
  pool.query('SELECT * FROM wp_vikbooking_dispcost', (err, results) => {
    if (err) {
      console.error('Database Query Error:', err)
      return res.status(500).send(err)
    }
    res.json(results)
  })
})

// ROUTES
app.use('/room')

// // Create a transporter using Hostinger's SMTP server
// const transporter = nodemailer.createTransport({
//   host: 'smtp.hostinger.com',
//   port: 587, // or use 465 for SSL
//   secure: false, // Set to true if using SSL (port 465)
//   auth: {
//     user: 'ea@bonhotelsinternational.com', // Your email address
//     pass: '0~q^NNVW' // Your email password
//   },
//   tls: {
//     rejectUnauthorized: false // Optional but can help in some environments
//   }
// })

// // Verify the transporter is ready
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Error:', error)
//   } else {
//     console.log('Server is ready to take messages.')
//   }
// })

// // Function to send a welcome email
// const sendLoginEmail = (email, firstName) => {
//   const mailOptions = {
//     from: 'ea@bonhotelsinternational.com', // Sender address
//     to: email, // Recipient email
//     subject: 'Welcome to Our App!',
//     html: `<h1>Welcome, ${firstName}!</h1>
//            <p>Thank you for registering with Bon Hotels. We're excited to have you onboard.</p>
//            <p>If you have any questions, feel free to contact us at support@bonhotels.com.</p>
//            <p>Best regards,<br>The Team</p>`
//   }

//   // Send the email
//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       console.error('Error sending email:', err)
//     } else {
//       console.log('Email sent:', info.response)
//     }
//   })
// }
// // sendWelcomeEmail('testedeye@gmail.com', 'Israel Adeyeye');

// // Function to send welcome email
// const sendWelcomeEmail = (email, firstName) => {
//   const mailOptions = {
//     from: 'bonhotels68@gmail.com', // Sender address
//     to: email, // Recipient email
//     subject: 'Welcome to Our App!',
//     html: `<h1>Welcome, ${firstName}!</h1>
//            <p>Thank you for registering with Bon Hotels. We're excited to have you onboard.</p>
//            <p>If you have any questions, feel free to contact us at yellowtrumpethotels@gmail.com.</p>
//            <p>Best regards,<br>The Team</p>`
//   }

//   // Send the email
//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       console.error('Error sending email:', err)
//     } else {
//       console.log('Email sent:', info.response)
//     }
//   })
// }

// Login User
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ status: 'error', message: 'No record found' })
      }

      // Compare password with hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res
            .status(500)
            .json({ status: 'error', message: 'Server error' })
        }

        if (!isMatch) {
          return res
            .status(401)
            .json({ status: 'error', message: 'Invalid password' })
        }

        // ✅ Generate JWT Token with `userId`
        const token = jwt.sign({ userId: user._id }, jwtSecret, {
          expiresIn: '30m'
        })
        // ✅ Send userId along with token
        res.status(200).json({
          status: 'ok',
          data: { token, userId: user._id }
        })
      })
      sendLoginEmail(user.email, user.username)
    })
    .catch(err => {
      res.status(500).json({ status: 'error', message: 'Server error' })
    })
})

// ✅ Ensure your backend route is POST
app.get('/userData', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1] // Extract token

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, jwtSecret)
    res.json({ message: 'Token is valid', userId: decoded.userId })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

// **📌 Admin Login Route**
app.post('/admin/login', async (req, res) => {
  console.log('Received login request:', req.body)
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' })
  }

  try {
    const admin = await Admin.findOne({ email })
    if (!admin) {
      console.log('Admin not found:', email)
      return res.status(404).json({ error: 'Admin not found' })
    }

    console.log('Admin found:', admin)

    // const isMatch = await bcrypt.compare(password, admin.password);
    // if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ email: admin.email }, jwtSecret, {
      expiresIn: '1h'
    })
    console.log('Token generated:', token)
    res.json({ token })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// **📌 Protected Route (Example)**
app.get('/api/protected', (req, res) => {
  const token = req.headers['authorization']
  if (!token) return res.status(401).json({ error: 'No token provided' })

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
    res.json({ message: 'Authorized access', user: decoded })
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' })
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'error', error })
  }
})

// 📌 1️⃣ Send OTP
app.post('/send-otp', async (req, res) => {
  const { email } = req.body
  console.log('Received email:', email)

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'User not found' })

    const otp = generateOTP()
    await Otp.create({ email, otp })
    // console.log(email, otp)

    // Send email
    await transporter.sendMail({
      from: 'ea@bonhotelsinternational.com',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`
    })

    res.json({ message: 'OTP sent to email' })
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP' })
    console.log(error)
  }
})

// 📌 2️⃣ Verify OTP
app.post('/verify-otp', async (req, res) => {
  const email = req.body.email.toLowerCase() // Convert to lowercase
  const otp = req.body.otp
  console.log('Received OTP:', otp, 'for email:', email)

  try {
    const otpRecord = await Otp.findOne({ email, otp })
    if (!otpRecord)
      return res.status(400).json({ message: 'Invalid OTP or expired' })

    res.json({ message: 'OTP Verified' })
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP' })
  }
})

// 📌 3️⃣ Reset Password
app.post('/reset-password', async (req, res) => {
  const email = req.body.email.toLowerCase() // Convert to lowercase
  const newPassword = req.body.newPassword

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await User.findOneAndUpdate({ email }, { password: hashedPassword })

    res.json({ message: 'Password reset successful' })
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' })
  }
})

app.post('/userData', async (req, res) => {
  const { token } = req.body
  try {
    const decoded = jwt.verify(token, jwtSecret) // Ensure `token` is a valid string
    const userEmail = decoded.email
    User.findOne({ email: userEmail }).then(data => {
      return res.send({ status: 'ok', data: data })
    })
  } catch (error) {
    return res.send({ error: error })
  }
})

// Get list of hotels
app.get('/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find()
    res.json(hotels)
    // console.log(hotels)
  } catch (error) {
    rmSync.status(500).json({ error: 'Failed to fetch hotels' })
  }
})

// Get hotel by ID
app.get('/hotels/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' })
    res.json(hotel)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotel' })
  }
})

// Hotel search by name
app.get('/hotels/search/:name', async (req, res) => {
  try {
    const { name } = req.params // Get the name from the URL parameter
    if (!name) return res.status(400).json({ error: 'Hotel name is required' })

    const hotels = await Hotel.find({ name: { $regex: name, $options: 'i' } }) // Case-insensitive search
    res.json(hotels)
  } catch (error) {
    res.status(500).json({ error: 'Failed to search hotels' })
  }
})

//Get Menu
app.get('/menu/:hotelId', async (req, res) => {
  try {
    const { hotelId } = req.params
    const hotel = await Hotel.findById(hotelId).populate('menu')

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' })
    }

    res.status(200).json(hotel.menu)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu', error })
  }
})

//post a menu
app.post('/create-menu/:hotelId', async (req, res) => {
  try {
    const { hotelId } = req.params

    // First, check if the hotel exists
    const hotel = await Hotel.findById(hotelId)
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' })
    }

    // Create and save the menu
    const newMenu = new Menu({
      hotel: hotelId,
      ...req.body
    })
    const savedMenu = await newMenu.save()

    // Add the menu reference to the hotel document
    hotel.menu.push(savedMenu._id)
    await hotel.save()

    res
      .status(201)
      .json({ message: 'Menu created and linked to hotel', menu: savedMenu })
  } catch (error) {
    res.status(500).json({ message: 'Error creating menu', error })
  }
})

// booking completed
app.post('/book', async (req, res) => {
  try {
    const {
      userId,
      hotelId,
      checkInDate,
      checkOutDate,
      checkInTime,
      guests,
      rooms,
      totalPrice
    } = req.body

    console.log('Received Booking Data:', req.body) // Log received data

    // Convert totalPrice to a number (remove commas if present)
    const formattedTotalPrice =
      typeof totalPrice === 'string'
        ? Number(totalPrice.replace(/,/g, ''))
        : totalPrice

    if (isNaN(formattedTotalPrice)) {
      return res.status(400).json({ error: 'Invalid totalPrice value' })
    }

    const hotel = await Hotel.findById(hotelId)
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' })

    const newBooking = new Booking({
      userId,
      hotelId,
      checkInDate,
      checkOutDate,
      checkInTime,
      guests,
      rooms,
      totalPrice: formattedTotalPrice, // Save formatted number
      status: 'Completed'
    })

    await newBooking.save()
    res.status(201).json({
      status: 'ok',
      message: 'Booking successful',
      booking: newBooking
    })
  } catch (error) {
    console.error('Server Error:', error) // Log the actual error
    res.status(500).json({ error: 'Server error', details: error.message })
  }
})

// fetch booked room based on userid
app.get('/bookings/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res
        .status(400)
        .json({ status: 'error', message: 'User ID is required' })
    }

    const bookings = await Booking.find({ userId }) // Fetch only the user's bookings
      .populate('hotelId', 'name')

    res.status(200).json({ status: 'ok', data: bookings })
  } catch (error) {
    console.error('🔥 Booking Fetch Error:', error)
    res.status(500).json({ status: 'error', message: error.message })
  }
})

// Delete a booking
app.delete('/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid booking ID' })
    }

    const deletedBooking = await Booking.findByIdAndDelete(id)

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    res.json({ message: 'Booking deleted successfully' })
  } catch (error) {
    console.error('Error deleting booking:', error)
    res
      .status(500)
      .json({ message: 'Error deleting booking', error: error.message })
  }
})

app.get('/', (req, res) => {
  res.send('Hello server connected')
})
