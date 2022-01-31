const express = require("express");
const router = express.Router();

// REQUIRE MODELS
const EBookModel = require("../models/EBook");
const EBookInventoryModel = require("../models/EBookInventory");

// GET E-BOOKS BY ORDER IN REQ.QUERY
router.get("/getBooks", async (req, res) => {
  try {
    const orderBy = req.query.order
    let ITENS = []

    switch (orderBy) {
      case 'author':
        ITENS = await EBookModel.find().select("-_id -__v").sort({
          author: 1
        });
        break;

      case 'publisher':
        ITENS = await EBookModel.find().select("-_id -__v").sort({
          publisher: 1
        });
        break;

      case 'id':
        ITENS = await EBookModel.find().select("-_id -__v").sort({
          id: 1
        });
        break;

      default:
        await EBookModel.find().select("-_id -__v").sort({
          author: -1
        });
        break;
    }

    res.send(ITENS);
  } catch (err) {
    res.send({
      status: false,
      error: err
    });
  }
});

// CREATE NEW E-BOOK
router.post("/postBook", async (req, res) => {
  try {
    // Validation
    const ITENS = await EBookModel.find({
      name: req.body.name,
      author: req.body.author
    })

    if (ITENS.length == 0) {
      // Handling integer ID:
      const auxList = await EBookModel.find().sort({
        "_id": -1
      }).limit(1)
      let auxObj = req.body
      if (auxList.length === 0) {
        auxObj.id = 1
      } else {
        auxObj.id = auxList[0].id + 1;
      }

      const saveJson = new EBookModel(auxObj)
      await saveJson.save()
      // Remove __v and _id    ---    OBS: delete['key'] didn't work
      let sendJson = {
        id: saveJson.id,
        name: saveJson.name,
        author: saveJson.author,
        publisher: saveJson.publisher,
        year: saveJson.year,
        format: saveJson.format,
        summary: saveJson.summary,
      };

      res.send({
        status: true,
        saved: sendJson
      });
    } else {
      res.send({
        status: false,
        error: "Combionation of Book Name and Author already exists."
      });
    }
  } catch (err) {
    console.log(err);
    res.send({
      status: false,
      error: err
    });
  }
});

// UPDATE ONE E-BOOK
router.patch("/updateOne", async (req, res) => {
  try {
    const updateId = req.query.id
    let updateObj = req.body

    const ITENS = await EBookModel.find({
      id: updateId
    })

    if (ITENS.length == 0) {
      res.send({
        status: false,
        message: 'ID not found in database.'
      });
      return
    }

    const updatedItem = await EBookModel.updateOne({
      id: updateId
    }, updateObj);

    res.send({
      status: true,
      message: "Updated."
    });
  } catch (err) {
    res.send({
      message: err.message
    });
  }
});

// DELETE ONE BOOK
router.delete("/deleteOne", async (req, res) => {
  try {
    const parsedId = parseInt(req.query.id)
    const BOOK = await EBookModel.find({
      id: parsedId
    });

    // aux variable to check if deleted inventory
    let auxInvDel = false;

    // check for INVENTORY, null and quantities
    const INVENTORY = await EBookInventoryModel.findOne({
      book: {
        _id: BOOK[0]._id
      }
    }).exec();
    if (INVENTORY) {
      if (INVENTORY.quantity > 0) {
        res.send({
          status: false,
          message: "Quantity greater than zero in inventory."
        })
        return
      } else {
        const delInv = await EBookInventoryModel.deleteOne({
          id: INVENTORY.id
        });
        auxInvDel = true
      }
    }

    // delete book
    const del = await EBookModel.deleteOne({
      id: parsedId
    });

    // change message depending on inventory delete
    let msg = "Deleted E-Book."
    if (auxInvDel) msg = "Deleted E-Book and inventory registries."
    res.send({
      status: true,
      message: msg
    })

  } catch (err) {
    res.send({
      status: false,
      error: err
    });
  }
});

// DELETE ALL (RESET DB - DISABLED)
router.delete("/deleteAll", async (req, res) => {
  /*try {
    let list = await EBookModel.find();

    for (const l of list) {
      const del = await EBookModel.deleteOne({
        _id: l._id
      });
    }

    res.json({
      message: "done"
    });
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }*/

  try {
    res.send({ status: false, message: "Disabled function." });
  } catch (err) {
    res.send({ status: false, message: err });
  }
});

module.exports = router;