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


// #### Actions

// | Field       | Data Type | Metadata                                                                                        |
// | ----------- | --------- | ----------------------------------------------------------------------------------------------- |
// | id          | number    | do not provide it when creating actions, the database will generate it                          |
// | project_id  | number    | required, must be the id of an existing project                                                 |
// | description | string    | required, up to 128 characters long                                                             |
// | notes       | string    | required, no size limit. Used to record additional notes or requirements to complete the action |
// | completed   | boolean   | not required, defaults to false when creating actions             

module.exports = {
  handleActionsError,
  validActionId,
}