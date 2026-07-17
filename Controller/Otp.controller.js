const nodemailer = require("nodemailer");

const sendOTP = async (Email , otp) => {
        const transporter = nodemailer.createTransport({
            service: "gmail", auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }

        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: Email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}. It will expire in 10 minutes.`
        });
};


module.exports = { sendOTP };