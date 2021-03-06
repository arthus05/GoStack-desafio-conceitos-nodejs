const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  repository = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repository)

  return response.status(200).json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    response.status(400).json({ error: "Repository not found" })
  }

  repository = {
    id: id,
    title: title,
    url: url,
    techs: techs,
    likes: repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repository

  return response.status(200).json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    response.status(400).json({ error: "Repository not found" })
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    response.status(400).json({ error: "Repository not found" })
  }

  repository = repositories[repositoryIndex]
  repository.likes++

  repositories[repositoryIndex] = repository

  return response.status(200).json(repository)

});

module.exports = app;
