const router = require("express").Router();
const { User, Posts, Comments } = require("../models");

//Homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: [{ model: User }],
    });
    const postList = postData.map((post) => post.get({ plain: true }));
    res.render("home", {
      posts: postList,
      loggedIn: req.session.logged_in,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

//Login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//Sign-up page
router.get("/signup", (req, res) => {
  try {
    res.render("signUp");
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

//User post
router.get("/post/:id", async (req, res) => {
  try {
    const postDetails = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          model: Comments,
          include: [{ model: User, attributes: ["user_name"] }],
        },
      ],
    });
    const detailedPost = postDetails.get({ plain: true });
    res.render("post", {
      post: detailedPost,
      loggedIn: req.session.logged_in,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "An error occurred.", error });
  }
});

module.exports = router;
