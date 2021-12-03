const yup = require('yup')


const actionSchema = yup.object().shape({
  notes:yup
    .string()
    .typeError('name needs to be a string')
    .trim('whitespace alone does not count')
    .required('you NEED to supply notes'),
  description:yup
    .string()
    .typeError('name needs to be a string')
    .trim('whitespace alone does not count')
    .max(128, 'description cannot be longer than 128')
    .required('you NEED to supply a description'),
  completed:yup
    .boolean(),
  project_id:yup
    .number()
    .required(),
})

module.exports = {
  actionSchema, 
}