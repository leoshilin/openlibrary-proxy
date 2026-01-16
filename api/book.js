export default async function handler(req, res) {
  try {
    const { isbn } = req.query

    if (!isbn) {
      return res.status(400).json({
        error: 'missing isbn parameter'
      })
    }

    const apiUrl = `https://openlibrary.org/isbn/${isbn}.json`

    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'wechat-mini-program/1.0',
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'openlibrary request failed',
        status: response.status
      })
    }

    const data = await response.json()

    return res.status(200).json({
      source: 'openlibrary',
      isbn,
      data
    })

  } catch (err) {
    return res.status(500).json({
      error: 'internal_error',
      message: err.message
    })
  }
}
