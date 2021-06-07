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
};

module.exports = ItemController;
