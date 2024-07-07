// create express app
const express = require("express");
const app = express();
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();
const port = 5000;

app.post("/addRefer", async (req, res) => {
  const user = req.body;
  console.log(user);
  try {

    const result = await prisma.referral.create({
      data: user,
    });

    res.json(result); // Send the created user object as a response
  } catch (error) {
    res.status(400).send(error.message); // Send error message if something goes wrong
  }
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
