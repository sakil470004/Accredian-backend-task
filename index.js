// create express app
const express = require("express");
const app = express();
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
// for node mailer
const nodemailer = require("nodemailer");
app.use(cors());
app.use(express.json());
// configure env variables
require("dotenv").config();
// create prisma client instance;
const prisma = new PrismaClient();
const port = 5000;
// crate transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

app.post("/addRefer", async (req, res) => {
  const user = req.body;
  console.log(user);
  try {
    const result = await prisma.referral.create({
      data: user,
    });

    // for sending email
    const mailOptions = await {
      from: {
        name: "Referral App",
        address: user?.referrerEmail,
      },
      to: user?.refereeEmail,
      subject: "You have been referred!",
      text: `Hi ${user?.refereeName},\n\n${user?.referrerName} has referred you to download this app`,
    };
    await transporter.sendMail(mailOptions);
    res.json({ message: "Referral Send SuccessFully", data: result }); // Send the created user object as a response
  } catch (error) {
    res.status(400).send({ message: error.message }); // Send error message if something goes wrong
  }
});
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
