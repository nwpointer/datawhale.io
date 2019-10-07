"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _lodash = require("lodash");

function handler(event, context, callback) {
  // const Email = get(event, 'queryStringParameters.Email')
  // const Message = get(event, 'queryStringParameters.Message')
  // let transporter = nodemailer.createTransport({
  //     host: 'smtp.gmail.com',
  //     port: 465,
  //     secure: true,
  //     auth: {
  //         type: 'OAuth2',
  //         user: process.env.MAIL_LOGIN,
  //         clientId: process.env.CLIENT_ID,
  //         clientSecret: process.env.CLIENT_SECRET,
  //         refreshToken: process.env.REFRESH_TOKEN,
  //         accessToken: process.env.ACCESS_TOKEN
  //     }
  // });
  // var transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //         user: 'datawhailsite',
  //         pass: 'supercoolpassword1'
  //     }
  // });
  // transporter.sendMail({
  //     from: process.env.MAIL_LOGIN,
  //     to: process.env.MAIL_TO,
  //     subject: process.env.SUBJECT + new Date().toLocaleString(),
  //     text: event.body
  // }, function(error, info) {
  // 	if (error) {
  // 		callback(error);
  // 	} else {
  // 		callback(null, {
  // 		    statusCode: 200,
  // 		    body: "Ok"
  //     	});
  // 	}
  // });
  callback(null, {
    statusCode: 200,
    body: 'hia'
  });
}