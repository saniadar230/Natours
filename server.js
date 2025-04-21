const mongoose = require('mongoose');
const dotenv = require('dotenv');
// reads variables from file and saves them into node process

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
console.log(process.env);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    // console.log(con.connection);
    console.log('DB connection successful');
  });

const app = require('./app');
// node.js internally needs the variables inside this
// these variables come from process core-moduel and were set
// the time the process started
// didnt require process module, it automatically exists globally
// in express, many packages depend on a special variable called node n -> defines whether we're in devlopment or production mode
// express doesn't define this so we have to do it manually
// console.log(process.env);
// global variable to define the environemnt in which node is running
// this env here is set by express but node also sets
// console.log(app.get('env'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// 1) can set through console
// not practical if we want to write a lot of env variables
// NODE_ENV=development nodemon server.js

// handles rejected promises (like database not connecting)
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  // this allows any pending requests to be completed and then the server shuts down
  server.close(() => {
    process.exit(1);
  });
});
