import nodemailer from "nodemailer";

const Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendEmailData {
  to: {
    name: string;
    address: string;
  };
  subject: string;
  body: string;
}

export default {
  async sendEmail(message: SendEmailData) {
    return await Transporter.sendMail({
      from: {
        name: "E-Commerce team's",
        address: "e-commerce@commerce.com",
      },
      to: {
        name: message.to.name,
        address: message.to.address,
      },
      subject: message.subject,
      html: message.body,
    }).catch((error) => console.log(error));
  },
};
