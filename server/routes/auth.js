const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const token = process.env.TOKENSECRET;
const { registrationValidation, loginValidation } = require("../validation");
const User = require("../model/user");

router.use(bodyParser.json());

//TODO: Register User
router.post("/register", async (req, res) => {
  const { error } = registrationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const usernameExists = await User.findOne({
    username: req.body.username,
  });
  if (usernameExists)
    return res.status(400).send("The given username already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    role: req.body.role,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});
//TODO: Login User
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(401).send("user name does not exists");

  const validate = await bcrypt.compare(req.body.password, user.password);
  if (!validate) return res.status(401).send("Password is incorrect");

  const token = jwt.sign({ _id: user._id }, process.env.TOKENSECRET);
  res.header("auth-token", token).send(token);
});
//TODO: Update Password
// router.patch("/:Id", token, async (req, res) => {
//   try {
//     const Product = await Product.updateOne(
//       { _id: req.params.Id },
//       {
//         $set: {
//           password: req.body.password,
//         },
//       }
//     );
//     res.json(Product);
//   } catch (error) {
//     res.json({ message: error });
//   }
// });

module.exports = router;
