import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    text: any; // check this one
}


const sendEmail = (options: EmailOptions) => {

    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:Number(process.env.EMAIL_PORT),
        auth: {
            user:process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },   
    });
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text

    }
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
}

export default sendEmail;