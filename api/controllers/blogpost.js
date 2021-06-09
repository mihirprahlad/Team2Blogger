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

    app.put("/blogpost/:id", async (req, res) => {
      let {title, upDate, image, content} = req.body;
      let query = db.collection("blogpost").doc(req.params.id);
      const snapshot = await query.get();
      if(!snapshot) {
        console.log("This post does not exist!");
        res.status(400).json({msg: `Blog post with ID ${req.params.id} does not exist`});
        return;
      }

      let post = snapshot._fieldsProto;
    
      if(!title)
        title = post.title.stringValue
      if(!image)
        image = post.image.stringValue
      if(content === "<p><br></p>")
        content = post.content.stringValue
    
      let ref = db
        .collection("blogpost")
        .doc(req.params.id)
      ref.update({
        title: title,
        editDate: upDate,
        image: image,
        content: content
      })
      .then(() => {
        res.json({msg: `Blog post with ID ${req.params.id} updated`});
      })
      .catch(() => {
        res.status(400).json({msg: `Error updating blogpost with ID ${req.params.id}`})
      });
    })
    };
  
  module.exports = BlogPostController;
