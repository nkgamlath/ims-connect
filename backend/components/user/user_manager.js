const { route } = require('../../routes/service_routes');
const CompanyStructureManager = require('../company/company_structure_manager');
const Persistence = require('../persistance/persistance');
const SecurityManager = require('../security/security_manager');

var user = {
    id : "",
    first_name: "",
    last_name: "",
    email: "",
    user_type: "", //user,admin,innovation_manager
    scope: 0, //0: notset, 0<: scope id
    office: 0, //0: notset, 0< office id
    role: 0, //0: notset, 0< role id 1:user, 2:innovation_manager, 3:admin
}

var userAccount = {
    user_id : "", //user id
    username: "",
    password: "",
    activation_code: "",
    activated: false, //first time login
}

class UserManager {
    table = "users";

    constructor(authData){
        this.authData = authData;
        this.securityManager= new SecurityManager(authData);
    }

    //create new company structure record
    async addUser(user) {
        try {
            if (!user) {
                throw new Error('Invalid input');
            }

            if(!(user.user_type == "admin" || user.user_type == "innovation_manager" || user.user_type == "user")){
                throw new Error('Invalid user type');
            }

            //check role
            if(user.user_type == "admin"){
                user.role = 3;
            }else if(user.user_type == "innovation_manager"){
                user.role = 2;
            }else{
                user.role = 1;
            }

            //check scope
            if(user.scope != 0){
                try {
                    let s = await new CompanyStructureManager(this.authData).get(user.scope);
                    if(s){
                        user.scope = s.id;
                    }else{
                        throw new Error('Invalid scope' + s);
                    }
                } catch (error) {
                    throw new Error('Invalid scope' + error.message);   
                }
                
            }

            user.active = true;

            //authorise
            if(!this.securityManager.authorize(3, user.scope)){
                throw new Error("User not authorized");
            }

            //check exists
            let exists = await Persistence.getRecord(this.table, { first_name: user.first_name, last_name: user.last_name });
            console.log('exists:', exists);

            if (!exists) {
                console.log('create record', user);
                const newCompanyStructureId = await Persistence.createRecord(this.table, user);
                return newCompanyStructureId;
            } else {
                throw new Error('record already exists');
            }

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }

    //get company structure record by id
    async get(id) {
        try {
            if (!id) {
                throw new Error('Invalid input');
            }

            let record = await Persistence.getRecord(this.table, { id: id });
            return record;

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }

   
    async listAll() {
        try {
            let sql = "SELECT t.*, t2.name as scope_name FROM users as t left join company_structure as t2 on t.scope = t2.id "
            //let list = await Persistence.listRecords(this.table, null);
            let list = await Persistence.listRecordsWithSQL(sql, []);
            return list;
        } catch (error) {
            return [];
        }
    }

    async update(id, data) {
        try {
            if (!id) {
                throw new Error('Invalid input');
            }

            //check record exists
            let exists = await Persistence.getRecord(this.table, { id: id });
            if (!exists) {
                throw new Error('record not exists');
            }

            let updateData = {
                first_name : data.first_name,
                last_name : data.last_name,
            }

            let record = await Persistence.updateRecord(this.table, id, updateData);
            return record;

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }

    async deactivateUser(id) {
        try {
            if (!id) {
                throw new Error('Invalid input');
            }

            //check record exists
            let exists = await Persistence.getRecord(this.table, { id: id });
            if (!exists) {
                throw new Error('record not exists');
            }

            //check admin scope and admin role

            let data = { active: true };

            let record = await Persistence.updateRecord(this.table, id, data);
            return record;

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }

    //create user account
    async addUserAccount(userAccount) {
        try {
            let userAccountTable = "user_accounts";
            if (!userAccount) {
                throw new Error('Invalid input');
            }

            //check admin scope and admin role

            //check exists
            let exists = await Persistence.getRecord(userAccountTable, { username: userAccount.username });
            console.log('exists:', exists);

            if (!exists) {
                console.log('create record');
                const record = await Persistence.createRecord(userAccountTable, userAccount);
                return record == 0 ? false : true;
            } else {
                throw new Error('record already exists');
            }

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }
}

module.exports = UserManager;