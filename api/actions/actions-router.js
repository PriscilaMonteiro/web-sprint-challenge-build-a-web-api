const express = require('express');

const {
  handleActionsError,
  validActionId,
  validAction,
} = require('./actions-middleware');

const Actions = require('./actions-model');
const router = express.Router();




router.get('/', (req,res,next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
})

router.get('/:id', validActionId, (req, res, next) => {
  res.status(200).json(req.action);
});

router.post('/', validAction, (req, res, next) => {
  Actions.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction);
    })
    .catch(next);
});



router.put('/:id', validActionId, validAction, (req, res, next) => {
  Actions.update(req.params.id, req.body)
  .then(updated => {
    res.status(200).json(updated);
  })
  .catch(next);
})


router.delete('/:id', validActionId, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.status(200).json({});
    })
    .catch(next);
})




// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.

router.use(handleActionsError);

module.exports = router;