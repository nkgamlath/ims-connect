const SecurityManager = require("../components/security/security_manager")

const login = (req, res) => {
    const {username, password} = req.body;
    console.log("login", username, password);
  
    new SecurityManager(null).authenticate(username, password).then((result) => {  
  
      res.json(result);
    }).catch((error) => { 
      res.status(401).json({ success: false, error: error.message });
    });
}

const verifyToken = (req, res) => {
    const {token} = req.body;
  
    const t = new SecurityManager(null).verifyToken(token);
    res.json({ success: true, t });
}

const listRoles = async (req, res) => {

  const t = await new SecurityManager(res.locals.authData).listRoles();
  console.log('list roles:', t);
  res.json({ success: true, records: t });
}

// Export of all methods as object
module.exports = {
    login,
    verifyToken,
    listRoles
}