const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { Person } = require("./mongo");
const app = express();
app.use(express.json());
app.use(cors());

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      tokens["response-time"](req, res),
      "ms",
      tokens.method(req, res) === "POST" ? tokens.body(req, res) : "",
    ].join(" ");
  })
);

app.get("/persons", async (request, response, next) => {
  try {
    const persons = await Person.find({});
    response.json(persons);
  } catch (error) {
    next(error);
  }
});

app.get("/info", async (request, response, next) => {
  let infoLen;
  let infoTime;
  try {
    const result = await Person.countDocuments({});
    infoLen = result;
    infoTime = new Date();
    response.send(
      `<p>Phonebook has info for ${infoLen} people<br>${infoTime}</p>`
    );
  } catch (error) {
    next(error);
  }
});

app.get("/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "Name is missing",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "Number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    const errorMessage =
      "Name must be at least 3 chars long. " +
      "Phone number must contain at least 8 numbers " +
      "and be in correct format. Format examples: " +
      "213-123454, 09-2132131";
    return response.status(400).json({ error: errorMessage });
  }
  next(error);
};

app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
