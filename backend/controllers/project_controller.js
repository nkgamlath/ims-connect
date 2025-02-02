const ProjectManager = require("../components/project/project_manager");

//create project 
const createProject = (req, res) => {
    const id = req.params.idea_id;
    const project = req.body;
  
    new ProjectManager(res.locals.authData).createProject(id, project).then((r) => {  
  
      res.json({ success: true, result: r });
    }).catch((error) => { 
      res.status(500).json({ success: false, error: error.message });
    });
}

//list projects
const listAll = (req, res) => {

  new ProjectManager(res.locals.authData).listProjects().then((r) => {  

    res.json({ success: true, results: r });
  }).catch((error) => { 
    res.status(500).json({ success: false, error: error.message });
  });
}


module.exports = {
    createProject,
    listAll
}