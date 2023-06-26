const express = require("express");
const router = new express.Router();
const { items, search, deleteItem, updateItem } = require("./fakeDb");

router.get("/", function(req, res) {
    console.log("HELLLO");
    return res.json(items);
})
.post("/", function(req, res) {
    items.push(req.body);

    return res.status(201).send({
        "added" : req.body
    });

});

router.get('/:name', (req, res, next) => {

    try{
        let indx = search(req.params.name);
        return res.json(items[indx]);
    }
    catch (err) {
        return next(err);
    }
    
})

.patch('/:name', (req, res, next) => {

    try{
        let change = updateItem(req.params.name, req.body);
        return res.json({"updated":change});
    }
    catch (err) {
        return next(err);
    }
    
})

.delete('/:name', (req, res) => {

    try{
        deleteItem(req.params.name);
        return res.json({"message" : "Deleted"});
    }
    catch (err) {
        return next(err);
    }

});


module.exports = router;
