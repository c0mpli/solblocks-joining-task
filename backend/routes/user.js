const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const isUser = require("../middlewares/isUser");
const axios = require("axios");

router.post("/register", async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const settings = {
    balance: true,
    transactions: true,
  };
  if (!password || !email)
    return res.status(400).send("One or more of the fields are missing.");

  //checking for multiple accounts for a single email
  const emailcheck = await User.find({ email: email });
  if (emailcheck.length > 0)
    return res
      .status(400)
      .send("Only one account per email address is allowed");

  // add user
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    const newUser = new User({
      password: hash,
      email,
      settings,
    });
    return res.json(await newUser.save());
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send("Missing email or password");

  // checking if email exists
  const emails = await User.find({ email: email });
  if (emails.length === 0) return res.status(400).send("Email is incorrect");

  const user = emails[0];

  bcrypt.compare(password, user.password, async function (err, result) {
    if (result == false) return res.status(400).send("Incorrect password");

    // sending token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.jwtSecret,
      { expiresIn: "1d" }
    );
    res.setHeader("token", token);
    res.json({ token, email, id: user._id });
  });
});

router.get("/addresses", isUser, async (req, res) => {
  const user = await User.findById(req.query.user);
  res.json(user.addresses);
});

async function fetchAddressDetails(userId) {
  const user = await User.findById(userId);
  const balance = user.settings.balance;
  const transactions = user.settings.transactions;
  const addresses = user.addresses;
  let address = [];
  console.log(addresses.length);
  for (let i = 0; i < addresses.length; i++) {
    //call api to get address details
    let b, t;
    if (balance) {
      b = await axios.get(
        `https://api.etherscan.io/api?module=account&action=balance&address=${addresses[i].address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}}`
      );
    }
    if (transactions) {
      t = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${addresses[i].address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`
      );
    }

    address.push({
      address: addresses[i],
      balance: b?.data.result || null,
      transactions: t?.data.result || null,
    });
  }
  console.log("Data fetched");
  await user.updateOne({ data: address });
}

router.post("/fetch-address-details", isUser, async (req, res) => {
  res.json(await fetchAddressDetails(req.body.user));
});

router.get("/get-address-details", isUser, async (req, res) => {
  const user = await User.findById(req.query.user);
  res.json({ data: user.data, settings: user.settings });
});

router.post("/add-address", isUser, async (req, res) => {
  const user = await User.findById(req.body.user);
  user.addresses.push(req.body.address);
  const t = await user.save();
  //await fetchAddressDetails(req.body.user);
  res.json(t);
});

router.post("/update-address", isUser, async (req, res) => {
  const user = await User.findById(req.body.user);
  user.addresses[req.body.index] = req.body.address;
  res.json(await user.save());
});

router.post("/delete-address", isUser, async (req, res) => {
  const user = await User.findById(req.body.user);
  user.addresses.splice(req.body.index, 1);
  const t = await user.save();
  //await fetchAddressDetails(req.body.user);
  res.json(t);
});

router.post("/update-settings", isUser, async (req, res) => {
  const user = await User.findById(req.body.user);
  user.settings = {
    balance: req.body.balance,
    transactions: req.body.transactions,
  };
  res.json(await user.save());
});

router.get("/get-settings", isUser, async (req, res) => {
  const user = await User.findById(req.query.user);
  res.json(user.settings);
});

module.exports = router;
