"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

// import {get} from 'lodash'
// import nodemailer from 'nodemailer';
var {
  get
} = require('lodash');

var nodemailer = require('nodemailer');

function handler(event, context, callback) {
  const Email = get(event, 'queryStringParameters.Email');
  const Message = get(event, 'queryStringParameters.Message');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.BOT_EMAIL,
      pass: process.env.BOT_PASSWORD
    }
  });
  transporter.sendMail({
    from: Email,
    to: process.env.SEND_TO,
    subject: process.env.NODE_ENV + ' outreach email ' + new Date().toLocaleString(),
    text: `
            from: ${Email}
            message: 
            ${Message}
        `
  }, function (error, info) {
    if (error) {
      callback(error);
    } else {
      callback(null, {
        statusCode: 200,
        body: "Ok"
      });
    }
  });
}