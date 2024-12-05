const twilio = require("twilio");
const express = require("express");
const dotenv = require("dotenv").config();


const accountSID = process.env.accountSID;
const authToken = process.env.authToken;
const twilioPhoneNo = process.env.twilioPhoneNo;
const client = twilio(accountSID, authToken);

const app = express();
app.use(express.json());

const OTP = Math.floor(Math.random() * 1000000);
app.use("/signup", async (req, res) => {
  const phoneNo = req.body.phoneNo;
  try {
    const message = await client.messages.create({
      body: `Hii your OTP is ${OTP}`,
      from: twilioPhoneNo,
      to: phoneNo,
    });
    return res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
});
app.use("/verify", async (req, res) => {
  const otp = req.body.otp;
    console.log(OTP);
    
  if (otp !== OTP) {
    return res.status(400).json({ error: "Invalid OTP" });
  }
  return res.status(200).json({ message: "OTP verified successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
