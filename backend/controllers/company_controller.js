const CompanyStructureManager = require("../components/company/company_structure_manager");

// create company structure record - request handler
const createRecord = (req, res) => {
    const cs = req.body;
    console.log(cs);

    new CompanyStructureManager(res.locals.authData).create(cs).then((r) => {

        res.json({ success: true, r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });

}

const listAll = (req, res) => {
    const cs = req.body;
    console.log(cs);
    console.log("auth data", res.locals.authData)

    new CompanyStructureManager(res.locals.authData).listAll(cs).then((r) => {

        res.json({ success: true, records: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });

}

const get = (req, res) => {
    const id = req.params.id;
    console.log(id);

    new CompanyStructureManager(res.locals.authData).get(id).then((r) => {

        res.json({ success: true, record: r });
    }).catch((error) => {
        res.status(500).json({ success: false, error: error.message });
    });

}


// Export of all methods as object
module.exports = {
    createRecord,
    listAll,
    get
}