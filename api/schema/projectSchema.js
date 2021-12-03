const yup = require('yup')


const projectSchema = yup.object().shape({
  name:yup
    .string()
    .typeError('name needs to be a string')
    .trim('whitespace alone does not count')
    .required('you NEED to supply name'),
  description:yup
    .string()
    .typeError('name needs to be a string')
    .trim('whitespace alone does not count')
    .required('you NEED to supply a description'),
  completed:yup
    .boolean()
})


module.exports = {
  projectSchema,
}