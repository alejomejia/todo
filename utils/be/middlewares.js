const requestLogger = (req, res) => {
  console.info('---')
  console.info('Method:', req.method)
  console.info('Path:', req.url)
  console.info('Body:', req.body)
  console.info('---')
}

export { requestLogger }
