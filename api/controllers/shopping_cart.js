const ShoppingCartController = (app, db) => {
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

  // app.post("/users/:id/shopping-cart", (req, res) => {
  //
  // })


};

module.exports = ShoppingCartController;
