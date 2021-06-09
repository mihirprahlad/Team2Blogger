const LikeController = (app, db) => {
  // Gets likes and dislikes of a post
  app.get("/blogpost/:post_id/likes", (req, res) => {
    db.collection("blogpost")
      .doc(req.params.post_id)
      .get()
      .then((doc) => {
        res.json({ likes: doc.data().likes, dislikes: doc.data().dislikes });
      });
  });

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
};

module.exports = LikeController;
