const router = require("express").Router();

router.post("/", (req, res) => {
  if (req.session.logged_in) {
    //Logs the User out
    req.session.destroy(() => {
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
