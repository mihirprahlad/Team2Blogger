const ItemController = (app, db) => {
  app.get("/items", (req, res) => {
    const items = [];
    db.collection("items")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          items.push({ ...item.data(), id: item.id });
        });
      })
      .then(() => res.json(items));
  });

  app.post("/items", (req, res) => {
    const item = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    };

    db.collection("items")
      .add(item)
      .then((doc) => {
        res.json({ ...item, id: doc.id });
      });
  });
};

module.exports = ItemController;
