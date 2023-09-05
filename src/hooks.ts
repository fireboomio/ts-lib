import { FastifyPluginAsync } from 'fastify'

import { FireboomConfiguration } from './configuration'

export interface GlobalHooksRouteConfig {
  kind: 'global-hook'
  category: string
  hookName: string
}

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

  // authentication
  if (config.api?.authenticationConfig?.hooks?.postAuthentication) {
    fastify.post<any, GlobalHooksRouteConfig>(
      '/authentication/postAuthentication',
      {
        config: { kind: 'global-hook', category: 'authentication', hookName: 'postAuthentication' }
      },
      async (request, reply) => {
        try {
          // await config.authentication?.postAuthentication?.(request.ctx)
        } catch (err) {
          request.log.error(err)
          reply.code(500).send({ hook: 'postAuthentication', error: err })
        }
        reply.code(200).send({
          hook: 'postAuthentication'
        })
      }
    )
  }
}
