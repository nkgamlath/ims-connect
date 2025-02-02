const CompanyStructureManager = require('../company/company_structure_manager');
const Persistence = require('../persistance/persistance');
//const ProjectManager = require('../project/project_manager');

var idea = {
    id : "",
    title: "",
    description: "",
    status: "", //submitted,voting_inprogress, promoted, rejected(duplicate idea), implemented,
    vote_count: 0, //user,admin,innovation_manager
    rank: 0, // #users voted / #users in scope * 100 
    scope: 0, //0: notset, 0< office id
    voting_enabled: 0, //0: notset, 0< role id 1:user, 2:innovation_manager, 3:admin
}


class IdeaSubmissionManager {

    constructor(authData){
        this.authData = authData;
        this.table = "idea";
    }

    //create new company structure record
    async submitIdea(idea) {
        try {
            if (!idea) {
                throw new Error('Invalid input');
            }

            if(idea.title == "" || idea.description == "" || idea.scope == 0){
                throw new Error('Invalid input');
            }

            idea.status = "submitted";
            idea.vote_count = 0;
            idea.rank = 0;
            idea.voting_enabled = 0;
            idea.created_by = this.authData.id;

            //check scope
            if(idea.scope != 0){
                try {
                    let s = await new CompanyStructureManager(this.authData).get(idea.scope);
                    if(s){
                        idea.scope = s.id;
                    }else{
                        throw new Error('Invalid scope');
                    }
                } catch (error) {
                    throw new Error('Invalid scope');   
                }
                
            }else{
                throw new Error('Invalid scope');
            }

            //check exists
            let exists = await Persistence.getRecord(this.table, { title: idea.title });
            console.log('exists:', exists);

            if (!exists) {
                console.log('create record');
                const record = await Persistence.createRecord(this.table, idea);
                return record;
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

       
    async listAll(reqData) {
        try {
            let sql = "SELECT t1.*, t2.first_name as created_by_name FROM idea as t1 left join users as t2 on t1.created_by = t2.id";
            let list = await Persistence.listRecordsWithSQL(sql, []);
            //let list = await Persistence.listRecords(this.table, reqData);
            console.log(list)
            return list;
        } catch (error) {
            return [];
        }
    }

    async countAll(reqData) {
        try {
            let c = await Persistence.countRecords(this.table, reqData);
            return c;
        } catch (error) {
            return 0;
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

            let record = await Persistence.updateRecord(this.table, id, data);
            return record;

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }

    //enable or disable voting
    async enableVoting(id, voting_enabled) {
        try {
            if (!id) {
                throw new Error('Invalid input');
            }

            console.log("voting_enabled", voting_enabled, parseInt(voting_enabled));
            if(!(parseInt(voting_enabled) == 1 || parseInt(voting_enabled) == 0)){
                throw new Error("Invalid input");
            }

            //check record exists
            let exists = await Persistence.getRecord(this.table, { id: id });
            if (!exists) {
                throw new Error('record not exists');
            }

            let data = { voting_enabled: parseInt(voting_enabled) };

            let record = await Persistence.updateRecord(this.table, id, data);
            return record;

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }

    //reject idea (if idea is duplicate)
    async rejectIdea(id) {
        try {
            if (!id) {
                throw new Error('Invalid input');
            }

            //check record exists
            let exists = await Persistence.getRecord(this.table, { id: id });
            if (!exists) {
                throw new Error('record not exists');
            }

            let data = { status: "rejected" };

            let record = await Persistence.updateRecord(this.table, id, data);
            return record;

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }

    //promote idea
    async promoteIdea(id, scope) {
        try {
            if (!id) {
                throw new Error('Invalid input, idea id required');
            }

            //check record exists
            let exists = await Persistence.getRecord(this.table, { id: id });
            if (!exists) {
                throw new Error('idea record not exists');
            }

            //check scope is in parent scope hierarchy
            try {

                let s = await new CompanyStructureManager(this.authData).get(scope);
                console.log("scope record found", s);
                if(s){
                    scope = s.id;

                    //get user scope
                    let parentHeirarchy = await new CompanyStructureManager(this.authData).getParentHierarchy(exists.scope);
                    console.log("parent heirarchy", parentHeirarchy);
                    const found = parentHeirarchy.find((element) => element.id == scope);
                    console.log("Find Res", found)

                    if(!found){
                        throw new Error('Invalid scope, not in parent hierarchy');
                    }

                }else{  
                    throw new Error('Invalid scope, record not found');
                }
            } catch (error) {
                throw new Error('Invalid scope' + error.message);
            }

            //set status and new scope
            let data = { status: "promoted", scope: scope };
            console.log("data", data)

            let record = await Persistence.updateRecord(this.table, id, data);
            return record;

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }

    //vote idea
    async vote(id) {
        try {
            if (!id) {
                throw new Error('Invalid input, idea id required');
            }

            //check idea record exists
            let exists = await Persistence.getRecord(this.table, { id: id });
            if (!exists) {
                throw new Error('idea record not exists');
            }

            //check already voted
            let voteExists = await Persistence.getRecord("vote", {voted_by: this.authData.id});
            if(voteExists){
                return voteExists.id;
            }


            //set status and new scope
            let data = { idea_id: id, voted_at: Date.now(), voted_by: this.authData.id };
            console.log("data", data)

            let record = await Persistence.createRecord("vote", data);
            return record;

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }

    async countVotes(id) {
        try {
            let reqData = {idea_id: id};
            
            let c = await Persistence.countRecords(this.table, reqData);
            return c;
        } catch (error) {
            return 0;
        }
    }

}

module.exports = IdeaSubmissionManager;