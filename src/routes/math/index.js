function GET (req, res, payload, body) {
  const result = Math.random() * 100
  res.json({ message: `Math result: ${result}` })
}

function POST (req, res, payload, body) {
  const { guess } = body
  const randomNumber = Math.floor(Math.random() * 100)

  if (guess === randomNumber) {
    res.json({ message: 'Congratulations! You guessed the number!' })
  } else {
    res.json({ message: 'Try again. Incorrect guess.' })
  }
}

function OPTIONS (req, res, payload, body) {
  res.setHeader('Allow', 'OPTIONS, GET, POST')
  res.statusCode = 204
  res.end()
}

export { GET, POST, OPTIONS }
