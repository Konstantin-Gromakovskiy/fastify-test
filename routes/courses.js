import state from "../testData/data.js";

export default async function (fastify) {
  fastify.get('/courses/', async function (request, reply) {
    const searchParam = request.query.courses
    if (searchParam) {
      const regex = new RegExp(`${searchParam}`, 'gi');
      const searchCourse = state.courses.filter(course => course.title.match(regex))
      return reply.view('./src/courses', {courses: searchCourse, searchParam})
    }
    return reply.view('./src/courses', {courses: state.courses})
  })
  fastify.get('/courses/:id', async function (request, reply) {
    const course = state.courses.find(course => course.id === request.params.id)
    
    return reply.view('./src/course', {course})
  })
}
