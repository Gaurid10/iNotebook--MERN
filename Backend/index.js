const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')


connectToMongo();
const app = express()
const port = 5000


app.use(cors())
app.use(express.json())

//Available routes
app.use('/api/abc', require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))



/*app.get('/', (req, res) => {
  res.send('Hello World!')
})*/

app.listen(port, () => {
  console.log(`iNoteBook backend listening at port http://localhost: ${port}`)
})