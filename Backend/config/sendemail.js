import { Resend } from 'resend';
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.RESEND_API){
    console.log("Provide RESEND_API inside the .env file")
}


const resend = new Resend(process.env.RESEND_API);

const sendEmail = async({sendto,subject,html}) =>{
    try{
        const { data, error } = await resend.emails.send({
            from: 'Grocerly <onboarding@resend.dev>',
            to: sendto,
            subject: subject,
            html: html,
        });

        if (error) {
            return console.error({ error });
          }
        
        return data

    }catch(error){
        console.log(error)
    }
}


export default sendEmail

// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// // Ensure environment variables exist
// if (!process.env.MY_EMAIL || !process.env.MY_EMAIL_PASSWORD) {
//   console.log("Please provide MY_EMAIL and MY_EMAIL_PASSWORD in your .env file.");
// }

// // Nodemailer transporter setup using Gmail
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.MY_EMAIL,
//     pass: process.env.MY_EMAIL_PASSWORD, // Use app password if Gmail has 2FA
//   },
// });

// /**
//  * Send an email
//  * @param {Object} param0
//  * @param {string} param0.sendto - recipient email address
//  * @param {string} param0.subject - email subject
//  * @param {string} param0.html - HTML content of the email
//  */
// const sendEmail = async ({ sendto, subject, html }) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Grocerly" <${process.env.MY_EMAIL}>`,
//       to: sendto,
//       subject: subject,
//       html: html,
//     });

//     console.log("Message sent: %s", info.messageId);
//     return info;
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// export default sendEmail;


