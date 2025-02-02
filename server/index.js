const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Hotel = require('./model/hotelModel');
const { error } = require('console');


require('./model/UserDetails');
app.use(express.json())


// Json webtoken 
const jwtSecret = crypto.randomBytes(64).toString('hex');

// Mongo db Connection
const mongoUrl = "mongodb+srv://mikecheq5:GMxS40xnuCn8Jwp0@cluster0.sz9xp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose
.connect(mongoUrl)
.then(()=>{console.log("Database Connected successfully")})
.catch((e)=>{
console.log(e)
})

// Fetching Userschema from Db
const User = mongoose.model('UserInfo');


// Configure your email transporter
const transporter = nodemailer.createTransport({
    host: 'mail.bonhotelsinternational.com', // Commonly used SMTP host format for custom domains
    port: 465, // For SSL
    secure: true, // Use true for port 465, false for port 587
    auth: {
      user: 'ea@bonhotelsinternational.com', // Full email address
      pass: '0~q^NNVW', // Email password (use environment variables for security)
    },
  });
  
  // Function to send welcome email
  const sendWelcomeEmail = (email, firstName) => {
    const mailOptions = {
      from: 'ea@bonhotelsinternational.com', // Sender address
      to: email, // Recipient email
      subject: 'Welcome to Our App!',
      html: `<h1>Welcome, ${firstName}!</h1>
             <p>Thank you for registering with Bon Hotels. We're excited to have you onboard.</p>
             <p>If you have any questions, feel free to contact us at yellowtrumpethotels@gmail.com.</p>
             <p>Best regards,<br>The Team</p>`,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };
  

// Register User
app.post("/register", async(req, res)=>{
    const {firstName, lastName, email, password, phoneNumber} = req.body;
const oldUser= await User.findOne({email:email});
if(oldUser){
    return res.send({data: "User already exist!!"})
}

const encryptedPassword = await bcrypt.hash(password, 10)
    try{
        await User.create({
            firstName,
            lastName,
            email, 
            password:encryptedPassword,
            phoneNumber 
        });
        sendWelcomeEmail(email, firstName);
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
    
          // Generate JWT token
          const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });
          return res.status(200).json({ status: 'ok', data: token })
        });
        sendWelcomeEmail(user.email);
      })
      .catch(err => {
        res.status(500).json({ status: 'error', message: 'Server error' });
      });
    
})

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
  

  
app.get('/', (req, res)=>{
res.send('Hello server connected')
})
app.listen(5001, console.log('server is up and running '));
