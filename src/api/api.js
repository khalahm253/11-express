'use strict';

import express from 'express';
import requireAll from 'require-dir';
const router = express.Router();

const models = requireAll('../models');
// const NOtes = require('./src/model/data);

console.log(models);

let getModel = (req, res) => {
  try {
    if (req.params.model && models[req.params.model]) {
      return models[req.params.model].default ? models[req.params.model].default : models[req.params.model];
    }
    throw `Model ${req.params.model} not found.`;
  }
  catch(err) {
    serverError(res, err);
  }
};

let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

let sendJSON204 = (res, data) => {
  res.statusCode = 204;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

let serverError = (res, err) => {
  let error = { error: err };
  res.statusCode = 404;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};

router.get('/api/v1/:model', (req, res) => {
  req.model.fetchAll()
    .then(data => sendJSON(res, data))
    .catch(err => serverError(res, err));
});

router.get('/api/v1/:model/:id', (req, res) => {
  let id = req.params.id;
  req.model.fetchOne(id)
    .then(data => sendJSON(res, data))
    .catch(err => serverError(res, err));
});

router.post('/api/v1/:model', (req, res) => {
  let record = new req.model(req.body);
  record.save()
    .then(data => sendJSON(res, data))
    .catch(err => serverError(res, err));
});

router.delete('/api/v1/:model/:id', (req, res) => {
  let id = req.params.id;
  req.model.deleteOne(id)
    .then(data => sendJSON204(res, data))
    .catch(err => serverError(res, err));
});

router.param('model', (req, res, next, value) => {
  req.model = getModel(req, res);
  next();
});


export default router;