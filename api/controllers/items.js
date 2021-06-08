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

    if (!item.name || !item.description || !item.price || !item.image) {
      res.status(400).json({ msg: "Post request data not valid" });
    }

    db.collection("items")
      .add(item)
      .then((doc) => {
        res.json({ ...item, id: doc.id });
      })
      .catch(() => {
        res.status(400).json({ msg: "Error creating item" });
      });
  });

  app.post("/items/update", async (req, res) => {
    const item = { name, description, price, image, id} = req.body;
    console.log("starting update");
    console.log("body:", req.body);

    const fieldChange = {};
    fieldChange["name"] = name;
    fieldChange["description"] = description;
    fieldChange["price"] = price;
    fieldChange["image"] = image;

    console.log ("fieldChange", fieldChange);

    const resp = await db
      .collection("items")
      .doc(id)
      .update(fieldChange);
    res.sendStatus(200);
  })

  app.delete("/items", (req, res) => {
    db.collection("items")
      .doc(req.body.id)
      .delete()
      .then(() => {
        res.json({ msg: `Item with ID ${req.body.id} deleted` });
      })
      .catch(() => {
        res
          .status(400)
          .json({ msg: `Error deleting item with ID ${req.body.id}` });
      });
  });
};

module.exports = ItemController;
