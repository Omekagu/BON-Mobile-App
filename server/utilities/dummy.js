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
// app.use('/room')

app.get('/', (req, res) => {
  res.send('Hello server connected')
})
