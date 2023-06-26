const ExpressError = require("./ExpressError");


global.items = [{"name": "popsicle", "price": 1.45}, {"name" : "cheerios", "price": 3.40}];

function search(itemName) {

    for(let index in items){
        if(items[index].name === itemName){
            return index;
        }
    }

    throw new ExpressError(`${itemName} is not an item`, 400);;

}

function deleteItem(itemName) {
    let index = search(itemName);
    items.splice(index, 1);
}

function updateItem(itemName, data) {
    let idx = search(itemName);
    items[idx] = data;
    return items[idx];
}

module.exports = { items, search, deleteItem, updateItem };