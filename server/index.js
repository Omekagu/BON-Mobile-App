const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// const nodemailer = require('nodemailer');
const Hotel = require('./model/hotelModel');
const Otp = require('./model/Otpmodel')
const Admin = require('./model/Admin')
const User = require('./model/UserDetails')
const Booking = require('./model/Booking')
const cors = require("cors");



app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// ✅ Configure CORS properly
const allowedOrigins = ["http://localhost:3000", "http://172.20.10.3:5001"];



require('./model/UserDetails');
app.use(express.json())


// Json webtoken 
const jwtSecret = crypto.randomBytes(64).toString('hex');

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Mongo db Connection
const mongoUrl = "mongodb+srv://mikecheq5:GMxS40xnuCn8Jwp0@cluster0.sz9xp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose
.connect(mongoUrl)
.then(()=>{console.log("Database Connected successfully")})
.catch((e)=>{
console.log(e)
})


// const transporter = nodemailer.createTransport({
//   host: "smtp.office365.com",
//   port: 587,
//   secure: false, // Must be false for TLS (true for SSL)
//   auth: {
//     user: "ea@bonhotelsinternational.com",
//     pass: "0~q^NNVW",
//   },
//   tls: {
//     rejectUnauthorized: false, // May help bypass SSL errors, but not recommended for production
//   },
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Error:", error);
//   } else {
//     console.log("Server is ready to take messages.");
//   }
// });
  
  // // Function to send welcome email
  // const sendWelcomeEmail = (email, firstName) => {
  //   const mailOptions = {
  //     from: 'bonhotels68@gmail.com', // Sender address
  //     to: email, // Recipient email
  //     subject: 'Welcome to Our App!',
  //     html: `<h1>Welcome, ${firstName}!</h1>
  //            <p>Thank you for registering with Bon Hotels. We're excited to have you onboard.</p>
  //            <p>If you have any questions, feel free to contact us at yellowtrumpethotels@gmail.com.</p>
  //            <p>Best regards,<br>The Team</p>`,
  //   };
  
  //   // Send the email
  //   transporter.sendMail(mailOptions, (err, info) => {
  //     if (err) {
  //       console.error('Error sending email:', err);
  //     } else {
  //       console.log('Email sent:', info.response);
  //     }
  //   });
  // };
  

// Register User
app.post("/register", async(req, res)=>{
    const {
      username,
      email,
      password,
      phoneNumber,
      profileImage,
      deviceType,
      userCountry,
    } = req.body;
const oldUser= await User.findOne({email:email});
if(oldUser){
    return res.send({data: "User already exist!!"})
}

const encryptedPassword = await bcrypt.hash(password, 10)
    try{
        await User.create({
          username,
          email,
          password: encryptedPassword,
          phoneNumber,
          profileImage,
          deviceType,
          userCountry,
        });
        // sendWelcomeEmail(email, firstName);
        console.log( username,
          email,
          password,
          phoneNumber,
          profileImage,
          deviceType,
          userCountry,)
        res.send({status:"ok",data:  "User Created Successfully" })
    }catch(error){
        res.send({status: "error", data: error})
    }
});


// Login User
app.post('/login', async(req,res)=>{
    const { email, password } = req.body;
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return res.status(404).json({ status: 'error', message: 'No record found' });
        }
    
        // Compare password with hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return res.status(500).json({ status: 'error', message: 'Server error' });
          }
    
          if (!isMatch) {
            return res.status(401).json({ status: 'error', message: 'Invalid password' });
          }
    
          // ✅ Generate JWT Token with `userId`
          const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "30m" });
          // ✅ Send userId along with token
          res.status(200).json({
            status: "ok",
            data: { token, userId: user._id },
          });
        });
        // sendWelcomeEmail(user.email);
      })
      .catch(err => {
        res.status(500).json({ status: 'error', message: 'Server error' });
      });
    
})

// ✅ Ensure your backend route is POST
app.get("/userData", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.json({ message: "Token is valid", userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// **📌 Admin Login Route**
app.post("/admin/login", async (req, res) => {
  console.log("Received login request:", req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found:", email);
      return res.status(404).json({ error: "Admin not found" });
    }

    console.log("Admin found:", admin);

    // const isMatch = await bcrypt.compare(password, admin.password);
    // if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ email: admin.email }, jwtSecret, { expiresIn: "1h" });
    console.log("Token generated:", token);
    res.json({ token });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// **📌 Protected Route (Example)**
app.get("/api/protected", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    res.json({ message: "Authorized access", user: decoded });
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
});



// 📌 1️⃣ Send OTP
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    
    const otp = generateOTP();
    await Otp.create({ email, otp });
    console.log(email,otp)

    // // Send email
    // await transporter.sendMail({
    //   from: 'bonhotels68@gmail.com',
    //   to: email,
    //   subject: 'Password Reset OTP',
    //   text: `Your OTP is ${otp}. It expires in 5 minutes.`
    // });

    res.json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP' });
    console.log(error)
  }
});

// 📌 2️⃣ Verify OTP
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) return res.status(400).json({ message: 'Invalid OTP or expired' });

    res.json({ message: 'OTP Verified' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP' });
  }
});

// 📌 3️⃣ Reset Password
app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' });
  }
});

app.post('/userData', async(req, res)=>{
    const {token} = req.body;
    try {
        const decoded = jwt.verify(token, jwtSecret); // Ensure `token` is a valid string
        const userEmail = decoded.email;
        User.findOne({email: userEmail})
        .then((data) => {
            return res.send({status: 'ok', data: data})
        })
    } catch (error) {
        return res.send({error: error})
    }


})


// Get list of hotels 
app.get('/hotels', async(req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels)
        // console.log(hotels)
    } catch (error) {
        rmSync.status(500).json({error: 'Failed to fetch hotels'})
    }
})

// Get hotel by ID
app.get('/hotels/:id', async(req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if(!hotel) return res.status(404).json({error: 'Hotel not found'});
        res.json(hotel);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch hotel'})
    }
})

// Hotel search by name
// Search hotels by name or related name
app.get("/hotels/search/:name", async (req, res) => {
    try {
      const { name } = req.params; // Get the name from the URL parameter
      if (!name) return res.status(400).json({ error: "Hotel name is required" });
  
      const hotels = await Hotel.find({ name: { $regex: name, $options: "i" } }); // Case-insensitive search
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ error: "Failed to search hotels" });
    }
  });
  
  app.post('/book', async (req, res) => {
    try {
        const { userId, hotelId, checkInDate, checkOutDate, checkInTime, guests, rooms, totalPrice } = req.body;

        console.log("Received Booking Data:", req.body);  // Log received data

        // Convert totalPrice to a number (remove commas if present)
        const formattedTotalPrice = typeof totalPrice === "string" ? Number(totalPrice.replace(/,/g, "")) : totalPrice;

        if (isNaN(formattedTotalPrice)) {
            return res.status(400).json({ error: 'Invalid totalPrice value' });
        }

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) return res.status(404).json({ error: 'Hotel not found' });

        const newBooking = new Booking({
            userId,
            hotelId,
            checkInDate,
            checkOutDate,
            checkInTime,
            guests,
            rooms,
            totalPrice: formattedTotalPrice, // Save formatted number
            status: "Completed",
        });

        await newBooking.save();
        res.status(201).json({ status: "ok", message: "Booking successful", booking: newBooking });
    } catch (error) {
        console.error("Server Error:", error);  // Log the actual error
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

  
app.get("/bookings/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ status: "error", message: "User ID is required" });
    }

    const bookings = await Booking.find({ userId }) // Fetch only the user's bookings
      .populate("hotelId", "name");

    res.status(200).json({ status: "ok", data: bookings });
  } catch (error) {
    console.error("🔥 Booking Fetch Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

  
app.get('/', (req, res)=>{
res.send('Hello server connected')
})
app.listen(5001, console.log('server is up and running '));
