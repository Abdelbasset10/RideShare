const express = require('express')
const app = express()

const start = () => {
    app.listen(5000,()=>{
        console.log('Server is starting on port 5000...')
    })
}

start ()