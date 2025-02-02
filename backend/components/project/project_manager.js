const IdeaSubmissionManager = require("../idea/idea_submission_manager");
const SecurityManager = require("../security/security_manager");
const Persistence = require('../persistance/persistance');

const Project = {
    id: 0,
    name: "",
    description: "",
    status: "",
    created_by: 0,
    idea: 0,
    created_at: Date.now()
}

class ProjectManager {
    constructor(authData){
        this.authData = authData;
        this.table = "project";
        this.securityManager = new SecurityManager(this.authData);
        this.IdeaSubmissionManager = new IdeaSubmissionManager(this.authData);
    }

    async createProject(id, project) {
        try {
            console.log("create project:", id, project)
            if (!id || !project) {
                throw new Error('Invalid input');
            }

            //check idea is exists
            // console.log("create idea s m")
            // ideaMgr = new IdeaSubmissionManager(this.authData);
            // console.log("done")
            let idea = await (new IdeaSubmissionManager(this.authData)).get(id);
            if(!idea){
                throw new Error("idea does not exist");
            }

            //check name description
            if (!project.name || !project.description) {
                throw new Error('Name and description are required');
            }

            project.status = "NEW";

            //set creator
            project.created_by = this.authData.id;
            project.created_at = Date.now();
            project.idea = id;
            

            //authorise
            if(!this.securityManager.authorize(3, null)){
                throw new Error("User not authorized");
            }

            //check exists
            let exists = await Persistence.getRecord(this.table, { name: project.name });
            console.log('exists:', exists);

            if (!exists) {
                console.log('create record', project);
                const recordId = await Persistence.createRecord(this.table, project);
                return recordId;
            } else {
                throw new Error('record already exists');
            }

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }

    //list 
    async listProjects() {
        try {
            //authorise
            if(!this.securityManager.authorize(3, null)){
                throw new Error("User not authorized");
            }

            let sql = "select t1.*, t2.first_name as created_by_name from project as t1 left join users as t2 on t1.created_by = t2.id"
            const projects = await Persistence.listRecordsWithSQL(sql, []);
            //const projects = await Persistence.listRecords(this.table);
            return projects;
        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }


    // static get(id) {
    //     return new Promise((resolve, reject) => {
    //         Project.findOne({
    //             where: {
    //                 id: id
    //             }
    //         }).then((r) => {
    //             resolve(r);
    //         }).catch((error) => {
    //             reject(error);
    //         });
    //     });
    // }
    // static update(id, project) {
    //     return new Promise((resolve, reject) => {
    //         Project.update(project, {
    //             where: {
    //                 id: id
    //             }
    //         }).then((r) => {
    //             resolve(r);
    //         }).catch((error) => {
    //             reject(error);
    //         });
    //     });
    // }
    // static listAll() {
    //     return new Promise((resolve, reject) => {
    //         Project.findAll().then((r) => {
    //             resolve(r);
    //         }).catch((error) => {
    //             reject(error);
    //         });
    //     });
    // }
    // static delete(id) {
    //     return new Promise((resolve, reject) => {
    //         Project.destroy({
    //             where: {
    //                 id: id
    //             }
    //         }).then((r) => {
    //             resolve(r);
    //         }).catch((error) => {
    //             reject(error);
    //         });
    //     });
    // }
}

module.exports = ProjectManager;