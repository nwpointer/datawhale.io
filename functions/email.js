var { get } = require('lodash');
const sgMail = require('@sendgrid/mail');

export function handler(event, context, callback) {
    console.log({ event, context })
    const Email = get(event, 'queryStringParameters.Email')
    const Name = get(event, 'queryStringParameters.Name')
    const Message = get(event, 'queryStringParameters.Message')
    console.log({ Email, Name, Message })

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'datawhalesite@gmail.com',
        from: Email,
        subject: (process.env.NODE_ENV || '') + ' outreach email ' + new Date().toLocaleString(),
        text: `
from: ${Email}
name: ${Name}
message: 
${Message}
        `
    };
    sgMail
        .send(msg)
        .then(() => {
            callback(null, {
                statusCode: 200,
                body: "Ok"
            })
        })
        .catch(error => {
            callback(error);
        })
}