const { actionSchema } = require('../schema/actionSchema');
const Action = require('./actions-model');

function handleActionsError(err, req, res, next) { //eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    prodMessage: 'The action information could not be retrieved',
    stack: err.stack,
  });
}

async function validActionId(req, res, next) {
  try {
    const { id } = req.params;
    const action = await Action.get(id)
    if(action){
      req.action = action 
      next();
    } else {
      next({ status:404, message: 'Action not found'});
    }
  } catch (err) {
    next(err);
  }
}

async function validAction(req, res, next) {
  try {
    const validated = await actionSchema.validate(
      req.body,
      { strict: false, stripUnknown: true }
    )
    req.body = validated
    next();
  } catch (err) {
    next({ message: 'Notes and Description fields are required', status: 400 });
  }
}


module.exports = {
  handleActionsError,
  validActionId,
  validAction,
};
