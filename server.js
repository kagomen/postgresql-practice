const express = require('express')
const app = express()
const PORT = 5005

app.listen(PORT, () => {
  console.log('server listening on port')
})

app.get('/', (req, res) => {
  res.send('hello express')
})
