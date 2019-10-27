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
  console.log({
    event,
    context
  });
  const Email = get(event, 'queryStringParameters.Email');
  const Name = get(event, 'queryStringParameters.Name');
  const Message = get(event, 'queryStringParameters.Message');
  console.log({
    Email,
    Name,
    Message
  });
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
    subject: (process.env.NODE_ENV || '') + ' outreach email ' + new Date().toLocaleString(),
    text: `
            from: ${Email}
            name: ${Name}
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