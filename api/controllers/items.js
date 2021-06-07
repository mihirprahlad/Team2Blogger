const ItemController = (app, db) => {
  app.get("/items", (req, res) => {
    res.json({ msg: "test" });
  });
};

module.exports = ItemController;
