require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//rest of the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

//import db 
const connectDB = require('./db/connect')


// routers

const authRouter = require('./routes/authRoutes')


//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandleMiddleWare = require('./middleware/error-handler')

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log(req.cookies)
    res.send('This is my first page')
})

app.use('/api/v1/auth', authRouter);


app.use(notFoundMiddleware)
app.use(errorHandleMiddleWare)

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
