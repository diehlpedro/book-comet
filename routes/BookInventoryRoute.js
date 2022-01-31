const express = require("express");
const router = express.Router();

// REQUIRE MODELS
const BookModel = require("../models/Book");
const BookInventoryModel = require("../models/BookInventory");

// GET INVENTORIES
router.get("/getBookInventory", async (req, res) => {
  try {
    const ITENS = await BookInventoryModel.find().select("-_id -__v").sort({
      id: 1
    });

    let LIST = []

    if (ITENS.length > 0) {
      for (const e of ITENS) {
        const BOOKS = await BookModel.find({ _id: e.book._id }).select("-_id -__v");
      
        LIST.push({
          id: e.id,
          quantity: e.quantity,
          book: BOOKS[0],
        });
      }
    }else {
      res.send([]);
      return
    }
    
    res.send(LIST);
  } catch (err) {
    res.send({
      status: false,
      error: err
    });
  }
});

// ADD BOOK TO INVENTORY
router.post("/postBookInventory", async (req, res) => {
  try {
    const bookId = req.query.bookId
    let bookObj = null
    const bookQty = req.body.quantity

    const BOOK_ITENS = await BookModel.find({
      id: bookId
    })

    if (BOOK_ITENS.length == 0) {
      res.send({
        status: false,
        message: 'Book ID not found in database.'
      });
      return
    } else {
      bookObj = BOOK_ITENS[0]
    }

    const ITENS = await BookInventoryModel.find({
      book: {
        _id: bookObj._id
      }
    })

    if (ITENS.length >= 1) {
      res.send({
        status: false,
        message: 'Book already in inventory.'
      });
      return
    } else {
      // Handling integer ID:
      const auxList = await BookInventoryModel.find().sort({
        "_id": -1
      }).limit(1)

      let auxObj = req.body
      if (auxList.length === 0) {
        auxObj.id = 1
      } else {
        auxObj.id = auxList[0].id + 1;
      }

      auxObj.book = bookObj;

      const saveJson = new BookInventoryModel({
        quantity: bookQty,
        id: auxObj.id,
        book: bookObj
      })
      await saveJson.save()
      // Remove __v and _id    ---    OBS: delete['key'] didn't work
      let sendJson = {
        id: saveJson.id,
        quantity: saveJson.quantity,
        book: {
          id: saveJson.book.id,
          name: saveJson.book.name,
          author: saveJson.book.author,
          publisher: saveJson.book.publisher,
          year: saveJson.book.year,
          summary: saveJson.book.summary,
        }
      };

      res.send({
        status: true,
        saved: sendJson
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

// UPDATE ONE INVENTORY
router.patch("/updateOneInventory", async (req, res) => {
  try {
    const updateId = req.query.id
    let updateObj = {}
    updateObj.quantity = req.body.quantity

    if (req.body.quantity < 0) {
      res.send({
        status: false,
        message: 'Invalid Quantity'
      });
      return
    }

    const ITENS = await BookInventoryModel.find({
      id: updateId
    })

    if (ITENS.length == 0) {
      res.send({
        status: false,
        message: 'ID not found in database.'
      });
      return
    }
    const updatedItem = await BookInventoryModel.updateOne({id: updateId}, {quantity: req.body.quantity});

    res.send({status: true, message: "Updated."});
  } catch (err) {
    console.log(err);
    res.send({
      status: false,
      message: err.message
    });
  }
});

// DELETE ONE INVENTORY
router.delete("/deleteOneInventory", async (req, res) => {
  try {
    const deleteId = req.query.id
    const ITENS = await BookInventoryModel.find({ id: deleteId });

    if (ITENS.length > 0) {

      if (ITENS[0].quantity > 0) {
        res.json({
          status: false,
          message: "Quantity greater than zero."
        });
        return
      }

      const del = await BookInventoryModel.deleteOne({
        id: parseInt(deleteId)
      });
  
      if (del.deletedCount == 0) {
        res.json({
          status: false,
          message: "ID Object not found."
        });
        return
      } else {
        res.json({
          status: true,
          message: "Deleted."
        });
        return
      }
    } else {
      res.json({
        status: false,
        message: "ID Object not found."
      });
      return
    }
    
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});

// DELETE ALL INVENTORIES (RESET DB - DISABLED)
router.delete("/deleteAllInventories", async (req, res) => {
  /*try {
    let list = await BookInventoryModel.find();

    for (const l of list) {
      const del = await BookInventoryModel.deleteOne({
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