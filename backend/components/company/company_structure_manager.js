const Persistence = require('../persistance/persistance');

var CompanyStructure = {
    id: 0, //0: notset, 0<:  id
    name: "",
    parent: 0,//0: notset, 0<: parent id
    level: 4, //0: global, 1: region, 2: country, 3: office
}


class CompanyStructureManager {

    table = "company_structure";

    constructor(authData){
        this.authData = authData;
    }

    //create new company structure record
    async create(companyStructure) {
        try {
            if (!companyStructure) {
                throw new Error('Invalid input');
            }

            //check exists
            let exists = await Persistence.getRecord(this.table, { name: companyStructure.name });
            console.log('exists:', exists);

            if (!exists) {
                console.log('create record');
                const newCompanyStructureId = await Persistence.createRecord(this.table, companyStructure);
                return newCompanyStructureId;
            } else {
                throw new Error('record already exists');
            }

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error('create failed');
        }
    }

    //get company structure record by id
    async get(id) {
        try {
            if (!id) {
                throw new Error('Invalid input');
            }

            let companyStructure = await Persistence.getRecord(this.table, { id: id });

            //get parent record
            // let parent = await Persistence.getRecord(this.table, { id: companyStructure.parent });
            // if(parent){
            //     companyStructure.parent_record = parent;
            // }

            //get parent hierarchy
            let hierarchy = await this.getParentHierarchy(id);
            companyStructure.parent_hierarchy = hierarchy;

            return companyStructure;
        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error('get record failed');
        }
    }

    async getParentHierarchy(id) {
        try {
            if (!id) {
                throw new Error('Invalid input');
            }

            let hierarchy = [];


            //get structure record
            let companyStructure = await Persistence.getRecord(this.table, { id: id });

            while (companyStructure.parent != 0) {
                //get parent
                console.log('parent:', companyStructure.parent);
                const parent = await Persistence.getRecord(this.table, { id: companyStructure.parent });
                hierarchy.push(parent);
                companyStructure = parent;
            }
            return hierarchy;

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error('get record failed');
        }
    }

    async listChildren(parent) {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            return false;
        }
    }

    async listAll() {
        try {
            let companyStructures = await Persistence.listRecords(this.table, null);
            return companyStructures;
        } catch (error) {
            return [];
        }
    }
}

module.exports = CompanyStructureManager;