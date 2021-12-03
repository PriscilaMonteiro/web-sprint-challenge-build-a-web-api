const Project = require('./projects-model');


function handleError(err, req, res, next) {
  res.status(500).json({
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
  })
}


// #### Projects

// | Field       | Data Type | Metadata                                                                |
// | ----------- | --------- | ----------------------------------------------------------------------- |
// | id          | number    | do not provide it when creating projects, the database will generate it |
// | name        | string    | required                                                                |
// | description | string    | required                                                                |
// | completed   | boolean   | not required, defaults to false when creating projects           

module.exports = {
  handleError,
};