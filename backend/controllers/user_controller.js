const UserManager = require("../components/user/user_manager");

const addUser = (req, res) => {
    const user = req.body;
    console.log(user);

    new UserManager(res.locals.authData).addUser(user).then((r) => {

        res.json({ success: true, result: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });

}

const listAll = (req, res) => {
    const reqdata = req.body;
    console.log(reqdata);

    new UserManager(res.locals.authData).listAll(reqdata).then((r) => {

        res.json({ success: true, records: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });
}
    


const get = (req, res) => {
    const id = req.params.id;
    console.log(id);

    new UserManager(res.locals.authData).get(id).then((r) => {

        res.json({ success: true, record: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });
}

const updateUser = (req, res) => {
    const id = req.params.id;
    console.log(id);

    const data = req.body;
    console.log(data);

    new UserManager(res.locals.authData).update(id, data).then((r) => {

        res.json({ success: true, record: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });
}

const deactiveUser = (req, res) => {
    const id = req.params.id;
    console.log(id);

    const data = req.body;
    console.log(data);

    new UserManager(res.locals.authData).deactivateUser(id, data).then((r) => {

        res.json({ success: true, record: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });
}

const addAccount = (req, res) => {
    const data = req.body;
    console.log(data);

    new UserManager(res.locals.authData).addUserAccount(data).then((r) => {

        res.json({ success: true, record: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });
}

module.exports = {
    addUser,
    listAll,
    get,
    updateUser,
    deactiveUser,
    addAccount
}