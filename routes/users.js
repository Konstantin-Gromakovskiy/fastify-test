import state from "../testData/data.js";
import _ from "lodash";

export default async function (fastify) {
  fastify.get('/users/', async function (request, reply) {
    return reply.view('./src/users/users', {users: state.users})
  })
  fastify.post('/users/', async function (request, reply) {
    const user = {
      name: request.body.name,
      email: request.body.email.trim().toLowerCase(),
      password: request.body.password,
      id: _.uniqueId()
    }
    state.users.push(user)
    
    return reply.view('./src/users/users', {users: state.users})
  })
  
  fastify.get('/users/new', async function (request, reply) {
    return reply.view('./src/users/new')
  })
  
}
