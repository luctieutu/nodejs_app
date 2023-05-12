import express from 'express';
import configViewEngine from './configs/viewengine';
import initWebRouter from './route/web';
import initAIPRouter from './route/api' ;
var morgan = require('morgan');
//import connection from './configs/connectDB';

require('dotenv').config()
const app = express()
const port = process.env.PORT||3000;

app.use((req, res, next) => {
  console.log('>>ckeck method:');
  console.log(req.method)
  next();
})

app.use(morgan('combined'))

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// setup view engine
configViewEngine(app);

//init web
initWebRouter(app);

// init aip route
initAIPRouter(app);

//handle 404 not found
app.use((req ,res) => {

  return res.render('404.ejs');

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})