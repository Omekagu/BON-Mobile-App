import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
require('dotenv').config()

dotenv.config()

// Create a transporter using Hostinger's SMTP server
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 587, // or use 465 for SSL
  secure: false, // Set to true if using SSL (port 465)
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD // Your email password
  },
  tls: {
    rejectUnauthorized: false // Optional but can help in some environments
  }
})

// Verify the transporter is ready
transporter.verify((error, success) => {
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Server is ready to take messages.')
  }
})

// Function to send a welcome email
const sendLoginEmail = (email, firstName) => {
  const mailOptions = {
    from: 'ea@bonhotelsinternational.com', // Sender address
    to: email, // Recipient email
    subject: 'Welcome to Our App!',
    html: `<h1>Welcome, ${firstName}!</h1>
           <p>Thank you for registering with Bon Hotels. We're excited to have you onboard.</p>
           <p>If you have any questions, feel free to contact us at support@bonhotels.com.</p>
           <p>Best regards,<br>The Team</p>`
  }

  // Send the email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err)
    } else {
      console.log('Email sent:', info.response)
    }
  })
}
// sendWelcomeEmail('testedeye@gmail.com', 'Omekagu Chukwuebuka');

// Function to send welcome email
const sendWelcomeEmail = (email, firstName) => {
  const mailOptions = {
    from: 'bonhotels68@gmail.com', // Sender address
    to: email, // Recipient email
    subject: 'Welcome to Our App!',
    html: `<h1>Welcome, ${firstName}!</h1>
           <p>Thank you for registering with Bon Hotels. We're excited to have you onboard.</p>
           <p>If you have any questions, feel free to contact us at yellowtrumpethotels@gmail.com.</p>
           <p>Best regards,<br>The Team</p>`
  }

  // Send the email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err)
    } else {
      console.log('Email sent:', info.response)
    }
  })
}

export default { sendLoginEmail, sendWelcomeEmail }
