import { Resend } from "resend";
import ejs from "ejs";
import path from "path";

exports.sendEmail = (userInfo, subject, template) => {
    const resend = new Resend(process.env.RESEND_KEY);
    const templatePath = path.join(__dirname, template);
    return new Promise((resolve, reject) => {
      ejs.renderFile(templatePath, { userInfo }, (err, data) => {
        if (err) {
          reject(new Error("Error rendering email template"));
        } else {
          resend.emails.send({
            from: 'Event Management System <' + process.env.RESEND_EMAIL + '>',
            to: userInfo.email,
            subject,
            html: data
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });
  };
  
