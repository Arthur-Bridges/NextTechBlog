const router = require("express").Router();
const { User, Posts, Comments } = require("../../models");
const withAuth = require("../../utils/auth");

//Fetch all posts
router.get("/", withAuth, async (req, res) => {
  try {
    const postsArray = await Posts.findAll({
      include: [{ model: Comments, include: [User] }],
    });
    const formattedPosts = postsArray.map((post) => post.get({ plain: true }));
    res.json({ posts: formattedPosts }).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Specific post by ID
router.get("/:id", withAuth, async (req, res) => {
  try {
    const detailedPost = await Posts.findByPk(req.params.id, {
      include: [{ model: Comments, include: [User] }],
    });
    res.json({ post: detailedPost.get({ plain: true }) }).status(200);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

//New post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Posts.create({
      title: req.body.title,
      contents: req.body.contents,
      user_id: req.session.user_id,
    });
    res.json({ newPost, message: "Post successfully created!" }).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Posts.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedPost).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete post
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Posts.destroy({ where: { id: req.params.id } });
    res.json(deletedPost).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
