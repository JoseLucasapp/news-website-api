import { config } from 'dotenv'
config()

import cors from 'cors'
import express from 'express'

const PORT = process.env.PORT || 3000
const app = express()
const router = express.Router()

app.use(express.json())
app.use(cors())
app.use(router)

router.get('/', (req, res) => {
    res.status(200).send('Home Page')
})

app.listen(PORT, () => console.log(`Running at  ${PORT}`))