import auth from 'basic-auth'

export const login = (req, res) => {
  const credentials = auth(req)
  if (!credentials) {
    res.status(400).end('Bad request.')
  } else {
    res.send('Hi')
  }
}
