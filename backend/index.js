const connectToMongo = require ("./db");
const express = require('express')
var cors = require("cors")
connectToMongo();
const app = express()
const port = 5000
app.use(cors())

//Below will not print undefined if we write in body of thunderclient
app.use(express.json())
//Available Routes
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))
// cors used so we can see localhost in browser


// app.get('/api/signup', (req, res) => {
//   res.send('Hello Mihir signup please!')
// })

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})
