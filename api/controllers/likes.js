const LikeController = (app, db) => {
  // Gets likes and dislikes of a post
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

  // Get user likes and dislikes
  app.get("/users/:user_id/likes", (req, res) => {
    db.collection("users")
      .doc(req.params.user_id)
      .get()
      .then((doc) => {
        res.json({
          liked_posts: doc.data().liked_posts,
          disliked_posts: doc.data().disliked_posts,
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
    let liked_posts, disliked_posts;
    await userDoc.get().then((doc) => {
      if (action === "like") {
        liked_posts = doc.data().liked_posts;
        liked_posts[post_id] = true;
        disliked_posts = doc.data().disliked_posts;
        delete disliked_posts[post_id];
      } else {
        disliked_posts = doc.data().disliked_posts;
        disliked_posts[post_id] = true;
        liked_posts = doc.data().liked_posts;
        delete liked_posts[post_id];
      }
    });
    userDoc.update({ liked_posts, disliked_posts });
    res.json({ msg: "Success!" });
  });

  // Remove a like or dislike from a post
  app.delete("/blogpost/:post_id/likes", async (req, res) => {
    const post_id = req.params.post_id;
    const user_id = req.body.user_id;
    const action = req.body.action; // action can be either "like" or "dislike"

    blogDoc = db.collection("blogpost").doc(post_id);
    let likes, dislikes;
    blogDoc.get().then((doc) => {
      if (action === "like") {
        likes = doc.data().likes;
        delete likes[user_id];
        blogDoc.update({ likes });
      } else {
        dislikes = doc.data().dislikes;
        delete dislikes[user_id];
        blogDoc.update({ dislikes });
      }
    });

    userDoc = db.collection("users").doc(user_id);
    let liked_posts, disliked_posts;
    userDoc.get().then((doc) => {
      if (action === "like") {
        liked_posts = doc.data().liked_posts;
        delete liked_posts[post_id];
        userDoc.update({ liked_posts });
      } else {
        disliked_posts = doc.data().disliked_posts;
        delete disliked_posts[post_id];
        userDoc.update({ disliked_posts });
      }
    });
    res.json({
      msg: `${action === "like" ? "Like" : "Dislike"} successfully removed.`,
    });
  });
};

module.exports = LikeController;
