const express = require("express");
const app = express();
const itemRoute = require("./routers/Item")

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
