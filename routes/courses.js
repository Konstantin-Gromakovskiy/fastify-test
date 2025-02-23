export default async function (fastify) {
  fastify.get('/courses/', async function (request, reply) {
    return reply.view('./src/courses')
  })
}
