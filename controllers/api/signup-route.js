const { User } = require("../../models/User");
const router = require("express");

router.post("/:id", async (req, res) => {
  try {
    const retrieveUser = await User.findOne({
      where: {
        userName: req.body.username,
      },
    });
    if (retrieveUser) {
      try {
        const user = await User.create({
          userName: req.body.username,
          password: req.body.password,
        });
        //reference activity 17 in MVC
        req.session.save(() => {
          req.session.user_id = user.id;
          req.session.loggedIn = true;
          res.status(200).json(user);
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
