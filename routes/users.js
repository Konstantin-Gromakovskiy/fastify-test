export default async function (fastify) {
  fastify.get('/users/', async function (request, reply) {
    return reply.send('<h1>Users</h1>')
  })
}
