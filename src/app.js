'use strict';

// const express = require('express');
import express from 'express';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

import router from './api/api.js';
app.use(router);

let isRunning = false;

module.exports = {
  start: (port) => {
    if (!isRunning) {
      app.listen(port, (err) => {
        if (err) { throw err; }
        isRunning = true;
        console.log(`Server Is Up On Port ${port}`);
      });
    } else {
      console.log('Server Is Already Running');
    }
  }, 
  stop: () => {
    app.close( () => {
      isRunning = false; 
      console.log('Server Has Been Stopped');
    });
  } // eslint-disable-line
};