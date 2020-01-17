const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
// const dotenv = require('dotenv');
// const config = require('./Config/config').get(process.env.NODE_ENV);
const public = path.join(process.env.PWD + '/Public');
const app = express();

const {
  DATABASE_URL,
  PORT
} = require('./Components/Config/config');
const {
  Mapping
} = require('./Components/Models/mappingModel');
const {
  router: calculationRouter
} = require('./Components/Routes/processFile');

const storage = multer.diskStorage({
  destination: './Components/Uploads/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

// mongoose.connect('mongodb://localhost:27017/mappingDataBase', {
//   useNewUrlParser: true,
// });
mongoose.Promise = global.Promise;

app.use(morgan('common'));
app.use(helmet({
  frameguard: false
}));
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(public));
app.use('/api/upload', calculationRouter);

// app.use(express.static('client/build'));

//* ROUTES

app.get('/mapping', (req, res) => {
  res.sendFile(path.join(public, 'mappingTable.html'));
});

app.get('/uploader', (req, res) => {
  res.sendFile(path.join(public, 'payrollUploaderUpdate.html'));
});

//* Get Routes
app.get('/api/getMap', function (req, res) {
  let id = req.query.companyID;

  Mapping.findOne({
    companyID: `${id}`
  }, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });

});

//* Post Routes
// Create new mapping
app.post('/api/createMap', (req, res) => {
  const mapping = new Mapping(req.body);

  mapping.save((err, doc) => {
    if (err) return res.send(err);
    res.status(200).json({
      success: true,
      mapping: doc,
    });
  });
});

//* UPDATE
app.post('/api/map_update', (req, res) => {
  Mapping.findByIdAndUpdate(
    req.body._id,
    req.body, {
      new: true
    },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json({
        success,
        doc,
      });
    }
  );
});

//* FILE UPLOAD ROUTE
app.post('/api/upload', (req, res) => {

})

//* Delete
app.delete('/api/delete_mapping', (req, res) => {
  if (err) return res.status(400).send(err);
  res.json(true);
});

//* Catch All
app.use('*', function (req, res) {
  res.status(404).json({
    message: 'Not Found'
  });
});

// RUN / CLOSE SERVER

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  // let database = config.DATABASE;
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {
  app,
  runServer,
  closeServer
};