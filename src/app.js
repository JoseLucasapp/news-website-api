require('dotenv').config()

const cors = require('cors')
const express = require('express')
require('./database/connection')

const PORT = process.env.PORT || 3000
const app = express()

const router = express.Router()

app.use(express.json())
app.use(cors())
app.use('/api', router)

require('./routes')(router)

router.get('/', (req, res) => {
    res.status(200).send('Home Page')
})

app.listen(PORT, () => console.log(`Running at  ${PORT}`))