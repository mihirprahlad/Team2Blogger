const BlogPostController = (app, db) => {
    app.get("/blogpost", (req, res) => {
      const blogpost = [];
      db.collection("blogpost")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((post) => {
            blogpost.push({ ...post.data(), id: post.id });
          });
        })
        .then(() => res.json(blogpost));
    });

    app.post("/blogpost", (req, res) => {
      const blogpost = {
        title: req.body.title,
        date: req.body.date,
        image: req.body.image,
        content: req.body.content,
        likes: {},
        dislikes: {}
      };

      if (!blogpost.title || !blogpost.date || !blogpost.image || !blogpost.content) {
        res.status(400).json({ msg: "Post request data not valid" });
      }

      db.collection("blogpost")
        .add(blogpost)
        .then((doc) => {
          res.json({ ...blogpost, id: doc.id });
        })
        .catch(() => {
          res.status(400).json({ msg: "Error creating blogpost" });
        });
    });

    app.delete("/blogpost/:id", (req, res) => {
      db.collection("blogpost")
        .doc(req.params.id)
        .delete()
        .then(() => {
          res.json({ msg: `Blogpost with ID ${req.params.id} deleted` });
        })
        .catch(() => {
          res
            .status(400)
            .json({ msg: `Error deleting blogpost with ID ${req.params.id}` });
        });
    });
  }
  
  module.exports = BlogPostController;
