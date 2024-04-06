import { MailOptionType } from "@/types";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const sendEmail = async (options: MailOptionType) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions: MailOptionType = {
    from: options.from,
    to: process.env.EMAIL as string,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  transporter.sendMail(
    mailOptions,
    function (err: Error | null, info: SMTPTransport.SentMessageInfo) {
      if (err) throw err;
      // console.log(info);
    }
  );
};

export default sendEmail;
