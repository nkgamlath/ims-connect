const  IdeaSubmissionManager = require("../components/idea/idea_submission_manager");

const submitIdea = (req, res) => {
    const idea = req.body;
  
    new IdeaSubmissionManager(res.locals.authData).submitIdea(idea).then((r) => {  
  
      res.json({ success: true, result: r });
    }).catch((error) => { 
      res.status(401).json({ success: false, error: error.message });
    });
}

//get idea
const getIdea = (req, res) => { 
    const id = req.params.id;
    console.log(id);

    new IdeaSubmissionManager(res.locals.authData).get(id).then((r) => {

        res.json({ success: true, record: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });
}

//enable voting
const enableVoting = (req, res) => {
    const id = req.params.id;
    console.log(id);

    const {voting_enabled} = req.body;

    new IdeaSubmissionManager(res.locals.authData).enableVoting(id, voting_enabled).then((r) => {

        res.json({ success: true, record: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });
}

//reject idea (if idea is duplicate)
const rejectIdea = (req, res) => {
    const id = req.params.id;
    console.log(id);

    new IdeaSubmissionManager(res.locals.authData).rejectIdea(id).then((r) => {

        res.json({ success: true, record: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });
}

//promote idea
const promoteIdea = (req, res) => {
    const id = req.params.id;
    const {scope} = req.body
    console.log("id and scope",id, scope);

    new IdeaSubmissionManager(res.locals.authData).promoteIdea(id, scope).then((r) => {

        res.json({ success: true, record: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });
}



//list all ideas
const listAll = (req, res) => {
    let reqdata = req.body;
    console.log("reqData", reqdata);

    if (Object.keys(reqdata).length === 0){
        reqdata = null;
    }

    new IdeaSubmissionManager(res.locals.authData).listAll(reqdata).then((r) => {

        res.json({ success: true, records: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });
}

//count all ideas
const countAll = (req, res) => {
    let reqdata = req.body;
    console.log(reqdata);

    if (Object.keys(reqdata).length === 0){
        reqdata = null;
    }

    new IdeaSubmissionManager(res.locals.authData).countAll(reqdata).then((r) => {

        res.json({ success: true, count: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });
}

const vote = (req, res) => {
    const id = req.params.id;
    console.log(id);


    new IdeaSubmissionManager(res.locals.authData).vote(id).then((r) => {

        res.json({ success: true, record: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });
}

const countVotes = (req, res) => {
    const id = req.params.id;
    console.log(id);


    new IdeaSubmissionManager(res.locals.authData).countVotes(id).then((r) => {

        res.json({ success: true, count: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });
}


module.exports = {
    submitIdea,
    getIdea,
    enableVoting,
    rejectIdea,
    promoteIdea,
    listAll,
    countAll,
    vote,
    countVotes
}