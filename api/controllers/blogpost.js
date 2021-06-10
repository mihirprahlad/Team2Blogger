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
      dislikes: {},
      editDate: "",
    };

    if (
      !blogpost.title ||
      !blogpost.date ||
      !blogpost.image ||
      !blogpost.content
    ) {
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

  app.delete("/blogpost/:id", async (req, res) => {
    const blog_id = req.params.id;
    const blogDoc = db.collection("blogpost").doc(blog_id);

    // Get list of user likes and dislikes on a post
    let user_likes, user_dislikes;
    await blogDoc.get().then((doc) => {
      user_likes = Object.keys(doc.data().likes);
      user_dislikes = Object.keys(doc.data().dislikes);
    });

    if (user_likes.length > 0) {
      const querySnapshot = await db
        .collection("users")
        .where("__name__", "in", user_likes)
        .get();

      for (let user of querySnapshot.docs) {
        const updated_likes = user.data().blog_likes;
        delete updated_likes[blog_id];
        await db
          .collection("users")
          .doc(user.id)
          .update({ blog_likes: updated_likes });
      }
    }

    if (user_dislikes.length > 0) {
      const querySnapshot = await db
        .collection("users")
        .where("__name__", "in", user_dislikes)
        .get();

      for (let user of querySnapshot.docs) {
        const updated_dislikes = user.data().blog_dislikes;
        delete updated_dislikes[blog_id];
        await db
          .collection("users")
          .doc(user.id)
          .update({ blog_dislikes: updated_dislikes });
      }
    }

    blogDoc
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

  app.put("/blogpost/:id", async (req, res) => {
    console.log(req.body);
    let { title, editDate, image, content } = req.body;
    let query = db.collection("blogpost").doc(req.params.id);
    const snapshot = await query.get();
    if (!snapshot) {
      console.log("This post does not exist!");
      res
        .status(400)
        .json({ msg: `Blog post with ID ${req.params.id} does not exist` });
      return;
    }

    let post = snapshot._fieldsProto;

    if (!title) title = post.title.stringValue;
    if (!image) image = post.image.stringValue;
    if (content === "<p><br></p>") content = post.content.stringValue;
    console.log(editDate);
    let ref = db.collection("blogpost").doc(req.params.id);
    ref
      .update({
        title: title,
        editDate: editDate,
        image: image,
        content: content,
      })
      .then(() => {
        res.json({ msg: `Blog post with ID ${req.params.id} updated` });
      })
      .catch(() => {
        res
          .status(400)
          .json({ msg: `Error updating blogpost with ID ${req.params.id}` });
      });
  });
};

module.exports = BlogPostController;
