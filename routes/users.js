import state from "../testData/data.js";
import _ from "lodash";
import yup from "yup";
import routes from "../routes.js";

export default async function (fastify) {
  fastify.get(routes.users(), async function (request, reply) {
    return reply.view('./src/users/users', {users: state.users})
  })

  fastify.post(routes.users(), {
    attachValidation: true,
    schema: {
      body: yup.object({
        name: yup.string().required().min(2, 'Имя должно быть не меньше двух символов'),
        email: yup.string().required().email(),
        password: yup.string().required().min(5, 'Пароль должен быть не меньше 5 символов'),
        passwordConfirmation: yup.string().required().min(5, 'Пароль должен быть не меньше 5 символов'),
      })
    },
    validatorCompiler:({schema}) => (data) => {
      if(data.password !== data.passwordConfirmation) {
        return{error: Error('Пароли не совпадают')}
      }
      try{
        const result = schema.validateSync(data)
        return {value: result}
      }catch(error){
        return {error}
      }
    }
  }, (request, reply) => {
    const {name, email, password, passwordConfirmation} = request.body
    if(request.validationError) {
      reply.view('./src/users/new', {name, email, password, passwordConfirmation, error: request.validationError})
      return
    }
    const user = {
      name,
      email: email.trim().toLowerCase(),
      password,
      id: _.uniqueId()
    }
    state.users.push(user)
    reply.redirect('/users/')
  })

  fastify.get(routes.newUser(), async function (request, reply) {
    return reply.view('./src/users/new')
  })

}
