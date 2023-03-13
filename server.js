const fastify = require('fastify')({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { hello: 'from Koyeb' }
})

/**
 * Run the server!
 */
const start = async () => {
  fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  })
}
start()