import view from '@fastify/view'
import pug from 'pug'
import fp from "fastify-plugin";



export default fp(async (fastify) => {
 fastify.register(view, { engine: { pug } });
})
