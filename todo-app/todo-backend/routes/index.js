const redis = require("../redis");
const express = require("express");
const router = express.Router();

const redisSerivce = require("../redis/index");
const configs = require("../util/config");

let visits = 0;

redisSerivce
  .getAsync("added_todos")
  .then((result) => {
    if (result === null) {
      redisSerivce.setAsync("added_todos", 0).catch((error) => {
        console.log(error);
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (req, res) => {
  const counter = await redisSerivce.getAsync("added_todos");
  res.send({
    added_todos: Number(counter),
  });
});

module.exports = router;
