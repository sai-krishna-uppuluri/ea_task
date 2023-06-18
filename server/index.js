const express = require("express")
const mongoose = require('mongoose')
require('dotenv').config()



//const { auth } = require('express-openid-connect');
//auth0 config
// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: 'a long, randomly-generated string stored in env',
//     baseURL: 'http://localhost:3000',
//     clientID: 'SAsEDZ2hdKzIfKpF6IcNSQ2iTcFlJuYg',
//     issuerBaseURL: 'https://dev-ppie40izddhsg555.us.auth0.com'
//   };


const User = require('./models/user.model')

const app = express()

const cors = require('cors')


//app.use(auth(config));
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb+srv://logintest:logintest@cluster0.ixhd5pi.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log("DATABASE CONNECTED")
).catch(err => console.log(error))


app.post("/api/register" , async (request , response) => {
   // console.log(request.body)
   try {
        const user = await User.create({
        email : request.body.email,
        password : request.body.password
     })

        response.json({
        status : 'ok'
        })
    
   } catch (error) {
     console.log(error)
     response.json({status : 'error' , error : 'duplicate'})
   }

  
})

app.post("/api/login" , async (request , response) => {
    // console.log(request.body)
  
         const user = await User.findOne({
         email : request.body.email,
         password : request.body.password
         } )

        if (user) {
            
            return response.json({status : 'ok' , user: true})
            
        }
        else {
            return response.json({status : 'error' , user : false})
            
        }
 

})


app.listen(4000 , () => {
    console.log("Node started")
})