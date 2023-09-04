import { FastifyPluginAsync } from 'fastify'

import { FireboomConfiguration } from './types'

export const FireboomHooksPlugun: FastifyPluginAsync<FireboomConfiguration> = async (
  fastify,
  config
) => {
  await fastify.addHook('preHandler', (request, reply, done) => {
    if (request.ctx.user === undefined) {
      request.log.error("User context doesn't exist")
      reply.code(400).send({ error: "User context doesn't exist" })
    }
    done()
  })
}
