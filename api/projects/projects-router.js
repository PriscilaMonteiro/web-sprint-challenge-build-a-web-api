const express = require('express');

const {
  handleError,
  validProjectId,
  validProject,
} = require('./projects-middleware');

const Projects = require('./projects-model');
const router = express.Router();

router.get('/', (req,res,next) => {
  Projects.get()
  .then((projects) => {
    res.status(200).json(projects);
  })
  .catch(next);
})


router.get('/:id', validProjectId, (req, res) => {
  res.status(200).json(req.project)
});

router.post('/', validProject, (req, res, next) => {
  Projects.insert(req.body)
  .then(newProject => {
    res.status(201).json(newProject)
    console.log("newProject", newProject)
    console.log("reqbody", req.body)
  })
  .catch(next)
});


// - [ ] `[POST] /api/projects`
//   - Returns the newly created project as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.



// - [ ] `[PUT] /api/projects/:id`
//   - Returns the updated project as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.



// - [ ] `[DELETE] /api/projects/:id`
//   - Returns no response body.
//   - If there is no project with the given `id` it responds with a status code 404.



// - [ ] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.


router.use(handleError);

module.exports = router;