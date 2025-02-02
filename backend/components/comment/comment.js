const Persistence = require('../persistance/persistance');


const comment = {
    id: 0,
    comment: "",
    commented_by: 0,
    commented_at: 0,
    ref_id: 0, //project id if it is a project comment
    replied_to: 0 //0: no reply, number: replied comment id

}

class CommentManager {

    constructor(authData){
        this.authData = authData;
        this.ideaCommentTable = "comments_idea";
        this.projectCommentTable = "comments_project";
    }

    //add comment
    async addComment(type, id, comment) {
        try {
            if (!id) {
                throw new Error('Invalid input');
            }

            let table = "";

            if(type == "idea"){
                //check idea exists
                let idea = await Persistence.getRecord("idea", { id: id });
                if (!idea) {
                    throw new Error('Idea not found');
                }
                table = this.ideaCommentTable;
            }else if(type == "project"){
                //check project exists
                let project = await Persistence.getRecord("project", { id: id });
                if (!project) {
                    throw new Error('Project not found');
                }
                table = this.projectCommentTable;
            }else{
                throw new Error('Invalid type');
            }

            let commentObj = {
                comment: comment,
                commented_by: this.authData.id,
                commented_at: Date.now(),
                ref_id: id,
                replied_to: 0
            }
            let result = await Persistence.createRecord(table, commentObj);
            return result;

        } catch (error) {
            console.error('Error:', error.message); // Handle the rejected promise
            throw new Error(error.message);
        }
    }
}

module.exports = CommentManager;