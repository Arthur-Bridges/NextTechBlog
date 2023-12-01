const router = require("express").Router();
const { User } = require("../../models");

//User login
router.post("/", async (req, res) => {
  try {
    const foundUser = await User.findOne({
      where: { user_name: req.body.user_name },
    });

    if (!foundUser) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Try again." });
      return;
    }

    const passwordValid = await foundUser.checkPw(req.body.password);

    if (!passwordValid) {
      res
        .status(400)
        .json({ message: "Password does not match. Please try again." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = foundUser.id;
      req.session.logged_in = true;
      res.json({ user: foundUser, message: "Login Successful" });
    });
  } catch (err) {
    //pretty sure this is a server error thus 500
    res.status(500).json({
      message: "Error",
      error: err,
    });
    console.error(err);
  }
});

// User logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
