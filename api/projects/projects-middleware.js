const Project = require('./projects-model');


function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    prodMessage: 'The project information could not be retrieved',
    stack: err.stack,
  });
}

async function validProjectId(req, res, next) {
  try {
    const { id } = req.params;
    const project = await Project.get(id)
    if(project){
      req.project = project
      next();
    } else {
      next({ status:404, message: 'Project not found'})
    }
  } catch (err) {
    next(err)
  }
}

// Another way to write this code could be:
// ___________________________________________________________ 
// function validProjectId(req, res, next) {
//   const { id } = req.params;
//   Project.get(id)
//   .then(project => {
//     if (project) {
//       req.project = project
//       next()
//     } else {
//       next({ status: 404, message: 'project not found' })
//       }
//     })
//     .catch(next)
// }
// _____________________________________________________________





// #### Projects

// | Field       | Data Type | Metadata                                                                |
// | ----------- | --------- | ----------------------------------------------------------------------- |
// | id          | number    | do not provide it when creating projects, the database will generate it |
// | name        | string    | required                                                                |
// | description | string    | required                                                                |
// | completed   | boolean   | not required, defaults to false when creating projects           

module.exports = {
  handleError,
  validProjectId,
};