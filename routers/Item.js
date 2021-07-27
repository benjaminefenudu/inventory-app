const router = require("express").Router()

const {createItem, updateItem,deleteItem, getAllItems, getSpecificItem} = require("../controllers/Item")

router.get("/", getAllItems)
router.post("/", createItem)
router.post("/", getSpecificItem)
router.put("/", updateItem)
router.delete("/", deleteItem)

module.exports = router