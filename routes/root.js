export default async function (fastify, ) {
  fastify.get('/', async function (request, reply) {
    const visited = request.cookie?.visited
    reply.cookie('visited', true)
    const templateData = {
      visited,
    };
   return reply.view('./src/index', templateData)
  })
}
