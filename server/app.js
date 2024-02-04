require("dotenv").config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
var multer = require('multer');


const corsOptions = require("./config/cors");

const prisma = require('./utils/prisma')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const trajetRoute = require('./routes/trajet')
const reservationRoute = require('./routes/reservation')
const refreshRoute = require('./routes/refresh')

const app = express()
var upload = multer();

app.use(cors(corsOptions));
app.use(express.json())
app.use(upload.array()); 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth',authRoute)
app.use('/trajet',trajetRoute)
app.use('/user',userRoute)
app.use('/reservation',reservationRoute)
app.use('refresh',refreshRoute)

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