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

  app.get("/users/:id", (req, res) => {
    db.collection("users")
      .doc(req.params.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          res.json({ ...doc.data(), id: doc.id });
        } else {
          res.status(404).json({ msg: `No user with id ${req.params.id}` });
        }
      });
  });

  app.post("/users", async (req, res) => {
    const user = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      image: req.body.image,
      shopping_cart: {},
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
      .doc(req.params.id)
      .delete()
      .then(() => {
        res.json({ msg: `User with ID ${req.params.id} deleted` });
      })
      .catch(() => {
        res
          .status(400)
          .json({ msg: `Error deleting user with ID ${req.params.id}` });
      });
  });

  app.get("/users/:id/shopping-cart", async (req, res) => {
    let item_map;
    // Get item ids in user's shopping cart
    await db
      .collection("users")
      .doc(req.params.id)
      .get()
      .then((doc) => {
        item_map = doc.data().shopping_cart;
      });

    if (Object.keys(item_map).length === 0) {
      res.json([]);
    }

    // Get item documents corresponding to list of item ids
    const cart = [];
    await db
      .collection("items")
      .where("__name__", "in", Object.keys(item_map))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          // The keys of item_map are the item IDs and the values are the quantity
          const quantity = item_map[item.id];
          cart.push({ ...item.data(), id: item.id, quantity });
        });
      });
    res.json(cart);
  });
};

module.exports = UserController;
