const fetch = require("node-fetch");
const app = require("../app");
const isDeployed = require("../isDeployed");

const { DARKSKY_API_KEY } = process.env;

app.get("*", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) res.status(400).send("Parameters lat/lng are required");
  else
    fetch(darkySkyURL(DARKSKY_API_KEY, lat, lng))
      .then((data) => data.json())
      .then((json) => res.send(json))
      .catch((err) => res.status(500).send(`Error fetching data: ${err}`));
});

if (!isDeployed()) app.listen(8010, () => "/api/forecast 👂👂👂 on port 8010");

function darkySkyURL(apiKey, lat, lng) {
  return `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`;
}

module.exports = app;
