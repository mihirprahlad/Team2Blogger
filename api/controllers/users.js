const UserController = (app, db) => {
  app.get("/users", (req, res) => {
    const users = [];
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((user) => {
          users.push({ ...user.data(), id: user.id });
        });
      })
      .then(() => res.json(users));
  });

  app.post("/users", async (req, res) => {
    const user = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      image: req.body.image,
    };

    if (!user.id || !user.name || !user.email || !user.image) {
      res.status(400).json({ msg: "Post request data not valid" });
    }

    const docRef = db.collection("users").doc(req.body.id);

    await docRef.get().then((doc) => {
      if (doc.exists) {
        res.status(409).json({ msg: "User already exists" });
      }
    });

    docRef
      .set(user)
      .then(() => {
        res.json(user);
      })
      .catch(() => {
        res.status(400).json({ msg: "Error creating user" });
      });
  });

  app.delete("/users/:id", (req, res) => {
    db.collection("users")
      .doc(req.body.id)
      .delete()
      .then(() => {
        res.json({ msg: `User with ID ${req.body.id} deleted` });
      })
      .catch(() => {
        res
          .status(400)
          .json({ msg: `Error deleting user with ID ${req.body.id}` });
      });
  });
};

module.exports = UserController;
