// only US supported as of now
const fetch = require("node-fetch");
const app = require("../app");
const isDeployed = require("../isDeployed");

const { LOCATIONIQ_API_KEY } = process.env;

app.get("*", async (req, res) => {
  const { q } = req.query;
  const url = `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${q}&format=json`;

  if (!q) res.status(400).send("Parameter q is required");
  else
    fetch(url)
      .then((data) => data.json())
      .then((json) => res.send(json))
      .catch((err) => res.status(500).send(`Error fetching data: ${err}`));
});

if (!isDeployed()) app.listen(8020, () => "/api/geocode 👂👂👂 on port 8020");

module.exports = app;
