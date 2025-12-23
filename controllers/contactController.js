import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

export const sendContactMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const contact = await Contact.create({ name, email, message });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            replyTo: email,
            subject: "📩 New Contact Message",
            html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
        });

        await transporter.sendMail({
            from: `"Mohd Subhan" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Thanks for contacting me 🙌",
            html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out! I’ve received your message and will get back to you as soon as possible.</p>
        <p><b>Your Message:</b></p>
        <blockquote>${message}</blockquote>
        <br/>
        <p>Best regards,</p>
        <p><b>Mohd Subhan</b></p>
      `,
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
