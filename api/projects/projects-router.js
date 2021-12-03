const express = require('express');

const {
  handleError,
  validProjectId,
  validProject,
  checkBoolean,
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

router.get('/:id', validProjectId, (req, res, next) => {
  res.status(200).json(req.project);
});

router.post('/', validProject, (req, res, next) => {
  Projects.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

router.put(
  '/:id', 
  validProjectId, 
  validProject, 
  checkBoolean, 
  (req, res, next) => {
    Projects.update(req.params.id, req.body)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(next);
})

router.delete('/:id', validProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json({});
    })
    .catch(next);
})

router.get('/:id/actions', validProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id || req.body.project_id)
    .then((actions) => {
    res.status(200).json(actions);
    })
    .catch(next);
})

router.use(handleError);

module.exports = router;
