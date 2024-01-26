const Blog = require("../models/blogSchema.js");

// create blogs
const createBlog = async (req, res) => {
  const { userId } = req.user;
  req.body.createdby = userId;
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.json({ error });
  }
};
// Get all blogs
const getBlogs = async (req, res) => {
  const { userId } = req.user;
  try {
    const blogs = await Blog.find({ createdby: userId });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.json({ error });
  }
};

// Get a single blog
const getBlog = async (req, res) => {
  const { userId } = req.user;
  const { blogId } = req.params;

  try {
    const blog = await Blog.findOne({ createdby: userId, _id: blogId });
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.json({ error });
  }
};
// update blog
const updateBlog = async (req, res) => {
  const { userId } = req.user;
  const { blogId } = req.params;

  try {
    const blog = await Blog.findOneAndUpdate(
      { createdby: userId, _id: blogId },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.json({ error });
  }
};
// delete blog
const deleteBlog = async (req, res) => {
  const { userId } = req.user;
  const { blogId } = req.params;
  try {
    const blog = await Blog.findOneAndDelete({
      createdby: userId,
      _id: blogId,
    });
    res.status(200).json({ success: true, msg: "Blog deleted successfully" });
  } catch (error) {
    res.json({ error });
  }
};

// Get all blogs regardless of the user

const getAllBlogs = async (req,res) => {
  try {
  const blog = await Blog.find({});

    res.status(200).json({success: true, blog })
    
  } catch (error) {
    res.json({error})
    
  }

}

// Get a single blog irrespective of user

const getSingleBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
     const blog = await Blog.find({ _id: blogId});
     res.status(200).json({success: true, blog})
  } catch (error) {
    res.json({ error });
    
  }
}

module.exports = { createBlog, getBlog, getBlogs, getAllBlogs, getSingleBlog, updateBlog, deleteBlog };
