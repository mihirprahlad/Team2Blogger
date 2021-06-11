const LikeController = (app, db) => {
  // Gets likes and dislikes of a blog post
  app.get("/blogpost/:post_id/likes", (req, res) => {
    db.collection("blogpost")
      .doc(req.params.post_id)
      .get()
      .then((doc) => {
        res.json({
          likes: {
            count: Object.keys(doc.data().likes).length,
            users: doc.data().likes,
          },
          dislikes: {
            count: Object.keys(doc.data().dislikes).length,
            users: doc.data().dislikes,
          },
        });
      });
  });

  // Gets likes and dislikes of a forum post
  app.get("/forumpost/:post_id/likes", (req, res) => {
    db.collection("forumpost")
      .doc(req.params.post_id)
      .get()
      .then((doc) => {
        res.json({
          likes: {
            count: Object.keys(doc.data().likes).length,
            users: doc.data().likes,
          },
          dislikes: {
            count: Object.keys(doc.data().dislikes).length,
            users: doc.data().dislikes,
          },
        });
      });
  });

  // Get user likes and dislikes
  app.get("/users/:user_id/blog-likes", (req, res) => {
    db.collection("users")
      .doc(req.params.user_id)
      .get()
      .then((doc) => {
        res.json({
          blog_likes: doc.data().blog_likes,
          blog_dislikes: doc.data().blog_dislikes,
        });
      });
  });

  // Get user likes and dislikes
  app.get("/users/:user_id/forum-likes", (req, res) => {
    db.collection("users")
      .doc(req.params.user_id)
      .get()
      .then((doc) => {
        res.json({
          forum_likes: doc.data().forum_likes,
          forum_dislikes: doc.data().forum_dislikes,
        });
      });
  });

  // Like or dislike a blog post
  // Specify which action in the request body
  app.post("/blogpost/:post_id/likes", async (req, res) => {
    const post_id = req.params.post_id;
    const user_id = req.body.user_id;
    const action = req.body.action; // action can be either "like" or "dislike"

    blogDoc = db.collection("blogpost").doc(post_id);
    let likes, dislikes;
    await blogDoc.get().then((doc) => {
      if (action === "like") {
        likes = doc.data().likes;
        likes[user_id] = true;
        dislikes = doc.data().dislikes;
        delete dislikes[user_id];
      } else {
        dislikes = doc.data().dislikes;
        dislikes[user_id] = true;
        likes = doc.data().likes;
        delete likes[user_id];
      }
    });
    blogDoc.update({ likes, dislikes });

    userDoc = db.collection("users").doc(user_id);
    let blog_likes, blog_dislikes;
    await userDoc.get().then((doc) => {
      if (action === "like") {
        blog_likes = doc.data().blog_likes;
        blog_likes[post_id] = true;
        blog_dislikes = doc.data().blog_dislikes;
        delete blog_dislikes[post_id];
      } else {
        blog_dislikes = doc.data().blog_dislikes;
        blog_dislikes[post_id] = true;
        blog_likes = doc.data().blog_likes;
        delete blog_likes[post_id];
      }
    });
    userDoc.update({ blog_likes, blog_dislikes });
    res.json({ likes, dislikes });
  });

  app.post("/forumpost/:post_id/likes", async (req, res) => {
    const post_id = req.params.post_id;
    const user_id = req.body.user_id;
    const action = req.body.action; // action can be either "like" or "dislike"

    forumDoc = db.collection("forumpost").doc(post_id);
    let likes, dislikes;
    await forumDoc.get().then((doc) => {
      if (action === "like") {
        likes = doc.data().likes;
        likes[user_id] = true;
        dislikes = doc.data().dislikes;
        delete dislikes[user_id];
      } else {
        dislikes = doc.data().dislikes;
        dislikes[user_id] = true;
        likes = doc.data().likes;
        delete likes[user_id];
      }
    });
    forumDoc.update({ likes, dislikes });

    userDoc = db.collection("users").doc(user_id);
    let forum_likes, forum_dislikes;
    await userDoc.get().then((doc) => {
      if (action === "like") {
        forum_likes = doc.data().forum_likes;
        forum_likes[post_id] = true;
        forum_dislikes = doc.data().forum_dislikes;
        delete forum_dislikes[post_id];
      } else {
        forum_dislikes = doc.data().forum_dislikes;
        forum_dislikes[post_id] = true;
        forum_likes = doc.data().forum_likes;
        delete forum_likes[post_id];
      }
    });
    userDoc.update({ forum_likes, forum_dislikes });
    res.json({ msg: "Success!" });
  });

  // Remove a like or dislike from a post
  app.delete("/blogpost/:post_id/likes", async (req, res) => {
    const post_id = req.params.post_id;
    const user_id = req.body.user_id;
    const action = req.body.action; // action can be either "like" or "dislike"

    blogDoc = db.collection("blogpost").doc(post_id);
    let likes, dislikes;
    await blogDoc.get().then((doc) => {
      likes = doc.data().likes;
      dislikes = doc.data().dislikes;
      if (action === "like") {
        delete likes[user_id];
        blogDoc.update({ likes });
      } else {
        delete dislikes[user_id];
        blogDoc.update({ dislikes });
      }
    });

    userDoc = db.collection("users").doc(user_id);
    let blog_likes, blog_dislikes;
    userDoc.get().then((doc) => {
      if (action === "like") {
        blog_likes = doc.data().blog_likes;
        delete blog_likes[post_id];
        userDoc.update({ blog_likes });
      } else {
        blog_dislikes = doc.data().blog_dislikes;
        delete blog_dislikes[post_id];
        userDoc.update({ blog_dislikes });
      }
    });
    res.json({ likes, dislikes });
  });

  app.delete("/forumpost/:post_id/likes", async (req, res) => {
    const post_id = req.params.post_id;
    const user_id = req.body.user_id;
    const action = req.body.action; // action can be either "like" or "dislike"

    forumDoc = db.collection("forumpost").doc(post_id);
    let likes, dislikes;
    forumDoc.get().then((doc) => {
      if (action === "like") {
        likes = doc.data().likes;
        delete likes[user_id];
        forumDoc.update({ likes });
      } else {
        dislikes = doc.data().dislikes;
        delete dislikes[user_id];
        forumDoc.update({ dislikes });
      }
    });

    userDoc = db.collection("users").doc(user_id);
    let forum_likes, forum_dislikes;
    userDoc.get().then((doc) => {
      if (action === "like") {
        forum_likes = doc.data().forum_likes;
        delete forum_likes[post_id];
        userDoc.update({ forum_likes });
      } else {
        forum_dislikes = doc.data().forum_dislikes;
        delete forum_dislikes[post_id];
        userDoc.update({ forum_dislikes });
      }
    });
    res.json({
      msg: `${action === "like" ? "Like" : "Dislike"} successfully removed.`,
    });
  });
};

module.exports = LikeController;
