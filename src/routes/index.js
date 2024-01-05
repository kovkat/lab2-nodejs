function GET (req, res, url, payload) {
  const ip = req.socket.remoteAddress
  const port = req.socket.remotePort
  res.json({ name: `Path ${url.pathname}. Your IP address is ${ip} and your source port is ${port}` })
}

function POST (req, res, url, payload) {
  res.json({ receivedPayload: payload })
}

function OPTIONS (req, res, url, payload) {
  res.setHeader('Allow', 'OPTIONS, GET, POST')
  res.statusCode = 204
  res.end()
}

export { GET, OPTIONS, POST }
