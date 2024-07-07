const express = require('express');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const cors = require('cors')
const prisma = new PrismaClient();
const app = express();
const port = 5000;

app.use(cors)
app.use(express.json());
app.get('/addUser',async(req,res)=>{
  // get data from body
  const user = req.body;
  

  
  console.log('here')
  try {
    const newUser = await prisma.user.create({
        data: user,
    });
    res.json(newUser); // Send the created user object as a response
} catch (error) {
    res.status(400).send(error.message); // Send error message if something goes wrong
}
})

app.post('/api/referrals', async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

  try {
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
      },
    });
    res.status(201).json(referral);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


app.post('/api/referrals', async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

  try {
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
      },
    });

    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: refereeEmail,
      subject: 'You have been referred!',
      text: `Hi ${refereeName},\n\n${referrerName} has referred you to join our course. Click here to learn more!`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(referral);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
