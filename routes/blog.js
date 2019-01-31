const router = require("express").Router();
const passport = require("passport");

const Blog = require("../models/Blog");
const clearCache = require("../middlewares/clearCache");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const blogs = await Blog.find({ author: req.user.id }).cache({
        key: req.user.id
      });
      if (blogs.length === 0) {
        return res.status(404).send({ error: "No blogs found" });
      }
      res.json(blogs);
    } catch (error) {
      res.status(400).send({ error });
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await Blog.findOne({ _id: id }).cache({ key: req.user.id });
      if (!blog) {
        return res.status(404).send({ error: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      res.status(400).send({ error });
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  clearCache,
  async (req, res) => {
    try {
      const savedBlog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        author: req.user.id
      });
      res.status(201).json(savedBlog);
    } catch (error) {
      res.status(400).send({ error });
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const blog = await Blog.findByIdAndUpdate(id, { $set: body });
      if (!blog) {
        return res.status(404).send({ error: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      res.status(400).send({ error });
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await Blog.findByIdAndRemove(id);
      if (!blog) {
        return res.status(404).send({ error: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      res.status(400).send({ error });
    }
  }
);

module.exports = router;
