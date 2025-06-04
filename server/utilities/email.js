import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

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
export const sendLoginEmail = (email, firstname) => {
  const mailOptions = {
    from: '"BON Hospitality" <ea@bonhotelsinternational.com>', // Sender address
    to: email, // Recipient email
    subject: `Welcome back, ${firstname}! Your BON Hospitality Experience Awaits 🎉`,
    html: `
      <div style="background-color:#f6f8fa;padding:32px 0;font-family:sans-serif;color:#222;">
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.07);overflow:hidden;">
          <div style="background-color:#a63932;padding:24px 0;text-align:center;">
            <img src="https://i.postimg.cc/MG16r5JF/BON-Hotel-logo.png" alt="BON Hospitality Logo" width="180" style="margin-bottom:10px;" />
            <h1 style="margin:10px 0 0 0;color:#fff;">Welcome Back, ${firstname}!</h1>
          </div>
          <div style="padding:32px;">
            <p style="font-size:18px;">Dear ${firstname},</p>
            <p>We are thrilled to see you return to the BON Hospitality App. Your presence means a lot to us, and we’re honored to be part of your travel and hospitality journey.</p>
            
            <hr style="margin:24px 0;border:none;border-top:1px solid #eee;"/>

            <p>Our mission is to ensure you enjoy exceptional stays and memorable experiences at every BON hotel around the world.</p>
            
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Hospitality" width="100%" style="border-radius:8px;margin:18px 0;"/>
            
            <p>Here’s what’s waiting for you:</p>
            <ul style="font-size:16px;line-height:1.7;">
              <li>🌟 Exclusive member-only offers and rates</li>
              <li>🏨 Priority access to new properties and events</li>
              <li>📝 Effortless booking and seamless check-in</li>
              <li>📱 Manage your reservations with our user-friendly app</li>
              <li>🤝 Personalized recommendations tailored for you</li>
              <li>🎁 Earn points & enjoy rewards with every stay</li>
              <li>🍽️ Curated dining and wellness experiences</li>
              <li>🛎️ 24/7 support for all your hospitality needs</li>
            </ul>
            
            <p>We encourage you to explore new features and plan your next getaway. If you have any questions or need assistance, our support team is just a message away at <a href="mailto:support@bonhotels.com">support@bonhotels.com</a>.</p>
            
            <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" alt="BON Experience" width="100%" style="border-radius:8px;margin:18px 0;"/>
            
            <p>Ready to start your next adventure? <a href="https://bonhotels.com" style="color:#a63932;text-decoration:underline;">Book your stay now</a> and let us handle the rest!</p>
            
            <blockquote style="font-style:italic;color:#a63932;border-left:4px solid #a63932;padding-left:12px;margin:24px 0;">
              “At BON Hospitality, every guest is family. Welcome home, ${firstname}!”
            </blockquote>
            
            <p>Thank you for being a valued member of the BON Hospitality community.</p>

            <p style="margin-bottom:8px;">Warm regards,</p>
            <p style="font-weight:bold;margin-bottom:32px;">The BON Hospitality Team</p>
            <div style="font-size:13px;color:#888;margin-top:40px;">
              <img src="https://i.postimg.cc/MG16r5JF/BON-Hotel-logo.png" alt="BON Hospitality Logo" width="80" style="margin-bottom:10px;" />
              <p>
                © ${new Date().getFullYear()} BON Hotels International. All rights reserved.<br/>
                <a href="https://bonhotels.com/privacy-policy" style="color:#a63932;">Privacy Policy</a> &nbsp;|&nbsp;
                <a href="https://bonhotels.com/terms-conditions" style="color:#a63932;">Terms & Conditions</a>
              </p>
              <p>
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="16" style="vertical-align:middle;" /> 
                <a href="https://facebook.com/bonhotels" style="color:#a63932;">Facebook</a> &nbsp;|&nbsp;
                <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" width="16" style="vertical-align:middle;"/> 
                <a href="https://instagram.com/bonhotels" style="color:#a63932;">Instagram</a> &nbsp;|&nbsp;
                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="16" style="vertical-align:middle;"/> 
                <a href="https://twitter.com/bonhotels" style="color:#a63932;">Twitter</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `
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

// Function to send welcome email
export const sendWelcomeEmail = (email, firstname) => {
  const mailOptions = {
    from: '"BON Hospitality" <ea@bonhotelsinternational.com>', // Sender address
    to: email, // Recipient email
    subject: `Welcome to Our App  ${firstname} 🥳🎉!!!!`,
    html: `
      <div style="background-color:#f6f8fa;padding:32px 0;font-family:sans-serif;color:#222;">
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.07);overflow:hidden;">
          <div style="background-color:#a63932;padding:24px 0;text-align:center;">
            <img src="https://i.postimg.cc/MG16r5JF/BON-Hotel-logo.png" alt="BON Hospitality Logo" width="180" style="margin-bottom:10px;" />
            <h1 style="margin:10px 0 0 0;color:#fff;">Welcome Back, ${firstname}!</h1>
          </div>
          <div style="padding:32px;">
            <p style="font-size:18px;">Dear ${firstname},</p>
            <p>We are thrilled to have you BON Hospitality App. Your presence means a lot to us, and we’re honored to be part of your travel and hospitality journey.</p>
            
            <hr style="margin:24px 0;border:none;border-top:1px solid #eee;"/>

            <p>Our mission is to ensure you enjoy exceptional stays and memorable experiences at every BON hotel around the world.</p>
            
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Hospitality" width="100%" style="border-radius:8px;margin:18px 0;"/>
            
            <p>Here’s what’s waiting for you:</p>
            <ul style="font-size:16px;line-height:1.7;">
              <li>🌟 Exclusive member-only offers and rates</li>
              <li>🏨 Priority access to new properties and events</li>
              <li>📝 Effortless booking and seamless check-in</li>
              <li>📱 Manage your reservations with our user-friendly app</li>
              <li>🤝 Personalized recommendations tailored for you</li>
              <li>🎁 Earn points & enjoy rewards with every stay</li>
              <li>🍽️ Curated dining and wellness experiences</li>
              <li>🛎️ 24/7 support for all your hospitality needs</li>
            </ul>
            
            <p>We encourage you to explore new features and plan your next getaway. If you have any questions or need assistance, our support team is just a message away at <a href="mailto:support@bonhotels.com">support@bonhotels.com</a>.</p>
            
            <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" alt="BON Experience" width="100%" style="border-radius:8px;margin:18px 0;"/>
            
            <p>Ready to start your next adventure? <a href="https://bonhotels.com" style="color:#a63932;text-decoration:underline;">Book your stay now</a> and let us handle the rest!</p>
            
            <blockquote style="font-style:italic;color:#a63932;border-left:4px solid #a63932;padding-left:12px;margin:24px 0;">
              “At BON Hospitality, every guest is family. Welcome home, ${firstname}!”
            </blockquote>
            
            <p>Thank you for being a valued member of the BON Hospitality community.</p>

            <p style="margin-bottom:8px;">Warm regards,</p>
            <p style="font-weight:bold;margin-bottom:32px;">The BON Hospitality Team</p>
            <div style="font-size:13px;color:#888;margin-top:40px;">
              <img src="https://i.postimg.cc/MG16r5JF/BON-Hotel-logo.png" alt="BON Hospitality Logo" width="80" style="margin-bottom:10px;" />
              <p>
                © ${new Date().getFullYear()} BON Hotels International. All rights reserved.<br/>
                <a href="https://bonhotels.com/privacy-policy" style="color:#a63932;">Privacy Policy</a> &nbsp;|&nbsp;
                <a href="https://bonhotels.com/terms-conditions" style="color:#a63932;">Terms & Conditions</a>
              </p>
              <p>
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="16" style="vertical-align:middle;" /> 
                <a href="https://facebook.com/bonhotels" style="color:#a63932;">Facebook</a> &nbsp;|&nbsp;
                <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" width="16" style="vertical-align:middle;"/> 
                <a href="https://instagram.com/bonhotels" style="color:#a63932;">Instagram</a> &nbsp;|&nbsp;
                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="16" style="vertical-align:middle;"/> 
                <a href="https://twitter.com/bonhotels" style="color:#a63932;">Twitter</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `
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

// Add this near the top of your file

export const bookingCompletedTemplate = ({
  firstname,
  hotelDetails,
  checkInDate,
  checkOutDate,
  checkInTime,
  guests,
  nights,
  rooms,
  totalPrice,
  status
}) => {
  const hotelName = hotelDetails?.name || 'BON Hotel'
  const hotelAddress = hotelDetails?.address || ''
  const hotelImage =
    hotelDetails?.image ||
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'

  return `
    <div style="background-color:#f6f8fa;padding:32px 0;font-family:sans-serif;color:#222;">
      <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.07);overflow:hidden;">
        <div style="background-color:#a63932;padding:24px 0;text-align:center;">
          <img src="https://i.postimg.cc/MG16r5JF/BON-Hotel-logo.png" alt="BON Hospitality Logo" width="160" style="margin-bottom:10px;" />
          <h1 style="margin:10px 0 0 0;color:#fff;">Booking ${
            status === 'Completed' ? 'Confirmed' : 'Received'
          }</h1>
        </div>
        <div style="padding:32px;">
          <p style="font-size:18px;">Dear ${firstname},</p>
          <p>
            Thank you for your ${
              status === 'Completed' ? 'completed' : 'pending'
            } booking at <strong>${hotelName}</strong>!<br>
            We are delighted to have you stay with us and look forward to providing a wonderful experience.
          </p>
          <img src="${hotelImage}" alt="${hotelName}" width="100%" style="border-radius:8px;margin:18px 0;"/>
          <h2 style="color:#a63932;">Booking Details</h2>
          <table style="width:100%;font-size:16px;border-collapse:collapse;margin-bottom:18px;">
            <tr>
              <td style="padding:6px 0;"><strong>Hotel:</strong></td>
              <td style="padding:6px 0;">${hotelName}</td>
            </tr>
            ${
              hotelAddress
                ? `<tr>
                      <td style="padding:6px 0;"><strong>Address:</strong></td>
                      <td style="padding:6px 0;">${hotelAddress}</td>
                    </tr>`
                : ''
            }
            <tr>
              <td style="padding:6px 0;"><strong>Check-In:</strong></td>
              <td style="padding:6px 0;">${checkInDate.toLocaleString()} (${checkInTime.toLocaleString()})</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Check-Out:</strong></td>
              <td style="padding:6px 0;">${checkOutDate}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Guests:</strong></td>
              <td style="padding:6px 0;">${guests}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Nights:</strong></td>
              <td style="padding:6px 0;">${nights}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Rooms:</strong></td>
              <td style="padding:6px 0;">${rooms}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Total Price:</strong></td>
              <td style="padding:6px 0;">₦${Number(
                totalPrice
              ).toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Status:</strong></td>
              <td style="padding:6px 0;">${status}</td>
            </tr>
          </table>
          <hr style="margin:24px 0;border:none;border-top:1px solid #eee;"/>
          <p>
            If you have any questions or need assistance with your booking, please contact our team at
            <a href="mailto:support@bonhotels.com" style="color:#a63932;">support@bonhotels.com</a>.
          </p>
          <p>
            We can't wait to welcome you!
          </p>
          <p style="margin-bottom:8px;">Kind regards,</p>
          <p style="font-weight:bold;margin-bottom:32px;">The BON Hospitality Team</p>
          <div style="font-size:13px;color:#888;margin-top:40px;">
            <img src="https://i.postimg.cc/MG16r5JF/BON-Hotel-logo.png" alt="BON Hospitality Logo" width="80" style="margin-bottom:10px;" />
            <p>
              © ${new Date().getFullYear()} BON Hotels International. All rights reserved.<br/>
              <a href="https://bonhotels.com/privacy-policy" style="color:#a63932;">Privacy Policy</a> &nbsp;|&nbsp;
              <a href="https://bonhotels.com/terms-conditions" style="color:#a63932;">Terms & Conditions</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `
}

export const sendBookingCompletedEmail = async ({
  email,
  firstname,
  hotelDetails,
  checkInDate,
  checkOutDate,
  checkInTime,
  guests,
  nights,
  rooms,
  totalPrice,
  status
}) => {
  const subject = `Booking Confirmation – ${hotelDetails?.name || 'BON Hotel'}`
  const html = bookingCompletedTemplate({
    firstname,
    hotelDetails,
    checkInDate,
    checkOutDate,
    checkInTime,
    guests,
    nights,
    rooms,
    totalPrice,
    status
  })

  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: '"BON Hospitality" <ea@bonhotelsinternational.com>',
        to: email,
        subject,
        html
      },
      (err, info) => {
        if (err) {
          console.error('Error sending booking email:', err)
          reject(err)
        } else {
          console.log('Booking email sent:', info.response)
          resolve(info)
        }
      }
    )
  })
}
