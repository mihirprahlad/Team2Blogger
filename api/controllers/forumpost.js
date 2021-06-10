const ForumPostController = (app, db) => {
  app.get("/forumpost", async (req, res) => {
    const forumpost = [];
    let user_id;

    const querySnapshot = await db.collection("forumpost").get();

    for (let post of querySnapshot.docs) {
      const post_data = { ...post.data(), id: post.id };
      let user_data;
      await db
        .collection("users")
        .doc(post_data.user_id)
        .get()
        .then((doc) => {
          user_data = {
            id: doc.id,
            name: doc.data().name,
            pic: doc.data().image,
          };
        });
      delete post_data.user_id;
      post_data.user = user_data;
      forumpost.push(post_data)
    }
    res.json(forumpost)
  });

  app.post("/forumpost", (req, res) => {
    console.log(req.body);
    const forumpost = {
      title: req.body.title,
      date: req.body.date,
      image: req.body.image,
      content: req.body.content,
      user_id: req.body.user_id,
      editDate: "",
    //   user: {
    //     name: req.body.username,
    //     id: req.body.userid,
    //     pic: req.body.userpic,
    //   },
    };

    if (
      !forumpost.title ||
      !forumpost.date ||
      !forumpost.image ||
      !forumpost.content
    ) {
      res.status(400).json({ msg: "Post request data not valid" });
    }

    db.collection("forumpost")
      .add(forumpost)
      .then((doc) => {
        res.json({ ...forumpost, id: doc.id });
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
};

module.exports = ForumPostController;
