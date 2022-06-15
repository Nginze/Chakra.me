require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const authRoutes = require('./Routes/authRoutes')
const postRoutes = require('./Routes/postRoutes')
const commentRoutes = require('./Routes/commentRoutes')
const userRoutes = require('./Routes/userRoutes')
const notificationRoutes = require('./Routes/notificationRoutes')
const suggestionsRoutes = require('./Routes/suggestionRoutes')
require('dotenv').config()
require('./config/db.js')



app.use(session({

    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl:process.env.DATABASE_URI}),
    cookie: {maxAge: 180 * 60 * 1000}
  
}))
app.use(cors({
  origin:'http://localhost:3000',
  credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true, limit: '50mb'}))
app.use("/auth", authRoutes)
app.use("/comment", commentRoutes)
app.use("/post", postRoutes)
app.use("/user", userRoutes)
app.use("/notification", notificationRoutes)
app.use("/suggestion", suggestionsRoutes)


app.get('/', (req, res) => {

  res.send(`<p> Welcome to Anonymous</p>` )
  
})



app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})