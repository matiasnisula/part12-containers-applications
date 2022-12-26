const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const redisSerivce = require("../redis/index");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  let counter = await redisSerivce.getAsync("added_todos");
  await redisSerivce.setAsync("added_todos", Number(counter) + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const text = req.body.text;
  const done = req.body.done;
  const updatedTodo = {
    text: text,
    done: done,
  };
  const result = await Todo.findByIdAndUpdate(req.todo.id, updatedTodo, {
    new: true,
  });
  res.send(result);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
