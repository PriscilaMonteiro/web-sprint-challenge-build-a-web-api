const Project = require('./projects-model');
const {projectSchema} = require('../schema/projectSchema');


function handleError(err, req, res, next) { //eslint-disable-line
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
      req.project = project // attaching project to a req object will save other middleware a trip to the database
      next();
    } else {
      next({ status:404, message: 'Project not found'});
    }
  } catch (err) {
    next(err);
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

async function validProject(req, res, next) {
  try {
    const validated = await projectSchema.validate(
      req.body,
      { strict: false, stripUnknown: true }
    )
    req.body = validated
    next();
  } catch (err) {
    next({ message: 'Name and Description fields are required', status: 400 });
  }
}

function checkBoolean(req, res, next) {
  if (req.body.completed === undefined) {
    next({ status: 400, message: "Need to be checked" });
  } else {
    next();
  }
}
  

module.exports = {
  handleError,
  validProjectId,
  validProject,
  checkBoolean,
};