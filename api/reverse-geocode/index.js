// only US supported as of now
const fetch = require('node-fetch')
const app = require('../app')
const isDeployed = require('../isDeployed')

const { LOCATIONIQ_API_KEY } = process.env

app.get('*', async (req, res) => {
  const { lat, lng } = req.query
  const url = `https://us1.locationiq.com/v1/reverse.php?key=${LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lng}&addressdetails=1&format=json`

  if (!lat || !lng) res.status(400).send('Parameters lat/lng are required')
  else
    fetch(url)
      .then(data => data.json())
      .then(json => res.send(json))
      .catch(err => res.status(500).send(`Error fetching data: ${err}`))
})

if (!isDeployed())
  app.listen(8030, () => '/api/reverse-geocode 👂👂👂 on port 8030')

module.exports = app
