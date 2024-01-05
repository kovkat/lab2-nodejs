function GET (req, res, payload, body) {
  res.json({ message: 'Hello world' })
}

function POST (req, res, payload, body) {
  res.json({ ...{ message: 'Hello world' }, ...body })
}

function OPTIONS (req, res, payload, body) {
  res.setHeader('Allow', 'OPTIONS, GET, POST')
  res.statusCode = 204
  res.end()
}

export { GET, POST, OPTIONS }
