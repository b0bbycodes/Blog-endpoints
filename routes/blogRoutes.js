const router = require("express").Router();
const {
  createBlog,
  getBlog,
  getBlogs,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");

router.route('/').post(createBlog).get(getBlogs);
router.route('/:blogId').patch(updateBlog).get(getBlog).delete(deleteBlog);
router.route('/all').get(getAllBlogs)
router.route('/a/:blogId').get(getSingleBlog)

module.exports = router;