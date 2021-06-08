const ShoppingCartController = (app, db) => {
  app.get("/users/:user_id/shopping-cart", async (req, res) => {
    let item_map;
    // Get item ids in user's shopping cart
    await db
      .collection("users")
      .doc(req.params.user_id)
      .get()
      .then((doc) => {
        item_map = doc.data().shopping_cart;
      });

    if (Object.keys(item_map).length === 0) {
      res.json([]);
      return;
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

  app.post("/users/:user_id/shopping-cart", async (req, res) => {
    let shopping_cart;
    const item_id = req.body.item_id;
    const userDoc = db.collection("users").doc(req.params.user_id);

    await userDoc.get().then((doc) => {
      shopping_cart = doc.data().shopping_cart;
    });
    // Add item to cart or increment item quantity if item already in cart
    shopping_cart[item_id] = shopping_cart[item_id]
      ? shopping_cart[item_id] + 1
      : 1;

    userDoc.update({ shopping_cart }).then(() => res.json(shopping_cart));
  });

  app.delete("/users/:user_id/shopping-cart/:item_id", async (req, res) => {
    let shopping_cart;
    const user_id = req.params.user_id;
    const item_id = req.params.item_id;
    const userDoc = db.collection("users").doc(req.params.user_id);

    await userDoc.get().then((doc) => {
      shopping_cart = doc.data().shopping_cart;
    });

    delete shopping_cart[item_id];

    userDoc.update({ shopping_cart }).then(() => res.json(shopping_cart));
  });
};

module.exports = ShoppingCartController;
