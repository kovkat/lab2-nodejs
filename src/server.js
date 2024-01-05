import * as http from 'node:http'
import { router, loadRoutesDir } from './router.js'
import helpers from './helpers.js'
import { safeJSON, processRequestChunks, processContentType } from './utils.js'

const port = parseInt(process.env.PORT) || 9000

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `https://${req.headers.host}`)
    const routeModule = router.get(url.pathname) || {}
    const handler = routeModule[req.method]

    if (!handler) {
      res.statusCode = 404
      res.end()
      return
    }

    const rawRequest = await processRequestChunks(req)

    const payload = processContentType(req, rawRequest)

    handler(req, Object.assign(res, helpers), url, payload, rawRequest)
  } catch (error) {
    console.error(error)
    res.statusCode = error.statusCode || 500
    res.end(process.env.NODE_ENV === 'production' ? 'internal error' : String(error))
  }
})

server.listen(port, async () => {
  await loadRoutesDir()
  console.log(`Server is listening on port ${port}`)
})

process.on('SGINT', () => {
  server.close(error => {
    if (error) {
      console.error(error)
      processedContentTypes.exit(1)
    }
  })
})
