require("dotenv").config()
const express = require('express')

const prisma = require('./utils/prisma')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const trajetRoute = require('./routes/trajet')

const app = express()

app.use(express.json())
app.use('/auth',authRoute)
app.use('/trajet',trajetRoute)
app.use('/user',userRoute)


const PORT = process.env.PORT || 5000

const start = async () => {
    await prisma.$connect().then(()=>{
        app.listen(PORT, () => {
            console.log(`Server started on PORT ${PORT}`);
          });
    }).catch((err)=>{
        console.log(err)
    })
}

start ()