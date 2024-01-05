function safeJSON (data, fallback) {
  try {
    return JSON.parse(data)
  } catch {
    return fallback
  }
}

async function processRequestChunks (req) {
  let rawRequest = ''
  for await (const chunk of req) {
    rawRequest += chunk
  }
  return rawRequest
}

const processedContentTypes = {
  'text/html': (text) => text,
  'text/plain': (text) => text,
  'application/json': (json) => safeJSON(json, {}),
  'application/x-www-form-urlencoded': (data) => Object.fromEntries(new URLSearchParams(data))
}

function processContentType(req, rawRequest) {
  if (req.headers['content-type']) {
    const contentType = req.headers['content-type'].split(';')[0];
    if (processedContentTypes[contentType]) {
      return processedContentTypes[contentType](rawRequest);
    }
  }
  return {};
}

export { safeJSON, processRequestChunks, processContentType }
