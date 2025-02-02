const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
var path = require('path');
require('dotenv/config');

const securityController = require("./controllers/security_controller");
const routes = require('./routes/service_routes');
const SecurityManager = require('./components/security/security_manager');

//get port from env variables
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

//frontend
app.use(express.static(
  path.join(__dirname,"../frontend/dist")));

//security routes
app.post('/api/login', securityController.login);

//validate access token for all other routes
app.all('/api/*', (req, res, next) => {

  //validate token
  let token = req.headers['authorization'];

  if (token) {
    const authData = new SecurityManager(null).authenticateToken(token);

    if (authData) {
      console.log("token authenticated:", authData)
      //store authData in response locals
      res.locals.authData = authData;
      next();
    } else {
      res.status(401).json({ success: false, error: "Invalid token" });
    }

  } else {
    res.status(401).json({ success: false, error: "Invalid token" });
  }
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

