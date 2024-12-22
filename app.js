const CONFIG = require('./config/config')
const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const signup = require('./routes/signup')
const login = require('./controllers/login')
const blog = require('./routes/blog')
const PORT = process.env.PORT
const Article = require('./models/Article'); // Adjust the path accordingly

const app = express()

console.log(CONFIG.DATABASE_CONNECT_STRING)

require('./middleware/db')(CONFIG.DATABASE_CONNECT_STRING)

app.use(express.json())
app.use
app.get("/", (req, res) => {
  res.send("Blog API HomePage");
});

app.use('/api/signup', signup)
app.use('/api/login', login)
app.use('/api/blog', blog)

setInterval(async () => {
  await Article.publishDrafts();
}, 60 * 1000); // Runs every minute
//app.listen(PORT, ()=> {
//  console.log(`Server is listening at port :${PORT}`)
//})

app.listen(PORT, () => {
  console.log(`App is listening at port: ${PORT}`);
});