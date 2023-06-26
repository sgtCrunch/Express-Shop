
process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
const { items, search, deleteItem, updateItem } = require("./fakeDb");

/** GET /items - returns all items in list */

describe("GET /items", function() {
    test("Gets a list of items", async function() {
      const resp = await request(app).get(`/items`);
      expect(resp.statusCode).toBe(200);

      expect(resp.body).toEqual([{"name": "popsicle", "price": 1.45}, {"name" : "cheerios", "price": 3.40}]);
    });
});


/** POST /items - create am item from data; */

describe("POST /items", function() {
    test("Creates a new item", async function() {
      const resp = await request(app)
        .post(`/items`)
        .send({
          name : "Chocolate",
          price : 8.99
        });
      expect(resp.statusCode).toBe(201);
      expect(resp.body).toEqual({
        added: { name : "Chocolate",
                 price : 8.99 }
      });
    });
});  


/** PATCH /items/[name] - update item; */

describe("PATCH /items/:name", function() {
    test("Updates a single item", async function() {
      const resp = await request(app)
        .patch(`/items/Chocolate`)
        .send({
          name : "Special Chocolate",
          price : 10.99
        });
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({
        updated: { name : "Special Chocolate",
                   price : 10.99 }
      });
    });
  
    test("Responds with 400 if id invalid", async function() {
      const resp = await request(app).patch(`/items/0`);
      expect(resp.statusCode).toBe(400);
    });
});

/** DELETE /items/[name] - delete item,
 *  return `{message: "Deleted"}` */

describe("DELETE /items/:name", function() {
    test("Deletes a single item", async function() {
      const resp = await request(app).delete(`/items/Special Chocolate`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({ message: "Deleted" });
    });
});