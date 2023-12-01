const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../../utils/auth");

//Dashboard page
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["user_name"],
          },
        },
      ],
    });

    const userPostData = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      userPosts: userPostData,
      loggedIn: req.session.logged_in,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

//editing user post
router.get("/:id", withAuth, async (req, res) => {
  try {
    const singlePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["user_name"],
          },
        },
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    });
    const postEdit = singlePost.get({ plain: true });
    res.render("editDeletePost", {
      post: postEdit,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
