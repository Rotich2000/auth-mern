import nodemailer from 'nodemailer'
import Mailgen from 'mailgen';

/**POST: http://localhost:8080/api/registerMail
 *@param:{
    "username": 'brian',
     "userEmai" 'admin1235',
     "text": "Thank you for joining us...",
     "subject": "Welcome to Kentronix"
 } 
 */

/** send mail from real gmail account */
export const sendMail = async(req,res) => {
    const {username,userEmail,text,subject} = req.body;
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER, // generated ethereal user
            pass: process.env.GMAIL_PASS, // generated ethereal password
        },
    }
    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'KENTRONIX',
            link: 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name: username || "Kentronix",
            intro:text || "Thank you for joining us",
            table: {
                data: [
                    {
                        item: "Revenue Management System",
                        description: "Developed by Kentronix software engineers",
                        link: "https://www.kentronix.tech"
                    }
                ]
            },
            outro: "Looking forward to help you manage your funds."
        }
    }

    let mail = await MailGenerator.generate(response);

    let message = {
        from: process.env.GMAIL_USER, // sender address
        to: userEmail, // list of receivers
        subject: subject || 'Welcome to Kentronix', // Subject line
        html: mail // html body
    }
    transporter.sendMail(message, (error, info) => {
        if (error) {
            res.status(500).send({error});
        } else {
            res.status(201).send({message: `Email sent: ${info.response}`});
        }
    })

}